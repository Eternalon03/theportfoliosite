"use client";
import styles from "./Certifications.module.css";
import FutureHeader from "@/app/futureHeader/FutureHeader";
import { useEffect, useState } from "react";

interface Certification {
    name: string;
    issuer: string;
    date: string;
    credentialId: string;
    image: string;
}

const Certifications = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/page-data');
                const data = await response.json();
                setCertifications(data.certificationsData || []);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="certifications" className="section">
            <div className="container">
                <div className={styles.certificationsHeader}>
                    <FutureHeader level={2} text="Certifications" color="var(--medium-blue)"/>
                </div>
                
                <div className={styles.certificationsGrid}>
                    {certifications.map((cert, index) => (
                        <div key={index} className={styles.certificationCard}>
                            <img src={cert.image} alt={cert.name} className={styles.certificationIcon} />
                            <div className={styles.certificationContent}>
                                <h3 className={styles.certificationName}>{cert.name}</h3>
                                <div className={styles.certificationDetails}>
                                    <span className={styles.certificationIssuer}>{cert.issuer}</span>
                                    <span className={styles.certificationDate}>{cert.date}</span>
                                </div>
                                <div className={styles.certificationId}>
                                    {cert.credentialId && (
                                        <>
                                            {cert.credentialId} —  
                                            <a 
                                                href="https://www.credly.com/badges/753623e8-6bbf-4d13-bb93-ef0c5366dcbc/public_url" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={styles.externalLink}
                                            >
                                                VERIFY_CREDENTIAL
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
