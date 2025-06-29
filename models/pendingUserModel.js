const mongoose = require("mongoose");


const PendingUserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  code: String,
  codeExpiresAt: Date
});


const pendingUSer = mongoose.model("pendingUser", PendingUserSchema);
module.exports = pendingUSer;





