import { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../src/DataContext/DataContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import "./header.css";

const Header = () => {
  const { setNav, nav, setSearch } = useContext(DataContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">BLOG</Link>
      </div>

      <div className="right-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="profile-button" onClick={() => setNav(!nav)}>
          {nav ? <IoCloseCircleOutline /> : <RiAccountCircleLine />}
        </button>
      </div>
    </header>
  );
};

export default Header;
