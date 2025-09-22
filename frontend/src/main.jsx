import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import EditPost from './pages/EditPost';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/signup' element = {<SignUp/>}/>
            <Route path='/profile' element = {<Profile/>}/>
            <Route path='/profile/edit' element = {<EditProfile/>}/>
            <Route path='/create' element = {<CreatePost/>}/>
            <Route path='myposts' element = {<MyPosts/>}/>
            <Route path='/editpost' element= {<EditPost/>}/>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
