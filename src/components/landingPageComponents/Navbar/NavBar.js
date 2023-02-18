import React, { useState } from "react";
import LOGO from "./../../images/logo-no-icon.png";
import "./NavBar.css";
import { FaTimes } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import Button from "../Button/Button";
import { FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const menuToggleHandler = () => setClick(!click);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-elements">
          <a href="index.html">
            <img src={LOGO} alt="" className="navbar-logo" />
          </a>

          <div
            className={
              click ? "nav-item-wrapper open-menu" : "nav-item-wrapper"
            }
          >
            <ul className="nav-items">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
            
            <Button className="button"
            buttonText="Book a Ride"
            buttonIcon={<FaArrowRight/>}
            />
          </div>
          <button className="nav-button toggle" onClick={menuToggleHandler}>
            {click ? <FaTimes /> : <IoGrid />}
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
