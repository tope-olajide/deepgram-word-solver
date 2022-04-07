import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faL } from '@fortawesome/free-solid-svg-icons'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import soundWave from './../public/sound-wave-waves.gif'
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
<button className={styles.pushable}>
  <span className={styles.front}>
    P
  </span>
</button>
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
