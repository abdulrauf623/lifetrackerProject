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
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import axios from "axios";
export default function App() {

  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    const fetchPosts = async () => {

      // try{
      //   console.log("user right above", user)
      //   const url = `http://localhost:3001/exercise/1`

      //   const results = await axios.get(url)

      //   if(results?.data?.exercisePosts){
      //     setError(null)
      //     setPosts(results.data.exercisePosts)

      //   }
        
  
      // }
      // catch(err){

      //   console.log(err)
      //   const message = err?.response?.data?.error?.message
      //   setError(message ?? String(err))
  
      // }
      const {data, error} = await APIClient.fetchPostFromToken()

      console.log("Returned data fron here", data.exercisePost)

      if (data) setPosts(data.exercisePost)
      if (error) setError(error)

    }

    const token = localStorage.getItem("rate_my_token_setup")

    if (token) {
      APIClient.setToken(token)

      fetchPosts()
    }
    
    
  }, [])

  const addPost = (newPost) => {
    setPosts((oldPosts) => [newPost, ...oldPosts])
  }


  const handleLogOut = async () =>{

    await APIClient.logOutUser()
    setUser({})
    setError(null)

  }

  useEffect(() => {


    const fetchUser = async () => {
      const {data, error} = await APIClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (error) setError(error)
    }

    const token = localStorage.getItem("rate_my_token_setup")
    if (token) {

      APIClient.setToken(token)
      fetchUser()
    }
  }, [])

  


  return (
    <div className="app">
      
      <BrowserRouter>
      <Navbar handleLogOut={handleLogOut} user = {user} setUser = {setUser} />
        <Routes>
            <Route path = "/" element = {<Home/>} />
          <Route path="/registration" element ={<SignUp user={user} setUser={setUser}/>} />
          <Route path = "/login" element = { <SignInSide user = {user} setUser={setUser}/>} />
          <Route path= "/portal" element = {<Portal setUser={setUser} user = {user}/>} />
          <Route path = "/exercise" element = {<Exercise user = {user} posts={posts}/>} />
          <Route path = "/exerciseForm" element = {<ExerciseForm user={user} addPost = {addPost} /> } /> 
        </Routes>
        
      </BrowserRouter>

      
    </div>
  );
}
