import React, { useState } from "react";

import LikeList from "../../component/LikeList/LikeList";
import ProfileHeader from "../../component/ProfileHeader/ProfileHeader";


const LikeListPage = () => {
    
  return (
    <div>
      <ProfileHeader select={3} />
      <div className="flex w-full mt-16">
        <LikeList select={3} />
      </div>
    </div>
  );
};

export default LikeListPage;