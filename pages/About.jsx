import styles from "../styles/Home.module.css";
import { useState } from "react";
import MainMenu from "./MainMenu";
export default function About() {
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
        <h1>ABOUT</h1>
    <section>
          <p>
           Deepgram word solver is a letter arrangement game built with Deepgram and NextJS.
           <p>It is my submission to the Deepgram Hackathon on <a href="https://dev.to/kingdavid/deepgram-x-dev-hackathon-submission-post-placeholder-title-j7o">DEV!</a> </p>
           <p>Code is freely available on <a href="https://github.com/tope-olajide/deepgram-word-solver">GitHub</a></p>
            </p>
          
         </section>
        <button className={styles.button} onClick={()=>setIsMainMenu(true)}>Back to Main Menu</button>
     </section></div>
    </>
  );
}
