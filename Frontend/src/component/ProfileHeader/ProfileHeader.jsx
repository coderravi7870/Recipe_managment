import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { server } from "../../server/server";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileHeader = ({ select }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  //   console.log(open);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${server}/user/logout`,
        {},
        {
          withCredentials: true, // Ensure this is part of the config, not request body
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="  bg-blue-400 h-[60px] flex items-center w-full fixed top-0 z-20">
      <div className="w-full px-2 flex justify-between items-center">
        <div>
          <GiHamburgerMenu size={30} onClick={() => setOpen(!open)} />
        </div>
        {open && (
          <div className="w-full h-screen fixed bg-[#0000004b] top-0 left-0 z-20 ">
            <div className="sm:w-[200px] w-min bg-white h-screen rounded-r-2xl shadow-2xl">
              <div className="w-full flex justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </div>

              <div className="w-full h-[70%] flex flex-col justify-center  mx-auto gap-10 px-14">
                <div className="cursor-pointer">
                  <Link
                    to="/profile"
                    className={`${
                      select === 1 ? "text-red-500" : "hover:text-red-500"
                    } text-lg`}
                    onClick={select === 1}
                  >
                    Profile
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <Link
                    to="/profile/update"
                    className={`${
                      select === 2 ? "text-red-500" : "hover:text-red-500"
                    } text-lg`}
                    onClick={select === 2}
                  >
                    Update
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <Link
                    to="/like-list"
                    className={`${
                      select === 3 ? "text-red-500" : "hover:text-red-500"
                    } text-lg`}
                    onClick={select === 3}
                  >
                    Likes
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <Link
                    to="/save-item"
                    className={`${
                      select === 4 ? "text-red-500" : "hover:text-red-500"
                    } text-lg`}
                    onClick={select === 4}
                  >
                    Save
                  </Link>
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  className="w-[150px] bg-blue-500 px-4 py-2 hover:bg-blue-400 rounded-xl"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <Link to="/">
          <img src="" alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
