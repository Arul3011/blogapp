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
  const dialogRef = useRef(null);

  // Safely get userID from cookies
  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
      const [key, value] = c.trim().split("=");
      if (key === "userId") {
        setUserID(value);
      }
    }
  }, [setUserID]);

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const dbres = await fetch(
          "https://next-api-blogapp.vercel.app/api/posts/getpost",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID }),
          }
        );
        const response = await dbres.json();
        setResdata(response.insertresponse);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (userID) {
      fetchUserPosts();
    }
  }, [userID]);

  // Delete post by ID
  const handleDeletePost = async (id) => {
    try {
      const dbres = await fetch(
        "https://next-api-blogapp.vercel.app/api/posts",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: id }),
        }
      );
      const response = await dbres.json();
      if (response.message === true) {
        setResdata((prev) => prev.filter((val) => val._id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openDialog = (id) => {
    setDelid(id);
    dialogRef.current.showModal();
  };

  const handleDialogAction = (confirm) => {
    if (confirm) {
      handleDeletePost(delid);
    }
    dialogRef.current.close();
    setDelid("");
  };

  return (
    <div>
      <Header />
      <Nav />

      <div className="user-container">
        <h2 className="user-heading">Hello, {userName}</h2>

        {resdata.length === 0 ? (
          <p className="no-post">You haven't posted anything yet.</p>
        ) : (
          <ul className="user-post-list">
            {resdata.map((val) => (
              <li className="user-post" key={val._id}>
                <div className="post-content">
                  <Link to={`/${val._id}`} className="post-link">
                    <h3>{val.title}</h3>
                    <p>{val.blog.slice(0, 60)}...</p>
                    <small>{val.time}</small>
                  </Link>
                </div>
                <button
                  className="delete-button"
                  onClick={() => openDialog(val._id)}
                  title="Delete post"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <dialog ref={dialogRef} className="delete-dialog">
        <div className="dialog-content">
          <p>Are you sure you want to delete this post?</p>
          <div className="dialog-actions">
            <button onClick={() => handleDialogAction(false)}>Cancel</button>
            <button
              onClick={() => handleDialogAction(true)}
              className="confirm"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default User;
