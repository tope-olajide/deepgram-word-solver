import styles from "../styles/Home.module.css";
import LevelLoader from "./LevelLoader";
import { useState } from "react";
import HighScore from "./HighScore";
import HowToPlay from "./HowToPlay";
export default function MainMenu() {
  const [isLevelLoader, setLevelLoader] = useState(false);
  const [isHighScore, setIsHighScore] = useState(false);
  const [isHowToPlay, setIsHowToPlay] = useState(false);
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
  if(isHighScore){
    return (
      <>
      <HighScore />
      </>
    )
  }
  if(isHowToPlay){
    return (
      <>
      <HowToPlay />
      </>
    )
  }
  return (
    <>
      <div className={styles.container}>
        <section className={styles.mainMenuContainer}>
          <div  className={styles.title}><h1>Deepgram</h1>
          <p>Word Solver</p></div>
          <button onClick={LoadNextLevel} className={styles.button}>
            Start
          </button>
          <button className={styles.button} onClick={()=>setIsHowToPlay(true)}>How To Play</button>
          <button className={styles.button}>About</button>
          <button className={styles.button} onClick={()=>setIsHighScore(true)}>Highscores</button>
        </section>
      </div>
    </>
  );
}
