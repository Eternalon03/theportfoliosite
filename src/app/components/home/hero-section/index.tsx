"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./HeroSection.module.css";
import SocialLinks from "./sociallinks";

const HeroSection = () => {
    // State for the loading screen
    const [isLoading, setIsLoading] = useState(true);

    // Refs for DOM elements
    const mountRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // Three.js Setup
    useEffect(() => {
        // Handle loading screen timeout
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        const container = mountRef.current;
        if (!container) return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

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
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
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
        const gridSize = 20;
        const gridDivisions = 20;
        const gridMaterial = new THREE.LineBasicMaterial({
            color: 0x00c3ff,
            transparent: true,
            opacity: 0.2,
        });

        const gridHelper = new THREE.GridHelper(
            gridSize,
            gridDivisions,
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

        // Event Listeners
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const posArray = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                posArray[i * 3 + 2] += 0.01;
                if (posArray[i * 3 + 2] > 10) {
                    posArray[i * 3 + 2] = -10;
                }
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;

            targetX = mouseX * 0.2;
            targetY = mouseY * 0.2;

            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup function (Crucial for React strict mode / page navigation)
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            // Dispose of Three.js objects to prevent memory leaks
            renderer.dispose();
            sphereGeometry.dispose();
            particleMaterial.dispose();
            lineMaterial.dispose();
        };
    }, []);

    // 3D Card Hover Logic
    const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !glowRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        cardRef.current.style.transform = `rotateY(${deltaX * 2}deg) rotateX(${-deltaY * 2}deg)`;
        glowRef.current.style.boxShadow = `inset ${-deltaX * 10}px ${-deltaY * 10}px 20px rgba(0, 195, 255, 0.3)`;
    };

    const handleCardMouseLeave = () => {
        if (!cardRef.current || !glowRef.current) return;
        cardRef.current.style.transform = "rotateY(0) rotateX(0)";
        glowRef.current.style.boxShadow = "inset 0 0 20px rgba(0, 195, 255, 0.3)";
    };

    return (
        <section className="relative w-full flex items-center justify-center py-4">
            {/* Loading Screen */}
            {isLoading && (
                <div className={styles.loading} id="loading">
                    <div className={styles["loading-text"]}>DRAFTING...</div>
                    <div className={styles["loading-bar"]}></div>
                </div>
            )}

            {/* Three.js Canvas Container */}
            <div id="canvas-container" ref={mountRef}></div>

            {/* Cyberpunk Card Container */}
            <div
                className={styles["card-container"]}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
            >
                <div className={styles.card} ref={cardRef}>
                    <div className={`${styles["card-face"]} ${styles["card-front"]}`}>
                        <div className={styles["social-links-floating"]}>
                            <SocialLinks />
                            <div className={styles["card-email"]}>nplaneta03@gmail.com</div>
                        </div>
                        <div className={styles["card-inner-layout"]}>
                            {/* LEFT HALF: Profile/Avatar/ID Stats */}
                            <div className={styles["card-left"]}>
                                <div className={styles["line-container"]}>
                                    <div className={styles["accent-line"]} style={{ '--line-width': '7cqi' } as React.CSSProperties}></div>
                                    <div className={styles["accent-line"]} style={{ '--line-width': '3.5cqi' } as React.CSSProperties}></div>
                                    <div className={styles["accent-line"]} style={{ '--line-width': '2cqi' } as React.CSSProperties}></div>
                                </div>
                                <div className={styles["profile-wrapper"]}>
                                    <div className={styles["profile-frame"]}>
                                        <img 
                                            src="/images/hero-sec/profile_pic.png" 
                                            alt="Nicole Planeta" 
                                            className={styles["profile-img"]} 
                                        />
                                    </div>
                                    <div className={styles["ghost-frame"]}></div>
                                </div>
                            </div>

                            {/* RIGHT HALF: Your existing content */}
                            <div className={styles["card-right"]}>
                                <div className={styles["card-header"]}>
                                    <h2 className={styles["card-title"]}>Nicole Planeta</h2>
                                    <div className={styles["card-subtitle"]}>Software Engineer | Musician | Occasional Artist | Game Developer</div>
                                </div>
                                
                                <div className={styles["card-content"]}>
                                    <div className={styles["card-stats"]}>
                                        <div className={styles.stat}>
                                            <div className={styles["stat-value"]}>University of Waterloo | Computer Science</div>
                                        </div>
                                        <div className={styles.stat}>
                                            <div className={styles["stat-value"]}>Capital One | Mobile Developer</div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["vector-container"]}>
                                    <div className={styles["arrows-vector"]}></div>
                                </div>
                            </div>
                        </div>

                        {/* Effects layers */}
                        <div className={styles["glow-effect"]} ref={glowRef}></div>
                        <div className={styles["edge-highlight"]}></div>
                        <div className={styles.scanline}></div>
                        <div className={styles.glitch}></div>
                        <div className={styles["hologram-effect"]}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;