import Navbar from "../Navbar/Navbar";

import "./App.css";
import Exercise from "../Exercise/Exercise";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
// import Registration from "../Registration/SignUp";
import SignInSide from "../SignInSide/SignInSide";
import SignUp from "../Registration/SignUp";
import Portal from "../Portal/Portal";
import useToken from "../useToken/useToken";

import { useEffect, useState } from "react";
import APIClient from "../service/APIClient";
export default function App() {

  const [user, setUser] = useState({})
  const [error, setError] = useState()

  useEffect(()=>{


    const fetchUser = async() => {

      const {data, error} = await APIClient.fetchUserFromToken()

      console.log("fetch user from token fine fine??", data, error)

      if (data) setUser(data.user)

      if (error) setError(error)
    }

    const token = localStorage.getItem(`rate_my_token_setup`)

    if (token){
      APIClient.setToken(token)
      fetchUser()
    }


  },[])


  const handleLogOut = async () =>{

    await APIClient.logOutUser()
    setUser({})
    setError(null)

  }

  


  return (
    <div className="app">
      
      <BrowserRouter>
      <Navbar handleLogOut={handleLogOut} user = {user} setUser = {setUser} />
        <Routes>
            <Route path = "/" element = {<Home/>} />
          <Route path="/registration" element ={<SignUp user={user} setUser={setUser}/>} />
          <Route path = "/login" element = { <SignInSide user = {user} setUser={setUser}/>} />
          <Route path= "/portal" element = {<Portal setUser={setUser} user = {user}/>} />
          <Route path = "/exercise" element = {<Exercise/>} />
        </Routes>
        
      </BrowserRouter>

      
    </div>
  );
}
