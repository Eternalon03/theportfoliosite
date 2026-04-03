"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            {/* <AnnouncementBar/> */}
            <nav className={styles.nav}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>NP</span>
                    </div>
                    <ul className={styles.navList}>
                        <li>
                            <button 
                                onClick={() => scrollToSection('hero')}
                                className={styles.navLink}
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('about')}
                                className={styles.navLink}
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('skills')}
                                className={styles.navLink}
                            >
                                Skills
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('experience')}
                                className={styles.navLink}
                            >
                                Experience
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header