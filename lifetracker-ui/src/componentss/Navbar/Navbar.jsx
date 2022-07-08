import "./Navbar.css";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (



   
    <ul className="navbar">

      <Link to= "/">   <img
        className="image"
        src="https://codepath-student-store-demo.surge.sh/assets/codepath.f1b3e41a.svg"
        alt="codepath"
      /></Link>
     
      <li className="tag">Activity</li>
      <li className="tag">Exercise</li>
      <li className="tag"> Nutrition</li>
      <li className="tag"> Sleep </li>

      <Link to= "/registration">  <li className="tag">Sign Up</li> </Link>
      
      <Link to= "/login">  <li className="tag">Log In</li> </Link>
    </ul>
  );
}
