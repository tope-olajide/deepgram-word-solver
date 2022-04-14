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
//console.log(fields, files)
            // console.log(files.file.filepath)
             const oldPath = files.file.filepath;
            // const newPath = `./public/sound-files/${files.file.originalFilename}`;
             const newPath = `./${files.file.originalFilename}`;
             mv(oldPath, newPath, function(err) {
               return resolve (newPath)
             });
             /* const newPath = `./public/sound-files/${files.file.originalFilename}`
             fs.writeFileSync("blob2", newPath); */
            
             
            /*  res.status(200).json({ fields, files,oldPath }) */
         })
     })
   const newPath = await data;
   const streamSource = {
    stream: fs.readFileSync(newPath),
    mimetype: 'audio/wav',
    language:'en'
  };
   

 const response = await deepgram.transcription.preRecorded(streamSource, {
  punctuate: false,
}).then((response) => {
  console.log ('url :-' +newPath)
  // Write the response to the console
  console.log(response.results.channels[0].alternatives[0]);
 return res.status(200).json(response )
  
}).catch((err) => {
  console.log(err);
 return res.status(400).json(err )
})
 
     /*   
        const url  = req.body


     const { results } = await deepgram.transcription.preRecorded({
      buffer: Buffer.from(parsedUrl, 'base64'),
      mimetype: 'audio/webm'
    }) 
  const  testAudioRecord = URL.createObjectURL(url);
console.log(testAudioRecord)
     const { results } = await deepgram.transcription.preRecorded({ url })
    res.status(200).json(testAudioRecord); 
    
          deepgram.transcription.preRecorded({ 
            buffer: Buffer.from(url, 'base64') , 
            mimetype: 'audio/wav'
         })
  .then((transcript) => {
    console.log(transcript);
    res.status(200).json({ transcript });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({ err });
  });  */ 
    }   
  }
  