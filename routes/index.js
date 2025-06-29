const express = require("express");
const authController = require("../routes/authRoutes");

class RouteManager {
    constructor(){
        this.router = express.Router()
        this.setupRoute();
    }

    async setupRoute(){
        this.router.use("/auth",authController)
    }

    getRouter(){
        return this.router;
    }
}

module.exports = new RouteManager().getRouter();