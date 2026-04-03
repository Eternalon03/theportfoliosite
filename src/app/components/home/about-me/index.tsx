"use client";
import styles from "./AboutMe.module.css";
import MainButton from "../../../MainButton/MainButton";
import FutureHeader from "@/app/futureHeader/FutureHeader";

const AboutMe = () => {
    return (
        <section className="section">
            {/* The outer container that holds the spinning border */}
            <div className={`container ${styles.aboutContainer}`}>

                <div className={styles.aboutContent}>

                    <FutureHeader level={2} text="About Me" color="var(--medium-blue)"/>
                    
                    <p className={styles.aboutDescription}>
                        Hi, I'm Nicole! I'm a Toronto-based Software Engineer currently specializing in <span className={styles.highlight}>mobile development at Capital One</span>. My career path has been pretty diverse: having worn many different hats over the years, I've built a versatile skillset that allows me to bridge gaps between roles and adapt quickly.
                    </p>
                    
                    <p className={styles.aboutDescription}>
                        Ultimately, I find that I just like building, and feeling things click. I like being involved in planning and events around my communities, whether that be my work, my city, or my art. Feel free to contact me if you want to plan something!
                    </p>

                    {/*Added a wrapper div to push it to the center */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                        <MainButton onClick={
                            () => window.open('https://drive.google.com/file/d/1HLH37U2VdzJCZb6cLvvqFejTKcsI4p_w/preview', '_blank')
                        }>Resume</MainButton>
                        
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default AboutMe;