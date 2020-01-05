const express = require('express');
const fs = require('fs');
const app = express();


//a middleware function to get our express json
app.use(express.json());


// app.get('/',(req,res)=>{
//   res.status(200).json({
//     message1:'hi me',
//     message2:'hi fine',
// })
// })

// app.post('/contact',(req,res)=>{
//   res.send({
//     message1post:'hi post 1',
//     message2post:'hi post 2',
// })
// })

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
 
 app.get('/api/v1/tours', (req,res)=>{
   res.status(200).json({
     status:'success',
     results:tours.length,
     data:{
       tours
     }
   })
 })


 app.post('/api/v1/tours', (req,res)=>{

  console.log(req.body);
  res.send('done')
 })
const port = 4000;
app.listen(port, function(){

    console.log(
        "http://localhost:" + port
      );
        
        
      
})