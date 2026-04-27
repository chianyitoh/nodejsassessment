const express = require('express');
const app = express();

const auth = require('./routes/auth')
const profile = require('./routes/profile')
const car = require('./routes/car');

const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.json());
app.use('/api', auth);
app.use('/api', profile);
app.use('/api', car);


//routes
app.get('/', (req, res) => {
    res.send('default route')
})

const port = 5000; // update later

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => 
            console.log(`Server is listening on port ${port}...`)
        );
    } catch(error){
        console.log(error);
    }
}

start();
