"use client";
import React, { useState, useEffect } from "react";
import styles from "./Skills.module.css";
import FutureHeader from "@/app/futureHeader/FutureHeader";

interface Skill {
    name: string;
    type: string;
}

const Skills = () => {
    const [activeTab, setActiveTab] = useState("mobile");
    const [skillsData, setSkillsData] = useState<Record<string, Skill[]> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    /* fires only once on mount, then saves skillsData to state */
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

    /* convert array to object 
    useMemo takes two things:
    A Function: The expensive calculation
    A Dependency Array: A list of variables that, if changed, should trigger a re-calculation ([skillsData, activeTab]).
    */
    const groupedSkills = React.useMemo(() => {
        if (!skillsData || !skillsData[activeTab]) return {};
        return skillsData[activeTab].reduce((acc, skill) => {
            const key = skill.type;
            if (!acc[key]) acc[key] = [];
            acc[key].push(skill);
            return acc;
        }, {} as Record<string, Skill[]>);
    }, [skillsData, activeTab]);

    if (isLoading) return <div className="p-10 text-center opacity-50">Loading Skills...</div>;
    if (!skillsData) return null;

    return (
        <section className={styles.skillsSection}>
            <div className={styles.titleContainer}>
                <FutureHeader level={2} text="Skills" color="var(--text-blue)"/>
            </div>
            
            <div className={styles.tabHeaders}>
                {["mobile", "web", "game", "ml"].map((tab) => (
                    <button 
                        key={tab}
                        className={`${styles.tabButton} ${styles.glassmorphism} ${activeTab === tab ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === "ml" ? "ML/AI" : tab === "game" ? "Game Dev" : tab}
                    </button>
                ))}
            </div>

            <div className={styles.skillsContainer}>
                <div className={styles.hCardBorder}></div>
                
                <div className={`${styles.hCard} ${styles.glassmorphism}`}>
                    <div className={styles.tabContent}>
                        <div className={styles.dataValue}>
                            {/* iterate through type */}
                            {Object.entries(groupedSkills).map(([type, skills]) => (
                                <div key={type} className={styles.skillGroup}>
                                    <h5 className={styles.groupTitle}>{type.replace("_", " ")}</h5>
                                    <div className={styles.skillItems}>
                                        {/* iterate through skills */}
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

                <div className={styles.hBottom}>
                    <div className={styles.smallDottedLine}></div>
                </div>
            </div>
        </section>
    );
};

export default Skills;