import React from "react";
import styles from '../styles/Home.module.css';

type Props = {
  openPage: (page: string) => void;
};

export const Home: React.FC<Props> = ({ openPage }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Welcome to the Event Planner!</h3>
      <p className={styles.description}>
        Organize, manage, and enjoy stress-free event planning with just a few clicks.
      </p>
      <div className={styles.navigation}>
        <p className={styles.navLink} onClick={() => openPage("guestlist")}>GuestList</p>
        <p className={styles.navLink} onClick={() => openPage("addguest")}>AddGuest</p>
      </div>
    </div>
  );
};
