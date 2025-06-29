// const express = require("express");
const userServices = require("../services/auth.service");

class AuthController {
    
    constructor(){
        this.userModelControl = new userServices();
    }

    async register(req,res){  
        try{
            const { username , email , password } = req.body;         
            const user = await this.userModelControl.createUser({ username , email , password });
            res.status(200).send(user).end();
        }catch(err){
            throw new Error("Error create user: "+err.message)
        }
    }

    async getAllUsers(req,res){          
        try{
            const user = await this.userModelControl.getAllUser();
            res.status(200).json(user).end();
        }catch(err){
            throw new Error("Error get users: "+err.message)
        }
    }


    
}

module.exports = AuthController; 