const mongoose = require('mongoose');

//to describe our schema
const tourSchema = new mongoose.Schema({
    name:{
     type: String,
     required:[true, 'a tour must have a name'],
     unique:true,
     trim:true
    },
    duration:{
        type:Number,
        required:[true, 'a tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'a tour must have a group size']
    },
    difficulty:{
        type: String,
        required:[true, 'a tour must have a difficulty']

    },
    ratingsAverage:{
      type:Number,
      default:4.5
    }, 
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
      type:Number,
      required:[true, 'a tour must have price']
    },
    priceDiscount: Number,
    summary:{
        type:String,
        trim:true,
        required:[true, 'a tour must have summary']
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required:[true, 'a tour must have image cover']
    },
    images:[String],
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    startDates:[Date]
    
    
  })
  
  tourSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })
  //to create our schema module
  const Tour = mongoose.model('Tour', tourSchema);


  //now we should export our model
  module.exports = Tour;