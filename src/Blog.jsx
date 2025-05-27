import React from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowUp, FaArrowLeft } from "react-icons/fa";
import "./blog.css";

const Blog = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogData = data.find((val) => val._id === id);

  const handleBack = () => navigate("/");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!blogData) {
    return <div className="blog-not-found">Blog not found.</div>;
  }

  return (
    <div className="blog-page">
      <div className="blog-wrapper">
        <article className="blog-card">
          <button className="home-button-top" onClick={handleBack}>
            <FaArrowLeft /> Back to Home
          </button>

          <h1 className="blog-title">{blogData.title}</h1>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogData.blog }}
          />
        </article>
      </div>

      <button className="scroll-button" onClick={scrollToTop} title="Scroll to top">
        <FaArrowUp />
      </button>
    </div>
  );
};

export default Blog;
