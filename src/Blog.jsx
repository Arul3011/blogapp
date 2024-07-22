import React from "react";
import { useParams, useNavigate } from "react-router";
import "./blog.css";
import { FaRegArrowAltCircleUp } from "@react-icons/all-files/fa/FaRegArrowAltCircleUp";

const Blog = ({ data }) => {
  const { id } = useParams();
  const blogdata = data.filter((val) => val._id == id);
  const navigate = useNavigate();
  const handelback = () => {
    navigate("/");
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="blog">
      <button className="blogbtn" onClick={handelback} id="top">
        BACK
      </button>
      <h2>{blogdata[0].title}</h2>

      <pre className="p">{blogdata[0].blog}</pre>
      <button className="scroolbtn" onClick={scrollToTop}>
        <FaRegArrowAltCircleUp />
      </button>
    </div>
  );
};

export default Blog;
