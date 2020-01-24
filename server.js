const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',
 process.env.DATABASE_PASSWORD
)

//hosted Database connection
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:true,
  useUnifiedTopology:true
}).then(() =>{
  // console.log(con.connections);
  console.log('Database is connected')
})




//local Database connection
// mongoose.connect(process.env.DATABASE_LOCAL,{
//   useNewUrlParser:true,
//   useCreateIndex:true,
//   useFindAndModify:false,
//   useUnifiedTopology:true
// }).then(() =>{
//   // console.log(con.connections);
//   console.log('Database is connected')
// })
const port = process.env.PORT || 4010;
app.listen(port, function(){

    console.log(
        "http://localhost:" + port
      );
        
        
      
})