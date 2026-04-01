import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Heart3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Heart shape using Three.js Shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Gradient material using vertex colors
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      emissive: 0x9f1239,
      emissiveIntensity: 0.3,
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.92,
    });

    const heart = new THREE.Mesh(geometry, material);
    heart.scale.set(0.85, 0.85, 0.85);
    scene.add(heart);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff6b8a,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const wireHeart = new THREE.Mesh(geometry, wireMat);
    wireHeart.scale.copy(heart.scale);
    scene.add(wireHeart);

    // Glow sphere behind heart
    const glowGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Particles around heart
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.5 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(0xff3366, 2, 8);
    pinkLight.position.set(2, 2, 3);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(0xfbbf24, 1.5, 8);
    goldLight.position.set(-2, -1, 2);
    scene.add(goldLight);

    const backLight = new THREE.PointLight(0xff6b8a, 1, 6);
    backLight.position.set(0, -2, -2);
    scene.add(backLight);

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      // Heartbeat scale pulse
      const pulse = 1 + Math.sin(time * 2.5) * 0.04;
      heart.scale.set(0.85 * pulse, 0.85 * pulse, 0.85 * pulse);
      wireHeart.scale.copy(heart.scale);

      // Rotation
      heart.rotation.y += 0.008;
      heart.rotation.x += (mouseY * 0.3 - heart.rotation.x) * 0.05;
      heart.rotation.z += (mouseX * 0.15 - heart.rotation.z) * 0.05;
      wireHeart.rotation.copy(heart.rotation);

      // Float
      heart.position.y = Math.sin(time * 0.8) * 0.08;
      wireHeart.position.y = heart.position.y;

      // Particle rotation
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      // Pulsing lights
      pinkLight.intensity = 1.5 + Math.sin(time * 3) * 0.5;
      goldLight.intensity = 1.2 + Math.sin(time * 2.5 + 1) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    />
  );
}
