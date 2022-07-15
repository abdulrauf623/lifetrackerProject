import "./Portal.css";
import { useNavigate, Link } from "react-router-dom";
import ExerciseForm from "../ExerciseForm/ExerciseForm";

export default function Portal({ user, setUser }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.email) || Boolean(user?.user?.email);
  console.log("auth?", isAuthenticated)

  console.log("User", user);




  const show = isAuthenticated ?(
    <>
      <div className="banner">
        <h1> Activity Feed</h1>

        <div className="buttons">
          <Link to="/exerciseForm"> <button className="button"> Add exercise</button></Link>
          <button className="button"> Log Sleep</button>
          <button className="button">Record Nutrition</button>
        </div>
      </div>

      <div className="tabs">
        <div className="tab">
         <h1 className=""> Nutrition</h1>
         <div className="number"> 0</div>
        </div>
        <div className="tab">
          <h1>Sleep</h1> 
          <div className="number"> 0</div>
        </div>

        <div className="tab">
          <h1> Exercise</h1>
          <div className="number">0</div>
        </div>
      </div>
    
    </>
  ) : <div> Login to see portal</div>
  return <>{show}</>;
}
