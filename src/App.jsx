import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import Add from "./Add";
import User from "./User";
import ProtectedRoute from "./utlity/Proctedrout";
import "./App.css";
import Blog from "./Blog";
import Login from "./Login";
import Sigin from "./Sigin";
import { DataProvider } from "../src/DataContext/DataContext";
import { Verfiy } from "./Verfiy";
import { Otp } from "./Otp";

function App() {
  const [data, setData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbres = await fetch(
          "https://next-api-blogapp.vercel.app/api/posts"
        );
        const datajson = await dbres.json();
        if (datajson) {
          setData(datajson.dbresponse.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div className="cointainer">
      <DataProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sigin" element={<Sigin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home data={data} />} />
            <Route
              path="/add"
              element={<Add data={data} setData={setData} />}
            />
            <Route
              path="/user"
              element={<User data={data} setData={setData} />}
            />
            <Route path="/:id" element={<Blog data={data} />} />
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
