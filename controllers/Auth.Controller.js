// const express = require("express");
const userServices = require("../services/auth.service");
const SmsSender = require("../config/nodemailer")

class AuthController {
    
    constructor(){
        this.userModelControl = new userServices();
        this.smsSenderConfig = new SmsSender();
    }

    async verificationUser(req,res){  
        try{
            const { email , code } = req.body;         
            const user = await this.userModelControl.createUser({ email , code });
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

    async deleteUser(req,res){          
        try{
            const {id} = req.params;
            const user = await this.userModelControl.deleteUser(id);
            res.status(200).json(user).end();
        }catch(err){
            throw new Error("Error get users: "+err.message)
        }
    }

    
    async updateUser(req,res){          
        try{
            const {id} = req.params;
            const data = req.body;
            const user = await this.userModelControl.updateUser(id,data);
            res.status(200).json(user).end();
        }catch(err){
            throw new Error("Error get users: "+err.message)
        }
    }

    async sendSmsCodeEmail(email,code){
        try{
            console.log({email:email,code:code});
             
            await this.smsSenderConfig.sendSms(email,code);
            return true;
        }catch(err){
            console.log();
            
        }
    }

    async createPendingUSer(req,res){
        try{
            const { username,email,password} = req.body;
            const randomCode = Math.floor(Math.random() * 999999);
            

           const oneHourLaterInUTCPlus5 = new Date(Date.now() + (1 + 5) * 60 * 60 * 1000); 

            let data = {
                username,
                email,
                password,
                code:randomCode,
                codeExpiresAt:oneHourLaterInUTCPlus5
            }
            const user = await this.userModelControl.createPendingUser(data);
            this.sendSmsCodeEmail(email,randomCode);
            res.status(200).json(user).end();
        }catch(err){
            console.log("create ");
            
        }
    }


    
}

module.exports = AuthController; 