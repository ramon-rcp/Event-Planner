import React from "react";
import styles from '../styles/Home.module.css';

type Props = {
  openPage: (page: string) => void;
};

export const Home: React.FC<Props> = ({ openPage }) => {
  return (
    <div>
        <h2 className={styles.wordContent}>Welcome to the Event Planner!
        </h2>
        <p className={styles.wordContent}>
            Organize, manage, and enjoy stress-free event planning with just a few clicks
      </p>
        <div className={styles.buttonContainer}>
            <button className={styles.buttonClick} onClick={() => openPage("guestlist")}>Guest list</button>
            <button className={styles.buttonClick} onClick={() => openPage("addguest")}>Add guest</button>
        </div>
    </div>
  );
};
