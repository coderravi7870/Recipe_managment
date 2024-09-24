const express = require("express");
const userRoute = express.Router();

const userController = require("../controllers/userController");
const middleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({dest:"uploads/"});

userRoute.post("/signup", userController.userSignUp);
userRoute.post("/login", userController.userLogIn);

// get user
userRoute.get("/getuser",middleware.verifyToken, userController.getUser);

// avatar update 
userRoute.put("/update-user-avatar",middleware.verifyToken,upload.single("image"),userController.userAvatarUpdate);

userRoute.get("/profile/:id",middleware.verifyToken,userController.userProfile);

userRoute.post("/profile/update",middleware.verifyToken,userController.updateProfile);
userRoute.post("/logout",middleware.verifyToken,userController.logoutUser);



module.exports = userRoute;
