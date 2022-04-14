const { Deepgram } = require('@deepgram/sdk');
import fs from 'fs'
import { IncomingForm } from 'formidable'

const mv = require('mv');
 export const config = {
  api: {
     bodyParser: false,
  }
}; 
export default async function handler(req, res) {
  
    if (req.method === 'POST') {
      const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);
     
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        
         form.parse(req, (err, fields, files) => {
             if (err) return reject(err)
             const filepath = files.file.filepath;
             console.log(filepath)
            return resolve (filepath)
            
         })
     })
   const filepath = await data;
   const streamSource = {
    stream: fs.readFileSync(filepath),
    mimetype: 'audio/wav',
    language:'en'
  };
   

 const response = await deepgram.transcription.preRecorded(streamSource, {
  punctuate: false,
}).then((response) => {
  console.log(response.results.channels[0].alternatives[0]);
 return res.status(200).json(response )
  
}).catch((err) => {
  console.log(err);
 return res.status(400).json(err )
})

    }   
  }
  