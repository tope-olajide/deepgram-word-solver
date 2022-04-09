const { Deepgram } = require('@deepgram/sdk');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
        const { url } = req.body
        deepgram.transcription.preRecorded({ url })
  .then((transcript) => {
    console.log(transcript);
    res.status(200).json({ transcript });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({ err });
  });
    }   
  }
  