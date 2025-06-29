const userModel = require("../models/userModel");
const pendingUserModel = require("../models/pendingUserModel")


class userServices {
  async createUser(data) {
    try {
      const checkUser = await pendingUserModel.findOne({email:data.email});
      if(checkUser===null){
        return "user not found or already created"
      }
      // let newUser = {
      //   username:checkUser.username,
      //   email:checkUser.email,
      //   password:checkUser.password
      // }

      
      if(checkUser !== null , checkUser.code === data.code && checkUser.codeExpiresAt >= new Date()){
        const users = new userModel(checkUser);
        const deleteUserPending = await pendingUserModel.findByIdAndDelete(checkUser._id)
        await users.save();
        return users;
      }else{
        if(checkUser.code !== data.code){
          return "The code was entered incorrectly."
        }else if(checkUser.codeExpiresAt < new Date()){
          return "The code has expired."
        }else{
          return "undetected error"
        }
      }
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  }
  async getAllUser() {
    console.log("otdi");
    
    try {
      const allUser = await userModel.find();
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

  async createPendingUser(data){
    try {
      const findUser = await userModel.findOne({email:data.email});
      if(!findUser){
        const findUserPending = await pendingUserModel.findOne({email: data.email}); 
        if(findUserPending){
          findUserPending.code = data.code;
          findUserPending.codeExpiresAt = data.codeExpiresAt;
          await findUserPending.save();
          return {status:201,message: "Pending user updated"};
        }else{
          const users = new pendingUserModel(data);
          await users.save();
          return {status:200,message:"pending User create"};
        }
      }else{
        return {status:201,message: "This email already exist"};
      }
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  }
}

module.exports = userServices;
