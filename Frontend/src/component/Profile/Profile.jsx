import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbCameraPlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import { server } from "../../server/server";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = ({ select }) => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  
  const handleImage = async (e) => {
    // console.log("ram ram");
    
    const newForm = new FormData();

    newForm.append("image",e.target.files[0]);

    await axios.put(`${server}/user/update-user-avatar`,newForm,{
      headers:{ "Content-Type": "application/form-data"},
      withCredentials: true
    }).then((data)=>{
      if(data?.data?.success){
        toast.success(data?.data?.message);
        window.location.reload();
      }
    }).catch(err=>{
      toast.error(err);
    })
  }
  
  
  return (
    <div className="bg-white w-full h-[91vh] mx-auto px-4">
      <div className="w-full flex justify-center items-center sm:gap-10 gap-2 sm:flex-row flex-col">
        {/* avatar */}
        <div className="relative">
              <img
                src={user?.avatar?.url}
                className="w-[150px] h-[150px] rounded-full boject-cover border-[3px] border-[#3ad132]"
                alt="pic"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>

        {/* Name */}
        <div className="ml-10 flex flex-col items-center">
          <div>
            <h1 className="text-xl">{user?.fullname}</h1>
            <h1 className="text-xl mt-2">{user?.bio}</h1>
          </div>
        </div>
      </div>
      <hr className="flex-grow border-gray-500 sm:mt-10 mt-5" />

      {/* <div>

      </div> */}
    </div>
  );
};

export default Profile;
