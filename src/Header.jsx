import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataContext from "../src/DataContext/DataContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
const Header = () => {
  const navigate = useNavigate();
  const { setNav, nav, search, setSearch } = useContext(DataContext);

  return (
    <>
      <header>
        <div className="part1">
          <div className="logo">
            <Link to={"/"}>BLOG</Link>
          </div>
          <input
            type="text"
            placeholder="Search...."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="part2">
          <button
            className="profil"
            onClick={() => {
              setNav(!nav);
            }}
          >
            {nav ? <IoCloseCircleOutline /> : <RiAccountCircleLine />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
