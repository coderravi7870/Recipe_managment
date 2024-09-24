const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fullname: { type: String, required: true, min: 6, max: 30 },
  email: { type: String, required: true,unique: true},
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  avatar:{
    public_id: {type:String},
    url:{type:String}
  },
  favorite: [{ type: Schema.ObjectId, ref: "user", default: [] }],
});

const User = model("user", UserSchema);
module.exports = User;
