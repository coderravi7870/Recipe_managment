import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { server } from "../../server/server";

const SignUp = () => {
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle normal signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${server}/user/signup`, {
        fullname: fullName,
        email,
        password,
      })
      .then((result) => {
        if (result.data?.success) {
          toast.success("Signup successful!");
          navigate("/login");
        } else {
          toast.error(result?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Signup failed");
      });
  };

  
  return (
    
      <div className="w-full min-h-screen sm:bg-gray-500 bg-slate-200 flex justify-center mx-auto items-center select-none">
        <div className="sm:w-[400px] bg-slate-300 p-4 rounded-lg">
          <h4 className="text-xl font-bold text-center">Register as new user</h4>
          <div className="mt-5 object-cover">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-[17px] font-mono mb-1">Full Name</label>
                <input
                  type="text"
                  autoComplete="name"
                  name="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-[17px] py-1 px-2 rounded-lg outline-none focus:outline-blue-600 w-full"
                />
              </div>
              <div className="mb-3">
                <label className="block text-[17px] font-mono mb-1">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[17px] py-1 px-2 rounded-lg outline-none focus:outline-blue-600 w-full"
                />
              </div>
              <div className="mb-3 ">
                <label className="block text-[17px] font-mono mb-1">Password</label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    autoComplete="password"
                    required
                    name="password"
                    value={password}
                    minLength={4}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-[17px] py-1 px-2 rounded-lg outline-none focus:outline-blue-600 w-full"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-4 items-center">
                <button className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-400 hover:font-mono">
                  Submit
                </button>
                <p className="font-medium ml-2">
                  If You have Account:-{" "}
                  <Link to="/login" className="text-blue-500">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default SignUp;
