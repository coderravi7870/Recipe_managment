import React, { useState } from "react";

import ProfileUpdate from "../../component/ProfileUpdate/ProfileUpdate";
import ProfileHeader from "../../component/ProfileHeader/ProfileHeader";


const ProfileUpdatePage = () => {
    
  return (
    <div>
      <ProfileHeader select={2} />
      <div className="flex w-full mt-16">
        <ProfileUpdate select={2} />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;