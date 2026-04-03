"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";
import SocialLinks from "./sociallinks";

const HeroSection = () => {
    // State for the loading screen
    const [isLoading, setIsLoading] = useState(true);

    // Refs for DOM elements
    const cardRef = useRef<HTMLDivElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);

    // Loading screen timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
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