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

  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  //it will let us to create a new object
  const newTour = Object.assign({id: newId},req.body);

  //now push it into tours array
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
  JSON.stringify(tours), 
  err =>{
    res.status(201).json({
      status:'success',
      data:{
        tour:newTour
      }
    })
  })
  
 })
const port = 4000;
app.listen(port, function(){

    console.log(
        "http://localhost:" + port
      );
        
        
      
})