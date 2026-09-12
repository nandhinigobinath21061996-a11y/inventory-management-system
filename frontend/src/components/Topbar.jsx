import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/topbar.css";

const Topbar = ({ title, subtitle }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-right">
        <div className="profile-circle">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        
      </div>
    </div>
  );
};

export default Topbar;