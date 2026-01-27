import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  chat_id: {
    type: Number,
    unique: true,
  },
  fullname: {
    type: String,
  },
  contact: {
    type: String,
  },
});

export const userModel = mongoose.model("User", userSchema);
