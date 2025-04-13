import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password is short" });
    }
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ sucess: false, message: "email already existing" });
    }
    const existingUserByUsername = await User.findOne({ email: email });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ sucess: false, message: "Username already existing" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const image = "/avatar.png";
    const newUser = new User({
      email: email,
      password: hashedpassword,
      username: username,
      image: image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    // remove password form the resopnse
    res.status(201).json({
      sucess: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in sign up", error.message);
    res.status(500).json({ sucess: false, message: "internal error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const user = await User.findOne({email:email})
    if(!user){
      return res.status(404).json({success:false,mesasge:"Email not found"})
    }
    const isPass = await bcrypt.compare(password,user.password);
    if(!isPass){
      return res.status(400).json({success:false,mesasge:"password incorrect"})
    }
    generateTokenAndSetCookie(user._id, res);
    // remove password form the resopnse
    res.status(201).json({
      sucess: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ sucess: false, message: "internal error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ sucess: true, message: "logged out done" });
  } catch (error) {
    console.log("error in logout", error.message);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
}
