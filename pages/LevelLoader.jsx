import { useState, useEffect } from "react";
import anagrams from "../utils/anagrams";
import styles from "../styles/Home.module.css";
import MainGame from './MainGame';
import MainMenu from "./MainMenu";
import { saveHighscores } from "../utils/highscores";
export default function LevelLoader({ level, scores }) {
    const currentLevel = level || 1;
    const [isGameOn, setIsGameOn] = useState(false);
    const currentScores = scores || 0;
    const [anagramWordSolution, setAnagramWordSolution] = useState();
    const [anagramWord, setAnagramWord] = useState();
    const wordsNeeded = 5 + currentLevel;
    const [isMainMenu, setIsMainMenu] = useState(false);
    const [highScore, setHighScore] = useState();
    //randomly pick an anagram word with solution
    
    useEffect(() => {
        const anagramWordWithSolution = anagrams[ Math.floor(Math.random() * (anagrams.length )) ]
         const word = anagramWordWithSolution.word;
         const solution = anagramWordWithSolution.solutions;
         setAnagramWord(word);
         setAnagramWordSolution(solution);
    },[]);
    const startGame = () => {
        setIsGameOn(true);
      };

      const saveAndQuitGame = () => {
        saveHighscores(scores)
        setIsMainMenu(true);
      };
      if(isMainMenu) {
        return (
          <>
          <MainMenu />
          </>
        )
      }
      if (isGameOn) {
          return (
              <>
              <MainGame
              anagramWord = {anagramWord}
              anagramWordSolution = {anagramWordSolution}
              currentScores  = {currentScores}
              currentLevel = {currentLevel}
              />
              </>
          )
      }
return (
    
    <>
    <div className={styles.container}>
        <section className={styles.levelLoaderContainer}>
            <section>
            <h1>Level: {currentLevel} </h1>
            <h1>Words needed to advance: {wordsNeeded}</h1>
        </section>

        <section>
            <button className={styles.button} onClick={startGame}>
                Proceed
            </button>

            <button  className={styles.button}  onClick={saveAndQuitGame}>
                 Quit
            </button>

        </section>
        </section>
    </div>
    
    </>
)
}