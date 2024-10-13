// const jwtToken = "fjsdlkfjsld";
const app_constants = require("../constants/app.json");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  // console.log("ram ram");
  
  const { recipe_token } = req.cookies;
    // console.log("token",recipe_token);
  if (!recipe_token) {
    return res.json({
      success: 0,
      status: app_constants.UNAUTHORIZED,
      message: "Please pass the token",
      result: {},
    });
  }

  const verify_token = await jwt.verify(recipe_token, process.env.JST_SECRET_KEY);
  

  if (!verify_token) {
    return res.json({
      success: 0,
      status: app_constants.UNAUTHORIZED,
      message: "Invalid token",
      result: {},
    });
  }
  const { id } = verify_token;
 
  const user_data = await User.findById(id);
  
  if (!user_data) {
    return res.json({
      success: 0,
      status: app_constants.UNAUTHORIZED,
      message: "user does not exist",
      result: {},
    });
  }
  // console.log("req.user", req.user);

  req.user = user_data;
  // console.log("now req.user", req.user);

  next();
};
