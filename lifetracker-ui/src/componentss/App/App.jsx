import Navbar from "../Navbar/Navbar";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Registration from "../Registration/SignUp";
import SignInSide from "../SignInSide/SignInSide";
import SignUp from "../Registration/SignUp";
export default function App() {
  return (
    <div className="app">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path = "/" element = {<Home/>} />
          <Route path="/registration" element ={<SignUp />} />
          <Route path = "/login" element = { <SignInSide/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}
