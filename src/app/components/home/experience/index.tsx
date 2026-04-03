"use client";
import styles from "./Experience.module.css";
import { useEffect, useState } from "react";
import FutureHeader from "@/app/futureHeader/FutureHeader";

interface ExperienceItem {
    logo: string;
    role: string;
    location: string;
    date: string;
    internship?: string;
    bulletPoints: Array<[string, string[]]>;
}

const Experience = () => {
    const [experienceData, setExperienceData] = useState<ExperienceItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setExperienceData(data?.experienceData || []);
            } catch (error) {
                console.error('Error fetching experience data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleExpand = (index: number) => {
        setExpandedIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) // Remove if exists
                : [...prev, index]                // Add if not exists
        );
    };

    const formatText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    if (isLoading) {
        return (
            <section id="experience" className="section">
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <FutureHeader level={2} text="Experience" color="var(--medium-blue)"/>
                    </div>
                    <div className="loadingState">Loading experience...</div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="section">
            <div className={`${styles.experienceContainer} container`}> 
                <div className="titleContainer">
                    <FutureHeader level={2} text="Experience" color="var(--medium-blue)"/>
                </div>
                <div className={styles.timeline}>
                    {experienceData.map((item, index) => {
                        const isExpanded = expandedIndices.includes(index);

                        return (
                            <div 
                                key={index}
                                className={styles.timelineItem}
                            >
                                <div className={styles.timelineMarker}></div>
                                <div className={styles.timelineContent}>
                                    <div className={styles.companyLogo}>
                                        <img src={item.logo} alt="Logo" className={styles.logoImage} />
                                    </div>
                                    
                                    <div className={styles.timelineHeader}>
                                        <div className={styles.timelineYear}>{item.date}</div>
                                        {item.internship && (
                                            <div className={styles.timelineInternship}>{item.internship}</div>
                                        )}
                                    </div>
                                    <FutureHeader level={1} text={item.role} color="var(--off-white)"/>
                                    <div className={styles.timelineCompany}>{item.location}</div>
                                    
                                    <button 
                                        className={styles.seeMoreBtn}
                                        onClick={() => toggleExpand(index)}
                                    >
                                        {isExpanded ? "- MINIMIZE" : "+ SEE DETAILS"}
                                    </button>

                                    <div className={`${styles.achievementsWrapper} ${isExpanded ? styles.expanded : styles.collapsed}`}>
                                        <div className={styles.timelineAchievements}>
                                            {item.bulletPoints.map(([category, points], categoryIndex) => (
                                                <div key={categoryIndex} className={styles.achievementCategory}>
                                                    <h4 className={styles.categoryTitle}>{category}</h4>
                                                    {points.map((point, pointIndex) => (
                                                        <div key={pointIndex} className={styles.achievementItem}>
                                                            <span>{formatText(point)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;