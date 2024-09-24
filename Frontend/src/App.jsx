import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  HomePage,
  ProfilePage,
  ProfileUpdatePage,
  LikeListPage,
  SaveItemPage
} from "./Route/Route";
import Store from "./Redux/store";
import { userLoader } from "./Redux/Action/userAction";

const App = () => {
  useEffect(() => {
    Store.dispatch(userLoader());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/update" element={<ProfileUpdatePage />} />
        <Route path="/like-list" element={<LikeListPage />} />
        <Route path="/save-item" element={<SaveItemPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </BrowserRouter>
  );
};

export default App;
