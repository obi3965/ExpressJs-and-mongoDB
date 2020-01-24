
//we should import our model here
const Tour = require('./../models/tourModels');



exports.getAllTours = async (req, res) => {
   
    //it prints out our query string object in the console
     
  try{
    
    console.log(req.query);
    
    //to implement very easy way
    const tours = await Tour.find(req.query);


    //first example
    // const tours = await Tour.find({
    //   duration:5,
    //   difficulty:'easy'
    // });

    //second example
    // const tours = await Tour.find().where('duration').equals(5)
    // .where('difficulty').equals('easy');
      
    
  res.status(200).json({
    results:tours.length,
    status: 'success',
    data: {
      tours 
    }
  });
  } catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }
  
};

exports.getTour = async (req, res) => {
  try{
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status:'success',
      data:{
        tour
      }
    })
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }
};




exports.createTour = async (req,res) =>{
try{
  const newTour = await Tour.create(req.body)
  res.status(200).json({
  status:'success',
  data:{
    tour:newTour
  }
  })
} catch(err){
  res.status(400).json({
    status:"fail",
    message:err
  })
}
  
}
exports.updateTour = async (req, res) => {

 const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
    new:true,
    runValidators:true
  })
  try{
    res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
  }catch(err){
    res.status(404).json({
      status:"fail",
      message:err
    })
  }
  
};

exports.deleteTour = async (req, res) => {
const tour = await Tour.findByIdAndDelete(req.params.id)
  try{
     res.status(204).json({
    status: 'success',
    data:null
  });
  }catch(err){
    res.status(404).json({
      status:'fail',
      message:err
    })
  }
 
};