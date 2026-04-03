"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ThreeSceneConfig, MousePosition, SceneObjects } from "./types";

const defaultConfig: Required<ThreeSceneConfig> = {
    particleCount: 1000,
    gridSize: 20,
    gridDivisions: 20,
    cameraZ: 5,
};

export const useThreeScene = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    config: ThreeSceneConfig = {}
) => {
    const configRef = useRef({ ...defaultConfig, ...config });
    const sceneObjectsRef = useRef<SceneObjects | null>(null);
    const mousePositionRef = useRef<MousePosition>({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | undefined>(undefined);

    // Initialize scene
    const initializeScene = (container: HTMLDivElement) => {
        const config = configRef.current;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = config.cameraZ;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00c3ff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0xff0055, 1, 10);
        pointLight1.position.set(-2, 1, 3);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00c3ff, 1, 10);
        pointLight2.position.set(2, -1, 3);
        scene.add(pointLight2);

        // Particles
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(config.particleCount * 3);
        const sizes = new Float32Array(config.particleCount);

        for (let i = 0; i < config.particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            sizes[i] = Math.random() * 0.1;
        }

        particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00c3ff,
            size: 0.1,
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Grid
        const gridMaterial = new THREE.LineBasicMaterial({
            color: 0x00c3ff,
            transparent: true,
            opacity: 0.2,
        });

        const gridHelper = new THREE.GridHelper(
            config.gridSize,
            config.gridDivisions,
            0xff0055,
            0x00c3ff
        );
        gridHelper.position.y = -3;
        gridHelper.material = gridMaterial;
        scene.add(gridHelper);

        // Sphere
        const sphereGeometry = new THREE.SphereGeometry(2, 16, 16);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xff0055,
            transparent: true,
            opacity: 0.1,
        });

        // Store scene objects
        sceneObjectsRef.current = {
            scene,
            camera,
            renderer,
            particleSystem,
            gridHelper,
            sphereGeometry,
            particleMaterial,
            lineMaterial,
        };

        return sceneObjectsRef.current;
    };

    // Animation loop
    const animate = () => {
        const sceneObjects = sceneObjectsRef.current;
        if (!sceneObjects) return;

        const { scene, camera, renderer, particleSystem } = sceneObjects;
        const config = configRef.current;

        // Animate particles
        const posArray = particleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < config.particleCount; i++) {
            posArray[i * 3 + 2] += 0.01;
            if (posArray[i * 3 + 2] > 10) {
                posArray[i * 3 + 2] = -10;
            }
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        // Camera movement based on mouse
        const targetX = mousePositionRef.current.x * 0.2;
        const targetY = mousePositionRef.current.y * 0.2;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
        const sceneObjects = sceneObjectsRef.current;
        if (!sceneObjects) return;

        const { camera, renderer } = sceneObjects;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Handle mouse move
    const handleMouseMove = (event: MouseEvent) => {
        mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePositionRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Cleanup
    const cleanup = () => {
        const sceneObjects = sceneObjectsRef.current;
        if (!sceneObjects) return;

        const { renderer, sphereGeometry, particleMaterial, lineMaterial } = sceneObjects;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);

        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
        }

        // Dispose of Three.js objects
        renderer.dispose();
        sphereGeometry.dispose();
        particleMaterial.dispose();
        lineMaterial.dispose();

        sceneObjectsRef.current = null;
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initialize scene
        initializeScene(container);

        // Start animation
        animate();

        // Add event listeners
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup on unmount
        return cleanup;
    }, []);

    return {
        sceneObjects: sceneObjectsRef.current,
        cleanup,
    };
};

export * from './types';

const ThreeScene = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    useThreeScene(mountRef);

    return (
        <section className="relative w-full flex items-center justify-center py-4">
            {/* Three.js Canvas Container */}
            <div id="canvas-container" ref={mountRef}></div>
        </section>
    );
};

export default ThreeScene;
