import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const showMenu = () => {
    setMenu(!menu);
  };

  // This function will run on every keystroke
  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setPrompt(searchText);

    // Navigate with the updated search parameter on every keystroke
    if (searchText.trim()) {
      navigate(`/?search=${searchText}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Collage Blogging</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 border rounded-lg px-2 py-1">
          <input
            onChange={handleInputChange}
            className="outline-none px-3"
            placeholder="Search a post"
            type="text"
            value={prompt}
          />
          <p className="cursor-pointer hover:text-blue-500">
            <BsSearch />
          </p>
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {isAuthenticated ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {isAuthenticated ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
