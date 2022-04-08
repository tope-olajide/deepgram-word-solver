import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import soundWave from './../public/sound-wave-2.gif'
export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const recordAnswer = (e) => {
    setIsRecording(true)
  }
  const stopRecordingAnswer = (e) => {
    setIsRecording(false)
  }
  return (
    <div className={styles.container}>
      <section className={styles.anagramWordsContainer}>
<div className={styles.pushable}>
  <span className={styles.front}>A</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>N</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>A</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>G</span>
</div>

<div className={styles.pushable}>
  <span className={styles.front}>R</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>A</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>M</span>
</div>
</section>
<section className={styles.foundWordsContainer}>

</section>
<section className={styles.validDuplicateWords}>
<p>Duplicate </p>
<p>Valid</p>
</section>
<section className={styles.wordsFoundNeededContainer}>
<p>Words found: <span></span></p>
<p>Words Needed: <span></span></p>
</section>
<section className={styles.shuffleClearButtin}>
<button>Shuffle</button>
<button>Clear</button>
</section>
      <section  className={styles.mainSection} >
     
<section  className={styles.recordingSection} >
  
<div className={isRecording?styles.show:styles.hide}>
 
 <h1 className={styles.recordingText}>Recording...</h1>
     <Image
     src={soundWave}
  alt="Sound Wave"
  height={'100%'}

  />
 
 </div>
 
 <section className={styles.anagramWordsSolution}>
<div className={styles.pushable}>
  <span className={styles.front}>A</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>N</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>A</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>G</span>
</div>

<div className={styles.pushable}>
  <span className={styles.front}>R</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>A</span>
</div>
<div className={styles.pushable}>
  <span className={styles.front}>M</span>
</div>
</section>
  <div className={styles.micIconContainer} onMouseDown={(e) => {
        recordAnswer()
      }} onMouseUp={(e) => {
        stopRecordingAnswer()
      }}>

  <FontAwesomeIcon className={styles.micIcon} icon={faMicrophone} />
  </div>
  </section>
  </section>

    </div>
  )
}
