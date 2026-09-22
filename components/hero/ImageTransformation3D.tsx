'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ImageTransformation3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Warm luxury lighting
    const ambientLight = new THREE.AmbientLight(0xfdfbf7, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1db, 2.2);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc5a880, 1.0);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Group for entire floating installation
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Texture Generator helper for classic photography cards
    const createCardCanvas = (isHighRes: boolean, label: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 680;
      const ctx = canvas.getContext('2d');
      if (!ctx) return canvas;

      // Card background
      const bgGrad = ctx.createLinearGradient(0, 0, 512, 680);
      if (isHighRes) {
        bgGrad.addColorStop(0, '#221f1b');
        bgGrad.addColorStop(1, '#151311');
      } else {
        bgGrad.addColorStop(0, '#2c2925');
        bgGrad.addColorStop(1, '#1e1c19');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 680);

      // Inner image frame
      ctx.fillStyle = isHighRes ? '#121110' : '#191816';
      ctx.fillRect(24, 24, 464, 530);

      // Abstract architectural photographic composition inside frame
      const artGrad = ctx.createRadialGradient(256, 260, 40, 256, 260, 260);
      if (isHighRes) {
        artGrad.addColorStop(0, '#c5a880');
        artGrad.addColorStop(0.4, '#8c6d3f');
        artGrad.addColorStop(0.8, '#3d3020');
        artGrad.addColorStop(1, '#181410');
      } else {
        artGrad.addColorStop(0, '#756959');
        artGrad.addColorStop(0.5, '#453e34');
        artGrad.addColorStop(1, '#1f1b16');
      }
      ctx.fillStyle = artGrad;
      ctx.fillRect(28, 28, 456, 522);

      // Geometric lines representing detail sharpness
      if (isHighRes) {
        ctx.strokeStyle = 'rgba(235, 215, 185, 0.45)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 14; i++) {
          ctx.beginPath();
          ctx.arc(256, 260, 30 + i * 16, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Golden badge
        ctx.fillStyle = '#c5a880';
        ctx.font = '600 22px Georgia, serif';
        ctx.letterSpacing = '2px';
        ctx.textAlign = 'center';
        ctx.fillText('4K ULTRA HIGH DEFINITION', 256, 610);

        ctx.fillStyle = '#8c857b';
        ctx.font = '16px -apple-system, sans-serif';
        ctx.fillText('Real-ESRGAN Neural Super-Resolution', 256, 640);
      } else {
        // Blurry grain simulation
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        for (let i = 0; i < 30; i++) {
          ctx.fillRect(Math.random() * 450 + 30, Math.random() * 500 + 30, 20, 20);
        }

        ctx.fillStyle = '#8c857b';
        ctx.font = '500 20px Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('720p STANDARD RESOLUTION', 256, 610);

        ctx.fillStyle = '#5c5750';
        ctx.font = '15px -apple-system, sans-serif';
        ctx.fillText('Original Unprocessed Input', 256, 640);
      }

      return canvas;
    };

    // Geometries & Materials
    const cardGeo = new THREE.PlaneGeometry(2.4, 3.2);

    // Left Card: Before (Standard Res)
    const beforeTexture = new THREE.CanvasTexture(createCardCanvas(false, 'Before'));
    const beforeMat = new THREE.MeshStandardMaterial({
      map: beforeTexture,
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const beforeMesh = new THREE.Mesh(cardGeo, beforeMat);
    beforeMesh.position.set(-1.8, -0.2, -0.6);
    beforeMesh.rotation.set(0.08, 0.25, -0.05);
    beforeMesh.castShadow = true;
    stageGroup.add(beforeMesh);

    // Right Card: After (4K Super-Res with Gold Trim)
    const afterTexture = new THREE.CanvasTexture(createCardCanvas(true, 'After'));
    const afterMat = new THREE.MeshStandardMaterial({
      map: afterTexture,
      roughness: 0.25,
      metalness: 0.2,
      side: THREE.DoubleSide
    });
    const afterMesh = new THREE.Mesh(cardGeo, afterMat);
    afterMesh.position.set(1.4, 0.3, 0.5);
    afterMesh.rotation.set(-0.06, -0.22, 0.04);
    afterMesh.castShadow = true;
    stageGroup.add(afterMesh);

    // Golden frame border on After card
    const frameGeo = new THREE.BoxGeometry(2.48, 3.28, 0.03);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.75,
      roughness: 0.3
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.set(1.4, 0.3, 0.48);
    frameMesh.rotation.set(-0.06, -0.22, 0.04);
    stageGroup.add(frameMesh);

    // Center Golden Transformation Ring / Aperture
    const ringGeo = new THREE.TorusGeometry(1.65, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      emissive: 0x6b5329,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-0.1, 0.1, 0.1);
    ringMesh.rotation.set(0.2, 0.4, 0);
    stageGroup.add(ringMesh);

    // Background floating depth card
    const bgCardGeo = new THREE.PlaneGeometry(1.8, 2.4);
    const bgCardMat = new THREE.MeshStandardMaterial({
      color: 0xede8df,
      roughness: 0.8,
      metalness: 0.05,
      transparent: true,
      opacity: 0.65
    });
    const bgCardMesh = new THREE.Mesh(bgCardGeo, bgCardMat);
    bgCardMesh.position.set(-0.3, 1.4, -1.8);
    bgCardMesh.rotation.set(-0.1, 0.15, -0.12);
    stageGroup.add(bgCardMesh);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = -y * 0.8;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Render / Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();

        // Parallax easing
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        stageGroup.rotation.y = currentX * 0.6;
        stageGroup.rotation.x = currentY * 0.6;

        // Subtle organic floating movement
        beforeMesh.position.y = -0.2 + Math.sin(elapsedTime * 1.1) * 0.08;
        afterMesh.position.y = 0.3 + Math.sin(elapsedTime * 1.1 + 1.2) * 0.09;
        frameMesh.position.y = afterMesh.position.y;
        ringMesh.rotation.z = elapsedTime * 0.25;
        ringMesh.position.y = 0.1 + Math.sin(elapsedTime * 0.8) * 0.05;
        bgCardMesh.position.y = 1.4 + Math.sin(elapsedTime * 0.9 + 2) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle container resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      beforeTexture.dispose();
      afterTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
