<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  let canvas;
  let container;

  // one icon per cube face, drawn onto a canvas texture
  const FACES = [
    { bg: '#f5f0eb', fg: '#e85d75', draw: drawHeart },
    { bg: '#e85d75', fg: '#f5f0eb', draw: drawStar },
    { bg: '#f5f0eb', fg: '#2b2b2b', draw: drawSmiley },
    { bg: '#2b2b2b', fg: '#f5f0eb', draw: drawDiamond },
    { bg: '#f5f0eb', fg: '#e85d75', draw: drawCircle },
    { bg: '#e85d75', fg: '#f5f0eb', draw: drawPlus },
  ];

  function drawHeart(ctx, size, color) {
    const s = size * 0.28;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(size / 2, size * 0.72);
    ctx.bezierCurveTo(size / 2 - s * 1.6, size * 0.42, size / 2 - s * 0.9, size * 0.18, size / 2, size * 0.36);
    ctx.bezierCurveTo(size / 2 + s * 0.9, size * 0.18, size / 2 + s * 1.6, size * 0.42, size / 2, size * 0.72);
    ctx.closePath();
    ctx.fill();
  }

  function drawStar(ctx, size, color) {
    const cx = size / 2, cy = size / 2, spikes = 5, outer = size * 0.32, inner = size * 0.14;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawSmiley(ctx, size, color) {
    const cx = size / 2, cy = size / 2, r = size * 0.3;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size * 0.035;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - r * 0.4, cy - r * 0.25, r * 0.09, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.4, cy - r * 0.25, r * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.05, r * 0.5, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }

  function drawDiamond(ctx, size, color) {
    const cx = size / 2, cy = size / 2, r = size * 0.3;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx + r, cy);
    ctx.lineTo(cx, cy + r);
    ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fill();
  }

  function drawCircle(ctx, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPlus(ctx, size, color) {
    const cx = size / 2, cy = size / 2, arm = size * 0.28, thick = size * 0.09;
    ctx.fillStyle = color;
    ctx.fillRect(cx - thick / 2, cy - arm, thick, arm * 2);
    ctx.fillRect(cx - arm, cy - thick / 2, arm * 2, thick);
  }

  function makeFaceTexture({ bg, fg, draw }) {
    const size = 512;
    const el = document.createElement('canvas');
    el.width = el.height = size;
    const ctx = el.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
    // subtle grid, echoes the puzzle-cube look without copying it
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 2;
    for (let i = 1; i < 3; i++) {
      const p = (size / 3) * i;
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke();
    }
    draw(ctx, size, fg);
    const texture = new THREE.CanvasTexture(el);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  onMount(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const materials = FACES.map((face) => new THREE.MeshStandardMaterial({
      map: makeFaceTexture(face),
      roughness: 0.45,
      metalness: 0.05,
    }));

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff8fa3, 0.5);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0.006;
    let velY = 0.01;

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

    let frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!dragging) {
        cube.rotation.x += velX;
        cube.rotation.y += velY;
        velX += (0.006 - velX) * 0.02;
        velY += (0.01 - velY) * 0.02;
      } else {
        cube.rotation.x += velX;
        cube.rotation.y += velY;
      }
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
      materials.forEach((m) => { m.map?.dispose(); m.dispose(); });
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
