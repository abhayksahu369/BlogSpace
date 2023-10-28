import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './components/homepage/Nav';
import HomeBlogs from './components/homepage/HomeBlogs';
import MyProfile from './components/MyProfile';
import UserProfile from './components/UserProfile';
import CreateBlog from './components/CreateBlog';
import UpdateBlog from './components/UpdateBlog';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import Blog from './components/Blog';
import Edituser from './components/Edituser';
import Footer from './components/homepage/Footer';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Nav />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<HomeBlogs />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/userprofile/:id" element={<UserProfile />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/updateblog/:id" element={<UpdateBlog />} />
            <Route path="/blog/:blogid/:userid" element={<Blog />} />
            <Route path="/edituser" element={<Edituser />} />
          </Route>
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        


      </BrowserRouter>




    </div>
  );
}

export default App;
