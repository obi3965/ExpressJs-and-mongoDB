const express = require('express');
//it will log our request on the console
const morgan = require('morgan');
const fs = require('fs');
const app = express();

app.use(morgan('dev'))
//a middleware function to get our express json
app.use(express.json());


app.use((req,res,next) =>{
  console.log('hi my own middleware')
  next();
})

app.use((req,res,next) =>{
  req.requestTime = new Date().toISOString();
  next();
})


//we can read our json data
const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)
 
const getAllTours = (req,res)=> { 
  console.log(req.requestTime);
  res.status(200).json({
    results:tours.length,
    status:'success',
    data:{
      tours
    }
  })
 }

 const getToursById = (req,res)=>{
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)
  //here we can also specify fail message where a json id is greater then our json data id
  if(id > tours.length){
    return res.status(404).json({
      status:'fail',
      message: 'invalid id'
    })
  }
  
 res.status(200).json({
   status:'success',
   
   data:{
     tour
   }
 })
 }

 const getTourUpdate = (req,res)=>{
  if(req.param.id * 1 > tours.length){
    res.status(200).json({
      status:'fails',
      message:'invalid id'
    })
  }
  res.status(200).json({
    status: 'success',
    data:{
      tour:'<updated tour here ...>'
    }
  })
 }

 const postTour = (req,res)=>{
   
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
  
 }

//  app.get('/api/v1/tours', getAllTours)
//  app.get('/api/v1/tours/:id',getToursById)
//  //how to patch a data to update our data
//  app.patch('/api/v1/tours/:id', getTourUpdate)
//  app.post('/api/v1/tours', postTour)

app
.route('/api/v1/tours')
.get(getAllTours)
.post(postTour)

app
.route('/api/v1/tours')
.get(getToursById)
.patch(getTourUpdate)

 
const port = 4010;
app.listen(port, function(){

    console.log(
        "http://localhost:" + port
      );
        
        
      
})