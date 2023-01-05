import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/Slice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className="navbar d-flex align-items-center justify-content-end">
      <div>
        <button
          data-testid="themes"
          className={`navbar_mode ${theme}`}
          onClick={() =>
            theme === "light"
              ? dispatch(toggleTheme("dark"))
              : dispatch(toggleTheme("light"))
          }
        >
          {theme}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
