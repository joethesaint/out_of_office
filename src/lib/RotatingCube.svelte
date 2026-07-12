<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let container;

  const UNIT = 0.72; // spacing between cubie centers
  const CUBIE = 0.68; // cubie edge length (small, near-seamless gap like the source)

  // colors sampled from the source video's frames (see README "Matching the
  // source cube's look") — one pink hue running light -> deep, plus white
  const LIGHT_PINK = '#f7a6d0';
  const DEEP_PINK = '#c4467b';
  const LIGHT_WHITE = '#ffffff';
  const DEEP_WHITE = '#e9dee3';
  const SEAM = '#f4eef1'; // bright/light seam, not dark plastic

  const AXES = ['x', 'y', 'z'];

  // which two grid axes tile a given face, and which brand glyph rides on it
  const FACE_AXES = {
    px: { u: 'z', v: 'y', decal: 'heart' },
    nx: { u: 'z', v: 'y', decal: 'heart' },
    py: { u: 'x', v: 'z', decal: 'ring' },
    ny: { u: 'x', v: 'z', decal: 'ring' },
    pz: { u: 'x', v: 'y', decal: 'bowtie' },
    nz: { u: 'x', v: 'y', decal: 'bowtie' },
  };

  const ATLAS = 660; // conceptual size of a whole 3x3 face, in texture pixels
  const TILE = ATLAS / 3; // one sticker's texture size

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // big brand-glyph decals, drawn in whole-face ("atlas") coordinates so
  // they read as one continuous shape spanning multiple stickers
  function drawHeart(ctx, atlas, color) {
    const cx = atlas / 2, cy = atlas / 2, s = atlas * 0.16;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy + s * 2.3);
    ctx.bezierCurveTo(cx - s * 3.2, cy + s * 0.4, cx - s * 1.8, cy - s * 2, cx, cy - s * 0.6);
    ctx.bezierCurveTo(cx + s * 1.8, cy - s * 2, cx + s * 3.2, cy + s * 0.4, cx, cy + s * 2.3);
    ctx.closePath();
    ctx.fill();
  }

  function drawRing(ctx, atlas, color) {
    const cx = atlas / 2, cy = atlas / 2, r = atlas * 0.3;
    ctx.strokeStyle = color;
    ctx.lineWidth = atlas * 0.075;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawBowtie(ctx, atlas, color) {
    const cx = atlas / 2, cy = atlas / 2, w = atlas * 0.34, h = atlas * 0.26;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - w, cy - h);
    ctx.lineTo(cx - w, cy + h);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + w, cy - h);
    ctx.lineTo(cx + w, cy + h);
    ctx.closePath();
    ctx.fill();
  }

  const DECALS = { heart: drawHeart, ring: drawRing, bowtie: drawBowtie };

  // one sticker texture for tile (i, j) of a 3x3 face. Drawing happens in
  // atlas-space (0..ATLAS) with the canvas translated so it's naturally
  // clipped to this tile's TILE x TILE window — that's what makes the
  // gradient and the big decal shape continue seamlessly from tile to tile.
  function makeTileTexture(i, j, decalKey) {
    const el = document.createElement('canvas');
    el.width = el.height = TILE;
    const ctx = el.getContext('2d');
    ctx.translate(-i * TILE, -j * TILE);

    const x = i * TILE, y = j * TILE;
    ctx.fillStyle = SEAM;
    ctx.fillRect(x, y, TILE, TILE);

    const isPink = (i + j) % 2 === 0;
    const inset = TILE * 0.05;
    const r = TILE * 0.15;
    const grad = ctx.createLinearGradient(0, 0, ATLAS, ATLAS);
    if (isPink) {
      grad.addColorStop(0, LIGHT_PINK);
      grad.addColorStop(1, DEEP_PINK);
    } else {
      grad.addColorStop(0, LIGHT_WHITE);
      grad.addColorStop(1, DEEP_WHITE);
    }
    ctx.fillStyle = grad;
    roundRect(ctx, x + inset, y + inset, TILE - inset * 2, TILE - inset * 2, r);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = TILE * 0.02;
    roundRect(ctx, x + inset, y + inset, TILE - inset * 2, TILE - inset * 2, r);
    ctx.stroke();

    const decalColor = isPink ? 'rgba(255,255,255,0.5)' : 'rgba(199,74,132,0.45)';
    DECALS[decalKey](ctx, ATLAS, decalColor);

    const texture = new THREE.CanvasTexture(el);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  function makePlasticTexture() {
    const size = 64;
    const el = document.createElement('canvas');
    el.width = el.height = size;
    const ctx = el.getContext('2d');
    ctx.fillStyle = SEAM;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(el);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    const plasticTexture = makePlasticTexture();
    const plasticMaterial = new THREE.MeshPhysicalMaterial({
      map: plasticTexture,
      roughness: 0.3,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      metalness: 0.03,
    });
    const geometry = new THREE.BoxGeometry(CUBIE, CUBIE, CUBIE);

    const disposableTextures = [plasticTexture];
    const disposableMaterials = [plasticMaterial];

    // exterior sticker material for cubie (gx,gy,gz)'s face pointing `dir`
    function stickerMaterial(dir, gx, gy, gz) {
      const axes = FACE_AXES[dir];
      const coord = { x: gx, y: gy, z: gz };
      const i = coord[axes.u] + 1;
      const j = coord[axes.v] + 1;
      const texture = makeTileTexture(i, j, axes.decal);
      disposableTextures.push(texture);
      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.22,
        clearcoat: 0.5,
        clearcoatRoughness: 0.15,
        metalness: 0.03,
      });
      disposableMaterials.push(material);
      return material;
    }

    const cubies = [];
    for (let gx = -1; gx <= 1; gx++) {
      for (let gy = -1; gy <= 1; gy++) {
        for (let gz = -1; gz <= 1; gz++) {
          const materials = [
            gx === 1 ? stickerMaterial('px', gx, gy, gz) : plasticMaterial,
            gx === -1 ? stickerMaterial('nx', gx, gy, gz) : plasticMaterial,
            gy === 1 ? stickerMaterial('py', gx, gy, gz) : plasticMaterial,
            gy === -1 ? stickerMaterial('ny', gx, gy, gz) : plasticMaterial,
            gz === 1 ? stickerMaterial('pz', gx, gy, gz) : plasticMaterial,
            gz === -1 ? stickerMaterial('nz', gx, gy, gz) : plasticMaterial,
          ];
          const mesh = new THREE.Mesh(geometry, materials);
          mesh.position.set(gx * UNIT, gy * UNIT, gz * UNIT);
          cubeGroup.add(mesh);
          cubies.push({ mesh, x: gx, y: gy, z: gz });
        }
      }
    }

    // soft key + dim fill, matching the source's gradient-lit glossy look
    // (the light->dark shading is mostly baked into the sticker textures
    // above; these lights mainly add the specular "candy plastic" pop)
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const key = new THREE.PointLight(0xffffff, 60, 0, 2);
    key.position.set(2.6, 3, 4.4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 1.2);
    fill.position.set(-3, -2, -2);
    scene.add(fill);

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
    const REST_MS = 1400; // pause once fully scrambled / fully solved

    // scramble for SCRAMBLE_COUNT twists, then replay them inverted to solve
    const SCRAMBLE_COUNT = 14;
    let phase = 'scramble';
    let history = [];

    function beginTwist(now, axis, layer, dir) {
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

    function queueNextTwist(now) {
      if (phase === 'scramble') {
        if (history.length >= SCRAMBLE_COUNT) {
          phase = 'solve';
          nextTwistAt = now + REST_MS;
          return;
        }
        const axis = AXES[(Math.random() * 3) | 0];
        const layer = ((Math.random() * 3) | 0) - 1;
        const dir = Math.random() < 0.5 ? 1 : -1;
        history.push({ axis, layer, dir });
        beginTwist(now, axis, layer, dir);
      } else {
        if (history.length === 0) {
          phase = 'scramble';
          nextTwistAt = now + REST_MS;
          return;
        }
        const move = history.pop();
        beginTwist(now, move.axis, move.layer, -move.dir);
      }
    }

    function updateTwist(now) {
      if (!twist) {
        if (now >= nextTwistAt) queueNextTwist(now);
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
      disposableTextures.forEach((t) => t.dispose());
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
