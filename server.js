const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')


//Route files
const bootcamps = require('./routes/bootcamps.js')
//load config env vars

dotenv.config({ path: './config/config.env'})

//connect to database

connectDB();
 
const app = express();

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}


//mount routers

app.use('/api/v1/bootcamps',bootcamps); 


const PORT = process.env.PORT || 5000


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)) 

// Handle unhandled rejection ot unhandeled promises
process.on('unhandledRejection',(err, promise) =>{
   console.log(`Error: ${err.message}`)
   // CLose server & exit process
   server.close(()=>process.exit(1));
})