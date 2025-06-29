const mongoose = require("mongoose");


const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MongoURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB connection successfully");
    }catch(err){
        console.log("MongoDB connection error: ",err);
    }
}

module.exports = dbConnection;