import styles from "./Certifications.module.css";
import FutureHeader from "@/app/futureHeader/FutureHeader";

const Certifications = () => {
    const certifications = [
        {
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            date: "2023",
            credentialId: "AWS-CLF-C01"
        },
        {
            name: "RCM ",
            issuer: "Royal Conservatory of Music",
            date: "",
            credentialId: ""
        },
        {
            name: "Senior Black Belt",
            issuer: "East West Karate",
            date: "",
            credentialId: ""
        }
    ];

    return (
        <section id="certifications" className="section">
            <div className="container">
                <div className={styles.certificationsHeader}>
                    <FutureHeader level={2} text="Certifications" color="var(--medium-blue)"/>
                </div>
                
                <div className={styles.certificationsGrid}>
                    {certifications.map((cert, index) => (
                        <div key={index} className={styles.certificationCard}>
                            <div className={styles.certificationIcon}>
                                🏆
                            </div>
                            <div className={styles.certificationContent}>
                                <h3 className={styles.certificationName}>{cert.name}</h3>
                                <div className={styles.certificationDetails}>
                                    <span className={styles.certificationIssuer}>{cert.issuer}</span>
                                    <span className={styles.certificationDate}>{cert.date}</span>
                                </div>
                                <div className={styles.certificationId}>
                                    ID: {cert.credentialId}
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
