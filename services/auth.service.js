const userModel = require("../models/userModel");

class userServices {
  async createUser(data) {
    try {
      const users = new userModel(data);
      await users.save();
      return users;
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  }
  async getAllUser() {
    console.log("otdi");
    
    try {
      const allUser = await userModel.find();
    //   console.log(allUser);
      
      return allUser; 
    } catch (err) {
      throw new Error("Error getting all user: " + err.message);
    }
  }
  async getUserById(userId) {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (err) {
      throw new Error("Error getting user by id: " + err.message);
    }
  }
  async updateUser(userId, data) {
    try {
      const user = await userModel.findByIdAndUpdate(userId, data, {
        new: true,
      });
      if (!user) throw new Error("User not found");
      return user;
    } catch (err) {
      throw new Error("Error updataed user: " + err.message);
    }
  }
  async deleteUser(userId) {
    try {
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

module.exports = userServices;
