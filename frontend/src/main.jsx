import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/signup' element = {<SignUp/>}/>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
