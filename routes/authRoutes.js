const express = require('express');
const AuthController = require('../controllers/Auth.Controller');

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.authController = new AuthController();
        this.setupRoutes();
    }

    setupRoutes() {
        // Public routes
        // console.log("keldi");
        
        this.router.post('/register', this.authController.register.bind(this.authController));
        this.router.get('/getAllUsers', this.authController.getAllUsers.bind(this.authController));

    }

    getRouter() {
        return this.router;
    }
}

module.exports = new AuthRoutes().getRouter(); 