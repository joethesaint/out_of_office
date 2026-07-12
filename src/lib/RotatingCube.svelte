<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let container;

  const UNIT = 0.72; // spacing between cubie centers
  const CUBIE = 0.66; // cubie edge length (< UNIT leaves a visible gap)
  const PLASTIC = '#141416';

  // classic six-color scheme, one per world-facing direction
  const STICKER = {
    px: '#e85d75', // right — pink
    nx: '#f5f0eb', // left — off-white
    py: '#f2c14e', // up — gold
    ny: '#2b2b2b', // down — charcoal
    pz: '#3fb8af', // front — teal
    nz: '#8f6fd8', // back — violet
  };

  const AXES = ['x', 'y', 'z'];

  function makeStickerTexture(color) {
    const size = 256;
    const el = document.createElement('canvas');
    el.width = el.height = size;
    const ctx = el.getContext('2d');
    ctx.fillStyle = PLASTIC;
    ctx.fillRect(0, 0, size, size);
    const inset = size * 0.09;
    const r = size * 0.14;
    const w = size - inset * 2;
    ctx.fillStyle = color;
    roundRect(ctx, inset, inset, w, w, r);
    ctx.fill();
    const texture = new THREE.CanvasTexture(el);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function makePlasticTexture() {
    const size = 64;
    const el = document.createElement('canvas');
    el.width = el.height = size;
    const ctx = el.getContext('2d');
    ctx.fillStyle = PLASTIC;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(el);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // exact 90-degree rotations of integer grid coordinates, no float drift
  function rotateGrid(v, axis, dir) {
    const { x, y, z } = v;
    if (axis === 'x') return dir > 0 ? { x, y: -z, z: y } : { x, y: z, z: -y };
    if (axis === 'y') return dir > 0 ? { x: z, y, z: -x } : { x: -z, y, z: x };
    return dir > 0 ? { x: -y, y: x, z } : { x: y, y: -x, z };
  }

  onMount(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const stickerTextures = new Map();
    for (const [key, color] of Object.entries(STICKER)) {
      stickerTextures.set(key, makeStickerTexture(color));
    }
    const plasticTexture = makePlasticTexture();
    const geometry = new THREE.BoxGeometry(CUBIE, CUBIE, CUBIE);

    function faceMaterial(exteriorKey) {
      const map = exteriorKey ? stickerTextures.get(exteriorKey) : plasticTexture;
      return new THREE.MeshStandardMaterial({ map, roughness: 0.5, metalness: 0.05 });
    }

    const disposableMaterials = [];
    const cubies = [];
    for (let gx = -1; gx <= 1; gx++) {
      for (let gy = -1; gy <= 1; gy++) {
        for (let gz = -1; gz <= 1; gz++) {
          const materials = [
            faceMaterial(gx === 1 ? 'px' : null),
            faceMaterial(gx === -1 ? 'nx' : null),
            faceMaterial(gy === 1 ? 'py' : null),
            faceMaterial(gy === -1 ? 'ny' : null),
            faceMaterial(gz === 1 ? 'pz' : null),
            faceMaterial(gz === -1 ? 'nz' : null),
          ];
          disposableMaterials.push(...materials);
          const mesh = new THREE.Mesh(geometry, materials);
          mesh.position.set(gx * UNIT, gy * UNIT, gz * UNIT);
          cubeGroup.add(mesh);
          cubies.push({ mesh, x: gx, y: gy, z: gz });
        }
      }
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff8fa3, 0.5);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // --- whole-cube tumble: auto-spin, drag-to-spin, pointer parallax ---
    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0.004;
    let velY = 0.007;

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (dragging) {
        velY = (e.clientX - lastX) * 0.005;
        velX = (e.clientY - lastY) * 0.005;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    }
    function onPointerDown(e) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onPointerUp() {
      dragging = false;
    }

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    function resize() {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // --- layer twists: real Rubik's-cube face turns ---
    const axisVectors = {
      x: new THREE.Vector3(1, 0, 0),
      y: new THREE.Vector3(0, 1, 0),
      z: new THREE.Vector3(0, 0, 1),
    };
    let twist = null;
    let nextTwistAt = performance.now() + 500;
    const TWIST_MS = 420;
    const PAUSE_MS = 320;

    function startTwist(now) {
      const axis = AXES[(Math.random() * 3) | 0];
      const layer = ((Math.random() * 3) | 0) - 1;
      const dir = Math.random() < 0.5 ? 1 : -1;
      const affected = cubies.filter((c) => c[axis] === layer);
      twist = {
        axis,
        dir,
        affected,
        startTime: now,
        initial: affected.map((c) => ({
          pos: c.mesh.position.clone(),
          quat: c.mesh.quaternion.clone(),
        })),
      };
    }

    function updateTwist(now) {
      if (!twist) {
        if (now >= nextTwistAt) startTwist(now);
        return;
      }
      const t = Math.min(1, (now - twist.startTime) / TWIST_MS);
      const eased = easeInOutQuad(t);
      const theta = twist.dir * (Math.PI / 2) * eased;
      const axisVec = axisVectors[twist.axis];
      const q = new THREE.Quaternion().setFromAxisAngle(axisVec, theta);
      for (let i = 0; i < twist.affected.length; i++) {
        const c = twist.affected[i];
        const init = twist.initial[i];
        c.mesh.position.copy(init.pos).applyAxisAngle(axisVec, theta);
        c.mesh.quaternion.copy(q).multiply(init.quat);
      }
      if (t >= 1) {
        for (const c of twist.affected) {
          const rotated = rotateGrid({ x: c.x, y: c.y, z: c.z }, twist.axis, twist.dir);
          c.x = rotated.x;
          c.y = rotated.y;
          c.z = rotated.z;
          c.mesh.position.set(c.x * UNIT, c.y * UNIT, c.z * UNIT);
          c.mesh.quaternion.normalize();
        }
        twist = null;
        nextTwistAt = now + PAUSE_MS;
      }
    }

    let frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);
      const now = performance.now();
      updateTwist(now);

      if (!dragging) {
        velX += (0.004 - velX) * 0.02;
        velY += (0.007 - velY) * 0.02;
      }
      cubeGroup.rotation.x += velX;
      cubeGroup.rotation.y += velY;

      camera.position.x += (pointerX * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-pointerY * 0.6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();

    onDestroy(() => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      geometry.dispose();
      disposableMaterials.forEach((m) => m.dispose());
      stickerTextures.forEach((t) => t.dispose());
      plasticTexture.dispose();
      renderer.dispose();
    });
  });
</script>

<div class="cube-stage" bind:this={container}>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .cube-stage {
    width: 100%;
    height: 100%;
    touch-action: none;
    cursor: grab;
  }
  .cube-stage:active {
    cursor: grabbing;
  }
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
