import React, { useContext, useEffect, useState } from "react";
import "./add.css";
import Header from "./Header";
import { useForm } from "react-hook-form";
import DataContext from "../src/DataContext/DataContext";
import { Nav } from "./Nav";
import { useNavigate } from "react-router";
function Add(props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { userID, setUserID } = useContext(DataContext);
  const date = new Date();
  const onsubmit = async (data) => {
    try {
      const frtres = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          time: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
          blog: data.blog,
          userID: userID,
        }),
      });
      const dbres = await frtres.json();
      reset({ blog: "" });
      reset({ title: "" });
      navigate("/");
      props.setData([...props.data, dbres]);
    } catch (error) {
      setError("root", {
        message: "something went wrong",
      });
      console.log(error);
    }
  };

  const [localId, setLocalId] = useState(false);
  window.addEventListener("load", () => {
    setLocalId(!localId);
  });

  useEffect(() => {
    if (document.cookie) {
      const cokie = document.cookie.split(";");
      const value = cokie[0].split("=");

      setUserID(value[1]);
    }
  }, []);

  return (
    <>
      <Header className="header" />
      <Nav />
      <div className="div">
        <div className="addcointainer">
          <p>TITLE</p>
          <form onSubmit={handleSubmit(onsubmit)}>
            <input
              type="text"
              name=""
              id="one"
              {...register("title", {
                required: "not be empty",
              })}
            />
            {errors.title && (
              <div className="error">{errors.title.message}</div>
            )}
            <p>BLOG</p>
            <textarea
              id="two"
              {...register("blog", {
                required: "not be empty",
              })}
            ></textarea>
            <br />
            {errors.blog && <div className="error">{errors.blog.message}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "POST"}
            </button>
            {errors.root && <div className="error">{errors.blog.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
