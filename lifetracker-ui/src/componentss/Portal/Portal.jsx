import "./Portal.css";
import { useNavigate, Link } from "react-router-dom";

export default function Portal({user, setAppState}) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.email);

  return (
    <>
      <div className="banner">
        <h1> Activity Feed</h1>

        <div className="buttons">
          <button className="button"> Add exercise</button>
          <button className="button"> Log Sleep</button>
          <button className="button">Record Nutrition</button>
        </div>
      </div>

    </>
  );
}
