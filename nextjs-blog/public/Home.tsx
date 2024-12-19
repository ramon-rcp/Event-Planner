import React from "react";
import styles from '../styles/Home.module.css';

type Props = {
  openPage: (page: string) => void;
};

export const Home: React.FC<Props> = ({ openPage }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome to the Event Planner!</h2>
      <p className={styles.description}>
        Organize, manage, and enjoy stress-free event planning with just a few clicks.
      </p>
      <div className={styles.navigation}>
        <button className={styles.navLink} onClick={() => openPage("guestlist")}>Guest list </button>
        <button className={styles.navLink} onClick={() => openPage("addguest")}>Add guest</button>
      </div>
    </div>
  );
};
