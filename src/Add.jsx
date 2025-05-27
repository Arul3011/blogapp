import React, { useContext, useEffect, useState } from "react";
import "./add.css";
import Header from "./Header";
import { useForm } from "react-hook-form";
import DataContext from "../src/DataContext/DataContext";
import { Nav } from "./Nav";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Add(props) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { userID, setUserID } = useContext(DataContext);
  const date = new Date();
  const [content, setContent] = useState("");

  const onsubmit = async (data) => {
    try {
      const frtres = await fetch(
        "https://next-api-blogapp.vercel.app/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            time: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
            blog: content,
            userID: userID,
          }),
        }
      );
      const dbres = await frtres.json();
      reset();
      setContent("");
      navigate("/");
      props.setData([...props.data, dbres]);
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
      console.log(error);
    }
  };

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
        <div className="addcontainer">
          <form onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title cannot be empty" })}
            />
            {errors.title && <div className="error">{errors.title.message}</div>}

            <label htmlFor="editor">Blog Content</label>
            <ReactQuill
              id="editor"
              value={content}
              onChange={setContent}
              placeholder="Write your blog here..."
              style={{ height: "250px", marginBottom: "20px" }}
            />
            {content.trim() === "" && errors.blog && (
              <div className="error">{errors.blog.message}</div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "POST"}
            </button>

            {errors.root && <div className="error">{errors.root.message}</div>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
