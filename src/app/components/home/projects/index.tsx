"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Projects.module.css"; 
import FutureHeader from "@/app/futureHeader/FutureHeader";

const Projects = () => {
    const [projectsData, setProjectsData] = useState<{
        sideProjects: Array<{
            name: string;
            image: string;
            overlayImg: string;
            buttonOne: [string, string];
            buttonTwo: [string, string];
            description: string;
            bulletpoints: string[];
            skills: string[];
        }>;
    } | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/page-data');
                const data = await response.json();
                setProjectsData(data.projectOverview);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className={`section ${styles.projectsSection}`}>
            <div className="container">
                <div className="titleContainer">
                    <FutureHeader level={2} text="Projects" color="var(--medium-blue)"/>
                </div>
                
                <div className={styles.containerOfAll}>
                    <div className={styles.metallicBackground}>
                        <div className={styles.metallicRectangleBase}>
                            <div className={styles.metallicRectangle} />
                        </div>
                        <div className={styles.metallicRectangleBase}>
                            <div className={styles.metallicRectangle} />
                        </div>
                    </div>
                    
                    <div className={styles.projectsGrid}>
                        {projectsData?.sideProjects?.map((project, index) => (
                            <div key={index} className={styles.projectCard}>
                                <div className={styles.projectContent}>
                                    {/* Restructured: Image is now inside content to share padding */}
                                    <div className={styles.projectImageWrapper}>
                                        <div className={styles.baseImageCrop}>
                                            <img 
                                                src={project.image} 
                                                alt={project.name} 
                                                className={styles.baseImage} 
                                            />
                                        </div>
                                        <img 
                                            src={project.overlayImg} 
                                            alt="overlay" 
                                            className={styles.overlayImage} 
                                        />
                                    </div>

                                    <div className={styles.projectContentMain}>
                                        <h3 className={styles.projectTitle}>{project.name}</h3>
                                        <p className={styles.projectDescription}>
                                            {project.description}
                                        </p>
                                        <div className={styles.projectBulletpoints}>
                                            {project.bulletpoints.map((point, pointIndex) => (
                                                <div key={pointIndex} className={styles.bulletpoint}>
                                                    <span className={styles.bulletIcon}>•</span>
                                                    <span className={styles.bulletText}>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.projectContentFooter}>
                                        <div className={styles.techStack}>
                                            {project.skills.map((skill, skillIndex) => (
                                                <span key={skillIndex} className={styles.techTag}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className={styles.projectLinks}>
                                            <a href={project.buttonOne[1]} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                                                {project.buttonOne[0]}
                                            </a>
                                            <a href={project.buttonTwo[1]} className={styles.projectLink} target="_blank" rel="noopener noreferrer">
                                                {project.buttonTwo[0]}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) || (
                            <div className={styles.projectCard}>
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>Loading projects...</h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;