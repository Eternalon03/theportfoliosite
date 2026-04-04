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
                    
                    <div className={styles.githubSection}>
                        <a 
                            href="https://github.com/Eternalon03" 
                            className={styles.githubButton}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            See more on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;