const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const app_constants = require("../constants/app.json");
const jwt = require("jsonwebtoken");
const sendEmail = require("../helpers/sendEmail");
const sendToken = require("../helpers/sentToken");
const cloudinary = require("../helpers/cloudinary");


exports.userSignUp = async (data) => {
  console.log(data);
  
  const user_data = await User.findOne({ email: data.email });
  if (user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Email already exists",
      result: {},
    };
  }
  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(data.password, salt);

  const add_user = await User.create({ ...data, password: hash_password });
  //to send email

  const subject = "Welcome to Our WebPage!"
  const html =  `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  </head>
  <body> <h2>Hi ${data.username}</h2> <p>Welcome to our application</p> <p>Thanks for sign up with us.</p> <br> <img src="https://st2.depositphotos.com/3591429/6308/i/950/depositphotos_63081591-stock-photo-hands-holding-word-welcome.jpg" alt="" height="200px" width="250px"> <br> <p>Best Regards,</p> <p>Gramify Tream</p></body></html>`

  await sendEmail(data.email,subject,html);
  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "user singUp successfully",
    result: add_user,
  };
};

exports.userLogIn = async (data,res) => {
  const { email, password } = data;
  const user_data = await User.findOne({ email });
  // console.log(user_data);
  
  if (!user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Eamil does not exist",
      result: {},
    };
  }

  const password_check = await bcrypt.compare(password, user_data.password);

  if (!password_check) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "Invalid credentials",
      result: {},
    };
  }

  sendToken(user_data,res);
};

exports.getUser = async (data) => {
 
  if (!data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "user does not exist",
      result: {},
    };
  }

  return {
    success:1,
    status: app_constants.success,
    message:"user found successfully!",
    result : data
  }

};

exports.userAvatarUpdate = async (req) => {
//  console.log("ram ram");
 
  const user_data = req.user;
  // console.log(req.file);
  

  if(user_data){
    const imageId = user_data.avatar.public_id;
    if(imageId){
      await cloudinary.uploader.destroy(imageId);
    }
    
    const uploadResponse = await cloudinary.uploader.upload(req.file.path,{
      folder: "RecipeAvatar",
    })

    user_data.avatar = {
      public_id: uploadResponse.public_id,
      url:uploadResponse.secure_url,
    }
  }

  const result = await user_data.save();

  return {
    success:1,
    status: app_constants.success,
    message:"user avater update successfully!",
    result
  }

};

exports.updateProfile = async (data,user_data) => {
  const { username,fullname,bio} = data;
  const {id} = user_data;

  if (!user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "User does not exist",
      result: {},
    };
  }

  const userName = username ? username: user_data.username;
  const fullName = fullname ? fullname: user_data.fullname;
  const Bio = bio ? bio: user_data.bio;

  const updatedUser = await User.updateOne(
    {_id:id},
    {
      username:userName,
      fullname:fullName,
      bio:Bio
    }
  )

  if(!updatedUser){
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "user dosen't update ",
      result:{},
    };
  }

  
  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "user updated successfully!",
    updatedUser,
  };
};

exports.logoutUser = async (req,res) => {
// console.log("ram ram");

res.cookie("user_token",null,{
  expires: new Date(Date.now()),
  httpOnly: true,
});

    return {
      success: 1,
      status: app_constants.SUCCESS,
      message: "user logout successfully",
      result: {},
    };
  }


exports.userProfile = async (data) => {
  const { id } = data;
  const user_data = await User.findOne({ _id: id }, { _id: 0, __v: 0, password: 0 })
   

  if (!user_data) {
    return {
      success: 0,
      status: app_constants.BAD_REQUEST,
      message: "User does not exist",
      result: {},
    };
  }

  return {
    success: 1,
    status: app_constants.SUCCESS,
    message: "user profile Page get successfully",
    result:user_data
  };
};






