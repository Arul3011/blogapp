import React from "react";

import { useContext } from "react";
import DataContext from "./DataContext/DataContext";
import { useNavigate } from "react-router";
export const Nav = () => {
  const { setUser, setNav, nav, setUserID, setuserName, userID } =
    useContext(DataContext);
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar" style={{ display: nav ? "block" : "none" }}>
        <ul>
          <li
            className="navli"
            onClick={() => {
              navigate("/user");
              setNav(false);
            }}
          >
            PROFILE
          </li>
          <li
            className="navli"
            onClick={() => {
              setNav(false);
              setUser(false);
              setUserID("");
              setuserName("");
            
              document.cookie = `userId=${userID};max-age=0`;
            }}
          >
            LOGOUT
          </li>
        </ul>
      </div>
    </div>
  );
};
