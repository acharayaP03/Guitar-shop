const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async (conn) =>{
    try{
        mongoose.set('useCreateIndex', true)
        await mongoose.connect(conn, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log('Database successfully connected...')
    
    }catch(error){
        console.log(error, 'n/ couldnt connect')
    }
}

module.exports = dbConnection;