const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dbConnection")
const authRoute = require("./routes/index")

// const cron = require('node-cron');

// cron.schedule('*/30 * * * *', () => {
//   console.log('⏰ Kod muddati o‘tganlarni tekshiryapman...');
//   deleteExpiredUsers();
// });


class server {
    constructor(){
        this.app = express(),
        this.port = process.env.PORT || 786; 
        this.init(); 

    }
    async init(){
        this.setupMiddleware(),
        this.setupRoute(),
        this.setupDatabase()
    } 

    setupMiddleware(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({extended:true}));
    }
    setupDatabase(){
        dbConnection()
    }


    setupRoute(){ 
        this.app.use("/api",authRoute);
        this.app.get("/api/test",(req,res)=>{
            res.json("Api is working!!")
        });
        this.app.use((req, res) => {
            res.status(404).json({ message: "Route not found" });
        });
        this.app.listen(this.port,()=>{
            console.log("server is running on ",this.port); 
        })
    }
}


new server()