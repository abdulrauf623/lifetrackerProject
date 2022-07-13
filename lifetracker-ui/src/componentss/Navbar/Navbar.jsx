import "./Navbar.css";

import { Link } from "react-router-dom";
import APIClient from "../service/APIClient";

export default function Navbar({user, setUser, handleLogOut}) {
  
  
  return (
    <ul className="navbar">
      <Link to="/">
        {" "}
        <img
          className="image"
          src="https://codepath-student-store-demo.surge.sh/assets/codepath.f1b3e41a.svg"
          alt="codepath"
        />
      </Link>

      {user?.email ? (
        <>
      <Link to="/portal"><li className="tag">Activity</li></Link>
      <Link to = "/exercise"><li className="tag">Exercise</li></Link>
      <li className="tag"> Nutrition</li>
      <li className="tag"> Sleep </li>
      <li className="tag">
        <span onClick={handleLogOut}> Logout</span>
      </li>
        
        
        </>


      ):
      (
        <>
        <Link to="/registration">
        {" "}
        <li className="tag">Sign Up</li>{" "}
      </Link>

      <Link to="/login">
        {" "}
        <li className="tag">Log In</li>{" "}
      </Link>
        </>
      )
      }

      
    </ul>
  );
}
