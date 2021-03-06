const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

app.use(express.json())
dotenv.config({ path: './config/config.env'})
//Route files
const bootcamps = require('./routes/bootcamps.js')
//load config env vars



//connect to database

connectDB();
 

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'));
}


//mount routers

app.use('/api/v1/bootcamps',bootcamps); 

app.use(errorHandler)


const PORT = process.env.PORT || 5000


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)) 

// Handle unhandled rejection ot unhandeled promises
process.on('unhandledRejection',(err, promise) =>{
   console.log(`Error: ${err.message}`.red)
   // CLose server & exit process
   server.close(()=>process.exit(1));
})