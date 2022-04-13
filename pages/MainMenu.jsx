import styles from "../styles/Home.module.css";
import LevelLoader from "./LevelLoader";
import { useState } from "react";
export default function MainMenu() {
  const [isLevelLoader, setLevelLoader] = useState(false);
  const LoadNextLevel = () => {
    setLevelLoader(true);
  };
  if (isLevelLoader) {
    return (
      <>
        <LevelLoader />
      </>
    );
  }
  return (
    <>
      <div className={styles.container}>
        <section className={styles.mainMenuContainer}>
          <button onClick={LoadNextLevel} className={styles.button}>
            Start
          </button>
          <button className={styles.button}>How To Play</button>
          <button className={styles.button}>About</button>
          <button className={styles.button}>Highscores</button>
        </section>
      </div>
    </>
  );
}
