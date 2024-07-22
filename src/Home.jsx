import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import "./home.css";
import Header from "./Header";
import DataContext from "./DataContext/DataContext";
import React from "react";
import { Nav } from "./Nav";
const Home = ({ data }) => {
  const { search, setuserName, setUserID } = useContext(DataContext);
  useEffect(() => {
    if (document.cookie) {
      const cokie = document.cookie.split(";");
      const value = cokie[0].split("=");
      setUserID(value[1]);
    }
  }, []);
  return (
    <div>
      <Header className="header" />
      <Nav />
      <Link to={"/add"} className="addbtn">
        +
      </Link>

      <ul>
        {data && data.length === 0 ? (
          <p>loading....</p>
        ) : search ? (
          data
            .filter((val) =>
              val.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((val) => (
              <Link key={val._id} to={`/${val._id}`}>
                <li>
                  <h2>{val.title}</h2>
                  <p>{val.blog.slice(0, 25)}....</p>
                  <small>{val.time}</small>
                </li>
              </Link>
            ))
        ) : (
          data.map((val) => (
            <Link key={val._id} to={`/${val._id}`}>
              <li>
                <h2>{val.title}</h2>
                <p>{val.blog.slice(0, 25)}....</p>
                <small>{val.time}</small>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
