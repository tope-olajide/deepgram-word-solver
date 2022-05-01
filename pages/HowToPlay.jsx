import styles from "../styles/Home.module.css";
import { useState } from "react";
import MainMenu from "./MainMenu";
export default function HowToPlay() {
  const [isMainMenu, setIsMainMenu] = useState(false);
  if(isMainMenu) {
    return (
      <>
      <MainMenu />
      </>
    )
  }
  return (
    <>
    <div className={styles.container}>
      <section className={styles.howToPlaySection}>
        <h1>HOW TO PLAY</h1>
    <section>
          <p>
            Create words from the letters displayed at the top by holding the
            record button and then release when you are done recording your answer.
            <p>The button will be automatically released after three seconds if you didn&apos;t release it</p>
          </p>
          <p>
            Once you&apos;ve assembled a valid word, the word will be automatically
            added to the found words grid.  Spell as many words as you can to score maximum
            points! (100 points per letter)
          </p>
         <p>You can also say &quot;shuffle&quot; or &quot;scramble&quot; to mix the words together in a random way or simply press the shuffle button</p>
        </section>
        <button className={styles.button} onClick={()=>setIsMainMenu(true)}>Back to Main Menu</button>
     </section></div>
    </>
  );
}
