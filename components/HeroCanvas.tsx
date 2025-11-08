"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(3, 3, 3);
    scene.add(ambient, directional);

    const torusGeo = new THREE.TorusKnotGeometry(1.3, 0.35, 220, 32, 3, 5);
    const torusMat = new THREE.MeshStandardMaterial({ color: '#22d3ee', metalness: 0.6, roughness: 0.2, emissive: '#0ea5e9', emissiveIntensity: 0.6 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    const ringsGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const ringGeo = new THREE.TorusGeometry(2.5 + i * 0.4, 0.005, 16, 200);
      const ringMat = new THREE.MeshBasicMaterial({ color: i % 2 ? '#22d3ee' : '#0ea5e9', transparent: true, opacity: 0.45 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ringsGroup.add(ring);
    }
    scene.add(ringsGroup);

    let raf = 0;
    const start = performance.now();
    const animate = () => {
      const t = (performance.now() - start) / 1000;
      torus.rotation.x = t * 0.25;
      torus.rotation.y = t * 0.35;
      ringsGroup.rotation.z = t * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      ringsGroup.children.forEach((m) => {
        (m as THREE.Mesh).geometry.dispose();
        ((m as THREE.Mesh).material as THREE.Material).dispose();
      });
      if (renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[520px] w-full">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.15),transparent_60%)]" />
    </div>
  );
}
