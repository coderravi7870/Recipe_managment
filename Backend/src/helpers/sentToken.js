const jwt = require("jsonwebtoken");
const app_constants = require("../constants/app.json")

const sendToken = async (user_data, res) => {
  const token = await jwt.sign(
    { id: user_data.id },
    process.env.JST_SECRET_KEY
  );
// console.log(token);

  // options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",  // Set sameSite based on environment
  };

  res.setHeader("Cache-Control", "no-store"); // Prevent caching
  res.setHeader("Pragma", "no-cache");

  // console.log("ram ram ");
  
  res.status(201).cookie("recipe_token", token, options).json({
    success: 1,
    status: app_constants.SUCCESS,
    messagemessage: "User Logined successfully!",
    result: user_data,
  });
};

module.exports = sendToken;
