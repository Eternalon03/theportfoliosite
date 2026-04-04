"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Skills.module.css";
import FutureHeader from "@/app/futureHeader/FutureHeader";
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";

interface Skill {
    name: string;
    type: string;
}

const Skills = () => {
    const [activeTab, setActiveTab] = useState("mobile");
    const [skillsData, setSkillsData] = useState<Record<string, Skill[]> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // need a ref for the shader container
    const shaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('/api/page-data');
                const data = await res.json();
                setSkillsData(data?.skillsData);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading && shaderRef.current) {
            shaderRef.current.innerHTML = '';
            const mount = new ShaderMount(
                shaderRef.current,
                liquidMetalFragmentShader,
                {
                    u_colorBack: [1, 1, 1, 1],
                    u_colorTint: [0, 106 / 255, 255 / 255, 0.9],
                    u_repetition: 1.0,      
                    u_softness: 0.7,        
                    u_shiftRed: 0.1,       
                    u_shiftBlue: 0.2,       
                    u_distortion: 0.05,     
                    u_contour: 0.02, // Very low contour to reduce harsh "edges"
                    u_angle: 120,
                    u_scale: 1.2,           
                    u_shape: 0,
                    u_offsetX: 0.0,
                    u_offsetY: 0.0
                },
                undefined,
                0.08
            );

            return () => {
                // Cleanup: Most ShaderMounts don't have a built-in destroy, 
                // but clearing the innerHTML prevents duplicates on re-renders.
                if (shaderRef.current) shaderRef.current.innerHTML = '';
            };
        }
    }, [isLoading]); // Re-run when loading finishes to find the ref

    const groupedSkills = useMemo(() => {
        if (!skillsData || !skillsData[activeTab]) return {};
        return skillsData[activeTab].reduce((acc, skill) => {
            const key = skill.type;
            if (!acc[key]) acc[key] = [];
            acc[key].push(skill);
            return acc;
        }, {} as Record<string, Skill[]>);
    }, [skillsData, activeTab]);

    if (isLoading) {
        return (
            <section id="experience" className="section">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <FutureHeader level={2} text="Skills" color="var(--medium-blue)"/>
                    </div>
                    <div className="loadingState">Loading skills...</div>
                </div>
            </section>
        );
    }
    if (!skillsData) return null;

    return (
        <section className={styles.skillsSection}>
            <div className={`container ${styles.skillsContainer}`}>
            
            <div className="titleContainer">
                <FutureHeader level={2} text="Skills" color="var(--medium-blue)" />
            </div>

            <div className={styles.tabHeaders}>
                {/* add ml back below will bring the string back*/}
                {["mobile", "web", "game"].map((tab) => (
                    <button
                        key={tab}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "ml" ? "ML/AI" : tab === "game" ? "Game Dev" : tab}
                    </button>
                ))}
            </div>

            <div className={styles.skillsContainer}>
                {/* Border that forces hcard inside of it */}
                <div className={styles.hCardBorder}></div>

                <div className={styles.hCard}>
                    {/* 3. The Shader Background */}
                    <div ref={shaderRef} className={styles.liquidBackground} />

                    <div className={styles.skillsContent}>
                        <div className={styles.tabContent}>
                            <div>
                                {Object.entries(groupedSkills).map(([type, skills]) => (
                                    <div key={type} className={styles.skillGroup}>
                                        <FutureHeader level={3} text={type.replace("_", " ")} color="var(--off-white)" blinking={false}/>
                                        <div className={styles.skillItems}>
                                            {skills.map((skill, i) => (
                                                <div key={i} className={styles.individualSkill}>
                                                    {skill.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.hBottom}>
                    <div className={styles.smallDottedLine}></div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Skills;