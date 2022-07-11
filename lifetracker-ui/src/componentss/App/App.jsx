import Navbar from "../Navbar/Navbar";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
// import Registration from "../Registration/SignUp";
import SignInSide from "../SignInSide/SignInSide";
import SignUp from "../Registration/SignUp";
import Portal from "../Portal/Portal";

import { useState } from "react";
export default function App() {

  const [appState, setAppState] = useState({})

  return (
    <div className="app">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
            <Route path = "/" element = {<Home/>} />
          <Route path="/registration" element ={<SignUp setAppState={setAppState}/>} />
          <Route path = "/login" element = { <SignInSide setAppState={setAppState}/>} />
          <Route path= "/portal" element = {<Portal setAppState={setAppState} user = {appState?.user}/>} />
        </Routes>
        
      </BrowserRouter>

      
    </div>
  );
}
