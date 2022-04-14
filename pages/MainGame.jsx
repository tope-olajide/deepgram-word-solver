import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import soundWave from "./../public/sound-wave-2.gif";
import { ToastContainer, toast } from "react-toastify";
import LevelLoader from "./LevelLoader";


export default function MainGame({
  anagramWord,
  currentScores,
  anagramWordSolution,
  currentLevel
}) {
  const [anagram, setAnagram] = useState(anagramWord);
  const [anagramSolution, setAnagramSolution] = useState(anagramWordSolution);
  const [transcribedWord, setTranscribedWord] = useState("");
  const [url, setUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isInvalid, setIsInValid] = useState(false);
  const [wordsFound, setWordsFound] = useState([]);
  const [scores, setScores] = useState(currentScores);
  const [level, setLevel] = useState(currentLevel);
  const [isError, setIsError] = useState(false);
  const [isNextLevelButton, setIsNextLevelButton] = useState(false);
  const [isNextLevel, setIsNextLevel] = useState(false);

  const shuffle = useCallback(() => {
    const shuffled = anagram
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    console.log(shuffled);
    console.log(anagram);
    setAnagram(shuffled);
  }, [anagram]);

  useEffect(() => {
     shuffle();
  }, [shuffle]);

  const recordAnswer = (e) => {
    setTranscribedWord("");
    setIsError(false);
    setIsDuplicate(false);
    setIsInValid(false);
    setIsRecording(true);
    getAudio();
  };
  const stopRecordingAnswer = (e) => {
    setIsRecording(false);
    setIsTranscribing(true)
  };

  const transcribeAnswer = (blobFile) => {
    setIsTranscribing(true);
    const formData = new FormData();
    formData.append("file", blobFile);
    fetch("/api/textToSpeech", {
      method: "POST",
      body: formData,
    })
      .then((r) => r.json())
      .then((data) => {
        //alert(data.response)
        const userAnswer =
          data.results.channels[0].alternatives[0].words[0].word;
        setTranscribedWord(userAnswer);
        checkWord(userAnswer);
        console.log(data.results.channels[0].alternatives[0].transcript);
        console.log(data.results.channels[0].alternatives[0].words[0].word);
      })
      .catch((error) => {
        console.log(error);
        //alert('Could you repeat that one more time, please?')
        //Sorry, I didn't catch that.
        setIsError(true);
        toast.error("Sorry, I didn't catch that", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .finally(() => {
        setIsTranscribing(false);
        console.log("loading Stops");
      });
  };
  const getAudio = async () => {
    let chunks = [];
    let recorder;
    let testAudioRecord;
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recorder.state === "inactive") {
          setIsRecording(false);
          setIsTranscribing(true)
          const blob = new Blob(chunks, { type: "audio/wav" });
          testAudioRecord = URL.createObjectURL(blob);
          /*  const audio = new Audio(testAudioRecord);
          setUrl(testAudioRecord)
          audio.play(); */
          transcribeAnswer(blob);
          console.log(testAudioRecord);
        }
      };
      recorder.start(1000);

      // Stop after 3 seconds if the user did not stop recording
      setTimeout(() => {
        recorder.stop();
      }, 3000);
    } catch (e) {
      console.log("error getting stream", e);
    }
  };
  const checkWord = (word) => {
    setTranscribedWord(word);
    if (wordsFound.includes(word)) {
      setIsDuplicate(true);
      setIsInValid(false);
      toast.info("You've found this word already!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    if (anagramSolution.includes(word)) {
      //  setIsInValid(false);
      toast.success("Superb !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setScores(scores + word.length * 100);
      setWordsFound([...wordsFound, word]);
      const wordsNeeded = 5+level
      if(wordsFound >= wordsNeeded) {
        setIsNextLevelButton(true);
      }
      return;
    } else {
      setIsInValid(true);
      setIsDuplicate(false);
      toast.error(`Unable to form ${word} from ${anagram}`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

  };
      const loadNextLevel = () => {
      setIsNextLevel(true)
    }
    if (isNextLevel) {
      return (
        <>
        <LevelLoader 
        level={ level }
        scores = { scores }
        />
        </>
      )
    }
  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <section className={styles.topMenu}>
          <div>
          <h3>Scores: {scores}</h3>
          <h3>Level: {level}</h3>
          <h3>x</h3></div>
        </section>
        <section className={styles.anagramWordsContainer}>
          {anagram
            ? anagram.split("").map((letter, index) => {
                return (
                  <div key={index} className={styles.anagramLetter}>
                    <span>{letter} </span>
                  </div>
                );
              })
            : ""}
        </section>
        <section className={styles.foundWordsContainer}>
          {wordsFound
            ? wordsFound.map((letter, index) => {
                return <span key={index}>{letter}</span>;
              })
            : ""}
        </section>
        <section className={styles.validDuplicateWords}>
          <p style={isDuplicate ? { opacity: 1 } : null}>Duplicate </p>
          <p style={isInvalid ? { opacity: 1 } : null}>Invalid</p>
        </section>
        <section className={styles.wordsFoundNeededContainer}>
          <p>
            Words found: <span>{wordsFound.length}</span>
          </p>
          <p>
            Words Needed: <span>{5+currentLevel}</span>
          </p>
        </section>
        <section className={styles.shuffleClearButton}>
          <button className={styles.button} onClick={shuffle}>
            Shuffle
          </button>
          <button style ={isNextLevelButton?{display:"block"}:{display:"none"}} onClick={loadNextLevel} className={styles.button}>Next Level</button>
        </section>
        <section className={styles.mainSection}>
          <div></div>
          <section className={styles.outputSection}>
            {isRecording ? (
              <section className={styles.isRecordingSection}>
                <h1 className={styles.recordingText}>Recording...</h1>

                <Image
                  src={soundWave}
                  alt="Sound Wave"
                  height={"50%"}
                  style={{ padding: "0px" }}
                />
              </section>
            ) : (
              ""
            )}

            {isTranscribing ? (
              <h1 className={styles.transcribingText}>Transcribing...</h1>
            ) : (
              ""
            )}
            {isError ? (
              <h1 className={styles.transcribingText}>
                Could you repeat that one more time, please?
              </h1>
            ) : (
              ""
            )}

            {transcribedWord ? (
              <section className={styles.anagramWordsSolution}>
                <span>{transcribedWord} </span>
              </section>
            ) : (
              ""
            )}
           {!isTranscribing && !isError && !isRecording && !transcribedWord?
               <h1 className={styles.transcribingText}>
            Click and hold the mic icon to record, release to transcribe your answer
          </h1>
             : (
             ""
            )}
            
          </section>
          <button
            disabled={isTranscribing? true: false}
            className={styles.microphoneContainer}
            onMouseDown={(e) => {
              recordAnswer();
            }}
            onMouseUp={(e) => {
              stopRecordingAnswer();
            }}
            onTouchStart={(e) => {
              recordAnswer();
            }}
            onTouchEnd={(e) => {
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
