import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import ProductCard from "../../../component/ProductCard/ProductCard";
import { server } from "../../../server/server";
import axios from "axios";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const [ingredient, setIngredient] = useState("");
  const [recipesData, setRecipesData] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(false);
      const { data } = await axios.get(
        `${server}/api/recipes?ingredients=${ingredient}&number=10`,
        { withCredentials: true }
      );
      console.log(data.result);
      if (data.success) {
        setRecipesData(data.result);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-blue-400 h-[60px] flex items-center w-full sticky top-0 z-10">
        <div className="w-full px-2 flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </Link>

          <form className="relative sm:w-1/2 mt-5" onSubmit={handleSubmit}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="sm:w-[100%] rounded-full pl-2 pr-8 flex items-center py-1 outline-none text-center"
              placeholder="search as ingredient..."
            />
            <button type="submit">
              <IoSearchOutline
                className="absolute right-2 top-1 text-gray-400 cursor-pointer hover:text-gray-500"
                size={22}
              />
            </button>
          </form>

          <div className="flex gap-2 cursor-pointer hover:text-gray-700">
            <Link
              to={`${user ? "/profile" : "/login"}`}
              className="flex items-center"
            >
              {user ? (
                <img
                  src={user?.avatar?.url}
                  className="w-[40px] h-[40px] border border-blue-500 rounded-full"
                />
              ) : (
                <CgProfile size={40} />
              )}{" "}
              <h1 className="hidden sm:block">({user && user?.email})</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 w-full items-center justify-center">
        {loading===false ? (
          <div>Loading...</div>
        ) : (
          recipesData?.length > 0 &&
          recipesData.map((item) => <ProductCard recipesData={item} />)
        )}
      </div>
    </>
  );
};

export default Header;
