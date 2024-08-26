import React, { useEffect, useContext, useState, useRef } from "react";
import "./user.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import DataContext from "./DataContext/DataContext";
import { Nav } from "./Nav";
import { FaTrashAlt } from "@react-icons/all-files/fa/FaTrashAlt";

function User() {
  const { userID, setUserID, userName } = useContext(DataContext);
  const [resdata, setResdata] = useState([]);
  const [delid, setDelid] = useState("");
  const [localId, setLocalId] = useState(false);
  window.addEventListener("load", () => {
    setLocalId(!localId);
  });
  const dilogref = useRef(null);
  useEffect(() => {
    const userpost = async () => {
      try {
        const dbres = await fetch(
          "https://next-api-blogapp.vercel.app/api/posts/getpost",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID: userID }),
          }
        );
        const response = await dbres.json();
        setResdata(response.insertresponse);
      } catch (error) {
        console.log(error);
      }
    };
    userpost();
  }, [localId]);

  const handeldeletpost = async (id) => {
    try {
      const dbres = await fetch(
        "https://next-api-blogapp.vercel.app/api/posts",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        }
      );
      const response = await dbres.json();
      if (response.message === true) {
        setResdata([...resdata.filter((val) => val._id !== id)]);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  function togelDilog(val) {
    dilogref.current.showModal();
    setDelid(val);
  }
  function dilogfunction(val) {
    if (val) {
      dilogref.current.close();
      handeldeletpost(delid);
      setDelid("");
    } else {
      dilogref.current.close();
    }
  }
  useEffect(() => {
    if (document.cookie) {
      const cokie = document.cookie.split(";");
      // console.log(document.cookie);

      const value = cokie[0].split("=");

      setUserID(value[1]);
    }
  }, []);

  return (
    <div>
      <Header className="header" />
      <Nav />
      <div className="user-details"></div>
      <ul>
        <h2>{userName}</h2>
        {resdata.length === 0 ? (
          <p>nopost</p>
        ) : (
          resdata.map((val) => (
            <div key={val._id}>
              <Link to={`/${val._id}`}>
                <li>
                  <h2>{val.title}</h2>
                  <p>{val.blog.slice(0, 25)}....</p>
                  <small>{val.time}</small>
                  <div className="delbtncon"></div>
                </li>
              </Link>
              <button
                className="button"
                onClick={() => {
                  togelDilog(val._id);
                }}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </ul>
      <dialog ref={dilogref}>
        <div className="dilogbtn">
          <p>want to delete this post</p>
        </div>
        <div className="dilogbtn">
          <button onClick={() => dilogfunction(false)}>cancel</button>
          <button onClick={() => dilogfunction(true)}>OK</button>
        </div>
      </dialog>
    </div>
  );
}

export default User;
