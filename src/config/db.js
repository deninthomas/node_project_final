const mongoose = require("mongoose");

require("dotenv").config();


//url
const {MONGODB_URI} = process.env;


const connectToDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI ,{
            useNewUrlParser : true, 
            useUnifiedTopology : true,
        });
        console.log('Connected to DB');
    
    }
    catch(error){
        console.log('Error connecting to DB', error);
    }
}; 

connectToDB();