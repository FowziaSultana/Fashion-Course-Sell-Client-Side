import React, { useContext } from "react";
import logo from "../../assets/Capture.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Providers/AuthProviders";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const handlelogOut = () => {
    logOut();
  };

  if (loading) {
    return <Loader></Loader>;
  }

  const logedNavItems = (
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
      <li>
        <Link to={"/classes"}>Dashboard</Link>
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
    </>
  );
  return (
    <div className=" bg-[#c2b9c9] font-semibold">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100  rounded-box w-52 text-[#721227] "
            >
              {navItems}
              {user ? logedNavItems : <></>}
            </ul>
          </div>

          <img className="w-14 h-14 rounded-full" src={logo}></img>
          <p className="text-lg text-[#721227] ml-4">Couture Castle</p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1  text-[#721227] ">
            {navItems}
            {/* {user ? logedNavItems : <></>} */}
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
            <Link to={"/login"} className="btn btn-outline btn-error">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
