
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 4010;
app.listen(port, function(){

    console.log(
        "http://localhost:" + port
      );
        
        
      
})