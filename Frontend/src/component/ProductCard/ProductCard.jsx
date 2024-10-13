import React, { useState } from "react";

const ProductCard = ({ recipesData }) => {
    const [open,setOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm">
      <div>
        <img
          src={recipesData?.image_url}
          alt="Product"
          className="w-full h-48 object-cover rounded-t-lg"
          onClick={()=>setOpen(!open)}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{recipesData?.title}</h2>
        <p className="text-gray-600">
          {recipesData?.instructions.slice(0, 50)}...
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
