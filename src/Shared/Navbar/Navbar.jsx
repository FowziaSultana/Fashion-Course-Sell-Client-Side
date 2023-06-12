import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/Capture.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Providers/AuthProviders";
import Loader from "../Loader/Loader";

import { themeChange } from "theme-change";

const Navbar = () => {
  const [checkBox, setCheckbox] = useState(false);
  const handlecheck = (event) => {
    //setCheckbox(document.getElementById("myCheck").checked);
    setCheckbox(event.target.checked);
    if (!checkBox) {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
    } else if (checkBox) {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
    }

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    alert(document.getElementById("myCheck").checked);
  };

  // console.log(checkBox);
  const { user, logOut, loading, role } = useContext(AuthContext);

  const handlelogOut = () => {
    logOut();
  };

  if (loading) {
    return <Loader></Loader>;
  }

  let linkPath = "";

  if (role === "admin") {
    linkPath = "/dashboard/admin";
  } else if (role === "instructor") {
    linkPath = "/dashboard/instructor";
  } else if (role === "student") {
    linkPath = "/dashboard/student";
  }

  const logedNavItems = (
    <>
      <li>
        {role === "admin" && <Link to={linkPath}>Dashboard</Link>}

        {role === "student" && <Link to={linkPath}>Dashboard</Link>}

        {role === "instructor" && <Link to={linkPath}>Dashboard</Link>}
      </li>

      <li className="block md:hidden">
        <span className="flex justify-center items-center gap-2">
          {" "}
          <div
            className="tooltip tooltip-bottom tooltip-error"
            data-tip={user?.displayName}
          >
            <img className="profileImage" src={user?.photoURL}></img>
          </div>
          <button onClick={handlelogOut} className="btn btn-outline btn-error">
            Logout
          </button>
        </span>
      </li>
    </>
  );

  const navItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/instructors"}>Instructors</Link>
      </li>
      <li>
        <Link to={"/classes"}>Classes</Link>
      </li>
      <li className=" place-self-center">
        {/* <input
          type="checkbox"
          onClick={handlecheck}
          id="myCheck"
          className="toggle"
        /> */}
        <div className="flex place-self-center -m-1">
          {" "}
          <span>Light</span>
          <input
            type="checkbox"
            id="myTheme"
            onChange={handlecheck}
            className="toggle"
          />
          <span>Dark</span>
        </div>
      </li>
    </>
  );
  return (
    <div className=" bg-[#c2b9c9] font-semibold dark:bg-[#1c2424] dark:text-white ">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100  rounded-box w-52 text-[#721227] absolute z-30 dark:text-white dark:bg-[#1c2424]"
            >
              {navItems}
              {user ? logedNavItems : <></>}
            </ul>
          </div>

          <img className="w-14 h-14 rounded-full" src={logo}></img>
          <p className="text-lg text-[#721227] ml-4 dark:text-white">
            Couture Castle
          </p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1  text-[#721227] dark:text-white">
            {navItems}
            {user ? logedNavItems : <></>}
          </ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <div className="hidden md:block">
              <span className="flex justify-center items-center gap-2 ">
                {" "}
                <div
                  className="tooltip tooltip-left"
                  data-tip={user?.displayName}
                >
                  <img className="profileImage" src={user?.photoURL}></img>
                </div>
                <button
                  onClick={handlelogOut}
                  className="btn btn-outline btn-error"
                >
                  Logout
                </button>
              </span>
            </div>
          ) : (
            // <button
            //   onClick={handlelogOut}
            //   className="btn btn-outline btn-error"
            // >
            //   Logout
            // </button>
            <Link
              to={"/login"}
              className="btn btn-outline btn-error  dark:btn-neutral "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
