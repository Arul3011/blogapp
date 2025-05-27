import React, { useContext } from "react";
import DataContext from "./DataContext/DataContext";
import { useNavigate } from "react-router";
import './nav.css'
export const Nav = () => {
  const { setUser, setNav, nav, setUserID, setuserName, userID } =
    useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setNav(false);
    setUser(false);
    setUserID("");
    setuserName("");
    document.cookie = `userId=${userID};max-age=0`;
  };

  return (
    <div className={`dropdown-menu ${nav ? "open" : ""}`}>
      <ul>
        <li
          onClick={() => {
            navigate("/user");
            setNav(false);
          }}
        >
          Profile
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};
