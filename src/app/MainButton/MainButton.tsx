"use client";
import React from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const MainButton = ({ children, onClick }: MainButtonProps) => {
    return (
        <button className={styles.mainButton} onClick={onClick}>
            <span>{children}</span>
        </button>
    );
};

export default MainButton;