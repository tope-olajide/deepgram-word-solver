
import Image from "next/image";
import { useState,useEffect } from "react";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faL } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import soundWave from "./../public/sound-wave-2.gif";
export default function MainGame({anagramWord, currentScores, anagramWordSolution}) {
    const [anagram, setAnagram] = useState(anagramWord);
    const [anagramSolution, setAnagramSolution] = useState(anagramWordSolution);
    const [transcribedWord, setTranscribedWord] = useState('false');
  const [url, setUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isInvalid, setIsInValid] = useState(false);
  const [wordsFound, setWordsFound] = useState([]);
  const [score, setScore] = useState(currentScores);
  
  useEffect(() => {
     console.log(anagram);
     console.log(anagramSolution);
   /*  const wordIsValid = anagram.anagramWordSolution.includes('transcribedWord');
    const wordIsDuplicate = wordsFound.includes(transcribedWord);
    if (wordIsDuplicate) {
        setIsDuplicate(true);
        setIsInValid(false);
      } else {
        setIsDuplicate(false);
      }
      if (wordIsValid) {
        setIsInValid(false);
        setScore(score + transcribedWord.length * 100);
        setWordsFound([...wordsFound, transcribedWord]);
      }
      setIsInValid(true);
 */


  },[anagram, anagramSolution]); 
const shuffle = () => {
  const shuffled = (anagram.split("").sort(function(){return 0.5-Math.random()}).join(""));
  console.log(shuffled)
  console.log(anagram)
  setAnagram(shuffled)
}
const recordAnswer = (e) => {
setIsRecording(true);
getAudio()
  };
  const stopRecordingAnswer = (e) => {
    setIsRecording(false);

  };
 
const transcribeAnswer = (blobFile) => {
  const formData = new FormData();
  formData.append('file', blobFile ); 
  fetch('/api/textToSpeech', {
    method: 'POST',
    body: formData
 }).then(r => r.json()).then(data => {
   //alert(data.response)
  console.log(data.results.channels[0].alternatives[0].transcript) })
}
  const getAudio = async () => {
    let chunks = [];
    let recorder;
     let testAudioRecord
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recorder.state === "inactive") {
          setIsRecording(false);
          const blob = new Blob(chunks, { type: "audio/mp3" });
           testAudioRecord = URL.createObjectURL(blob);
         /*  const audio = new Audio(testAudioRecord);
          setUrl(testAudioRecord)
          audio.play(); */
          transcribeAnswer(blob);
           console.log(testAudioRecord);
        }
      };
      recorder.start(1000);


  // Stop after 5 seconds if the user did not stop recording
  setTimeout(() => {
        recorder.stop();
      }, 5000);

     
    } catch (e) {
      console.log("error getting stream", e);
    }
  };
  return (
      <>
    <div className={styles.container}>
      <section className={styles.topMenu}>
        <h3>Scores: 500</h3>
        <h3>Level: 2</h3>
        <h3>x</h3>
      </section>
      <section className={styles.anagramWordsContainer}>
            {anagram?anagram.split("").map((letter)=>{
              return (
                // eslint-disable-next-line react/jsx-key
                <div className={styles.anagramLetter}>
                <span>{letter}  </span>
              </div>
              )
          }):""}  
      
       
      </section>
      <section className={styles.foundWordsContainer}>
    {/*   <button onClick={getAudio}>Record</button>
      {url && <audio controls src={url} />} */}
      </section>
      <section className={styles.validDuplicateWords}>
        <p>Duplicate </p>
        <p>Invalid</p>
      </section>
      <section className={styles.wordsFoundNeededContainer}>
        <p>
          Words found: <span>0</span>
        </p>
        <p>
          Words Needed: <span>6</span>
        </p>
      </section>
      <section className={styles.shuffleClearButton}>
        <button className={styles.button} onClick={shuffle}>Shuffle</button>
        <button className={styles.button}>Clear</button>
      </section>
      <section className={styles.mainSection}>
        <div></div>
        <section className={styles.outputSection}>
          
          {isRecording?<section className={styles.isRecordingSection}>
            <h1 className={styles.recordingText}>Recording...</h1>
           
           <Image
              src={soundWave}
              alt="Sound Wave"
              height={"50%"}
              style={{ padding: "0px" }}
            /></section>:""}

         {isTranscribing? <h1 className={styles.transcribingText}>Transcribing...</h1>:""}
         {isTranscribed?<section className={styles.anagramWordsSolution}>
            <div className={styles.anagramLetter}>
              <span className={styles.front}>A</span>
            </div>
            <div className={styles.anagramLetter}>
              <span className={styles.front}>N</span>
            </div>
            <div className={styles.anagramLetter}>
              <span className={styles.front}>A</span>
            </div>
            <div className={styles.anagramLetter}>
              <span className={styles.front}>G</span>
            </div>

            <div className={styles.anagramLetter}>
              <span className={styles.front}>R</span>
            </div>
            <div className={styles.anagramLetter}>
              <span className={styles.front}>A</span>
            </div>
          </section>:""}
          </section>
          <button disabled={true}
            className={styles.microphoneContainer}
            onMouseDown={(e) => {
              recordAnswer();
            }}
            onMouseUp={(e) => {
              stopRecordingAnswer();
            }}
          >
            <FontAwesomeIcon className={styles.micIcon} icon={faMicrophone} />
          </button>
          
        
        
    
      </section>
    </div>
    </>
  );
}
