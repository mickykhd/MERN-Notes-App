import React from "react";
import "./Navbar.css";
import { Outlet, useNavigate } from "react-router-dom";
import { handleChange } from "../../mainSlice/mainSlice";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.notesMain);
  const handleLogIn = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    dispatch(handleChange({ name: "logout", value: "" }));
    navigate("/");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  return (
    <div className="nav">
      <div className="nav-cont">
        <h2>Your Daily Notes Companion</h2>
        <div className="nav-links">
          <button onClick={token ? handleLogout : handleLogIn}>
            {token ? "Log Out" : "Log In"}
          </button>
          {!token && <button onClick={handleSignup}>Sign Up</button>}
          <button onClick={handleAbout}>About</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
