import React, { useState } from "react";

import Profile from "../../component/Profile/Profile";
import ProfileHeader from "../../component/ProfileHeader/ProfileHeader";


const ProfilePage = () => {
    
  return (
    <div>
      <ProfileHeader select={1} />
      <div className="flex w-full mt-16">
        <Profile select={1} />
      </div>
    </div>
  );
};

export default ProfilePage;
