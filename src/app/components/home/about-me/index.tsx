import React from "react";
import styles from "./AboutMe.module.css";

const AboutMe = () => {
    return (
        <section className={styles.aboutSection}>
            {/* The outer container that holds the spinning border */}
            <div className={styles.aboutContainer}>
                
                {/* The inner container that holds the text safely above the background */}
                <div className={styles.aboutContent}>
                    <h2 className="digital">About Me</h2>
                    
                    <p className={styles.aboutDescription}>
                        Hi, I'm Nicole! I'm a Toronto-based Software Engineer currently specializing in <span className={styles.highlight}>mobile development at Capital One</span>. My career path has been pretty diverse: having worn many different hats over the years, I've built a versatile skillset that allows me to bridge gaps between roles and adapt quickly.
                    </p>
                    
                    <p className={styles.aboutDescription}>
                        Ultimately, I find that I just like building, and feeling things click. I like being involved in planning and events around my communities, whether that be my work, my city, or my art. Feel free to contact me if you want to plan something!
                    </p>

                    {/*Added a wrapper div to push it to the center */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                        <a 
                            href="https://drive.google.com/file/d/1HLH37U2VdzJCZb6cLvvqFejTKcsI4p_w/preview" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="main-button"
                            style={{ textDecoration: "none" }} // Keeps the browser from adding a blue underline
                        >
                            <span>Resume</span>
                        </a>
                        
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default AboutMe;