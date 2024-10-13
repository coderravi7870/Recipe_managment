import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { server } from "../../server/server";
import { toast } from "react-toastify";
import axios from "axios";
import { userLoader } from "../../Redux/Action/userAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${server}/user/login`, {
      email, 
      password
    }, {
      withCredentials: true  // Important for sending cookies
    })
    .then((result) => {
      if (result.data?.success) {
        // On success, show a success message and navigate
        toast.success(result?.data?.message);
        navigate("/");
        dispatch(userLoader());
      } else {
        // On failure, show an error message
        toast.error(result?.data?.message || "Login failed");
      }
    })
    .catch((err) => {
      // Log the error details for debugging
      console.error(err);
  
      // Handle potential error cases more explicitly
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "An error occurred");
      } else {
        toast.error("Network error or server is unreachable");
      }
    });
  
  }
  return (
    <div className="w-full min-h-screen sm:bg-gray-500 bg-slate-200 flex justify-center mx-auto items-center select-none">
      <div className="sm:w-[400px] bg-slate-300 p-4 rounded-lg">
        <h4 className="text-xl font-bold text-center">Login Your Account</h4>
        <div className="mt-5 object-cover">
          <form onSubmit={handleSubmit}>
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
              <label className="block text-[17px] font-mono mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  autoComplete="password"
                  required
                  name="password"
                  value={password}
                  minLength={4}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[17px] py-1 px-2 rounded-lg outline-none focus:outline-blue-600 sm:w-full"
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

            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4" />
                <h2 className="ml-2 block text-sm text-gray-900">
                  Remember me
                </h2>
              </div>

              <h2 className="font-medium text-blue-600 hover:text-blue-500">
                Forget Password
              </h2>
            </div>

            <div className="flex justify-between mt-4 items-center">
              <button className="bg-blue-600 px-4 py-2 rounded-xl">
                Submit
              </button>
              <p className="font-medium ml-2">
                If You have no Account:-{" "}
                <Link to="/sign-up" className="text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
