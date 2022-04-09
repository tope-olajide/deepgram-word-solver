import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faL } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import soundWave from "./../public/sound-wave-2.gif";
export default function Home() {
  const [url, setUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recordAnswer = (e) => {
    setIsRecording(true);
  };
  const stopRecordingAnswer = (e) => {
    setIsRecording(false);
  };

  const getAudio = async () => {
    let chunks = [];
    let recorder;
    let blob
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recorder.state === "inactive") {
           blob = new Blob(chunks, { type: "audio/webm" });
          let testAudioRecord = URL.createObjectURL(blob);
          const audio = new Audio(testAudioRecord);
          setUrl(testAudioRecord)
          audio.play();
          console.log(testAudioRecord);
        }
      };
      recorder.start(1000);

      setTimeout(() => {
        recorder.stop(); 
        fetch('/api/textToSpeech', {
          method: 'post',
          body: JSON.stringify({
               url
          })
       }).then(r => r.json()).then(data => {
        console.log(data) })
      }, 5000);
    } catch (e) {
      console.log("error getting stream", e);
    }
  };
  return (
    <div className={styles.container}>
      <section className={styles.topMenu}>
        <h3>Time</h3>
        <h3>Level</h3>
        <h3>X</h3>
      </section>
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
      <button onClick={getAudio}>Record</button>
      {url && <audio controls src={url} />}
      </section>
      <section className={styles.validDuplicateWords}>
        <p>Duplicate </p>
        <p>Valid</p>
      </section>
      <section className={styles.wordsFoundNeededContainer}>
        <p>
          Words found: <span></span>
        </p>
        <p>
          Words Needed: <span></span>
        </p>
      </section>
      <section className={styles.shuffleClearButton}>
        <button>Shuffle</button>
        <button>Clear</button>
      </section>
      <section className={styles.mainSection}>
        <div></div>
        <section className={styles.recordingSection}>
          <div className={isRecording ? styles.show : styles.hide}>
            <h1 className={styles.recordingText}>Recording...</h1>
            <Image
              src={soundWave}
              alt="Sound Wave"
              height={"100%"}
              style={{ padding: "0px" }}
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
          <div
            className={styles.micIconContainer}
            onMouseDown={(e) => {
              recordAnswer();
            }}
            onMouseUp={(e) => {
              stopRecordingAnswer();
            }}
          >
            <FontAwesomeIcon className={styles.micIcon} icon={faMicrophone} />
          </div>
          
        </section>
        
    
      </section>
    </div>
  );
}
