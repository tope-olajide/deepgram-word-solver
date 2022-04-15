import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import getHighScores from "../utils/highscores";
import MainMenu from "./MainMenu";
export default function HighScore() {
  const [isMainMenu, setIsMainMenu] = useState(false);
  const [highScore, setHighScore] = useState();
  useEffect(() => {
    setHighScore(getHighScores())
    
 }, []);

    if(isMainMenu) {
      return (
        <>
        <MainMenu />
        </>
      )
    }
  return (
    <>
   
    <div className={styles.container}> <section className={styles.highScoreContainer}>
 
          <section className={styles.highScore}>
      <h1>Highscore: {highScore}</h1>
</section>
<button className={styles.button} onClick={()=>setIsMainMenu(true)}>Back to Main Menu</button>
     </section></div>
    </>
  );
}
