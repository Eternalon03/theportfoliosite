"use client";
import React from "react";
import styles from "./FutureHeader.module.css"; // Ensure this matches your filename

interface FutureHeaderProps {
    level?: 1 | 2 | 3 | 4;
    text: string;
    isGlitched?: boolean;
    color?: string;
    size?: string;
    blinking?: boolean;
}

const FutureHeader = ({ 
    level = 1, 
    text, 
    isGlitched = false, 
    color, 
    size,
    blinking = true 
}: FutureHeaderProps) => {
    
    const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
    const levelClass = styles[`h${level}`];
    const classNames = `${styles.baseHeader} ${levelClass} ${isGlitched ? styles.glitched : ""} ${blinking ? "" : styles.noBlinking}`;

    // Fix: Only add the keys to the style object if the prop was actually passed
    const customStyles: React.CSSProperties = {};
    if (color) {
        // Assert as any to bypass TypeScript complaining about custom properties
        (customStyles as any)['--custom-color'] = color;
    }
    if (size) {
        (customStyles as any)['--custom-size'] = size;
    }
    if (blinking !== undefined) {
        (customStyles as any)['--blinking-enabled'] = blinking ? '1' : '0';
    }

    return (
        <Tag className={classNames} style={customStyles}>
            {text}
        </Tag>
    );
};

export default FutureHeader;