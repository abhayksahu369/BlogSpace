import './App.css';
import React from 'react';
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
import PrivateComponent from './components/PrivateComponent';
import SearchUser from './components/SearchUser';
import PageNotFound from './components/PageNotFound';
import ReportAnIssue from './components/ReportAnIssue';
import ContactUs from './components/ContactUs';

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
            <Route path="/searchuser" element={<SearchUser/>}/>
            <Route path="/reportanissue" element={<ReportAnIssue/>}/>
            <Route path="/contactus" element={<ContactUs/>}/>
          </Route>
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
        


      </BrowserRouter>




    </div>
  );
}

export default App;
