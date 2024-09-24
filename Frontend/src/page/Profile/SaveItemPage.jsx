import React, { useState } from "react";

import SaveItems from "../../component/SaveItems/SaveItems";
import ProfileHeader from "../../component/ProfileHeader/ProfileHeader";


const SaveItemPage = () => {
    
  return (
    <div>
      <ProfileHeader select={4} />
      <div className="flex w-full mt-16">
        <SaveItems select={4} />
      </div>
    </div>
  );
};

export default SaveItemPage;