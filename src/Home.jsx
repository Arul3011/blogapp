import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./home.css";
import Header from "./Header";
import DataContext from "./DataContext/DataContext";
import React from "react";
import { Nav } from "./Nav";

const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

const Home = ({ data }) => {
  const { search, setUserID } = useContext(DataContext);

  useEffect(() => {
    if (document.cookie) {
      const cookie = document.cookie.split(";")[0];
      const value = cookie.split("=")[1];
      setUserID(value);
    }
  }, []);

  const filteredData = search
    ? data.filter((val) =>
        val.title.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div>
      <Header />
      <Nav />
      <Link to="/add" className="add-btn">
        +
      </Link>

      <div className="blog-list">
        {data.length === 0 ? (
          <p className="loading">Loading...</p>
        ) : (
          filteredData.map((val) => (
            <Link key={val._id} to={`/${val._id}`} className="blog-card">
              <h2>{val.title}</h2>
              <p>{stripHtml(val.blog).slice(0, 100)}...</p>
              <small>{val.time}</small>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
