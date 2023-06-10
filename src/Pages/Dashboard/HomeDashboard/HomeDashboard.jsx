import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import useStudent from "../../../hooks/useStudent";

const HomeDashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();
  return (
    <>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className=" w-full ml-12 my-10">
            <Outlet></Outlet>
          </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-error drawer-button md:hidden"
          >
            Open menu
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/admin">Admin Home</Link>
                </li>
                <li>
                  <Link to="/dashboard/allUsers">Manage User</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageClasses">Manage Classes</Link>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li>
                  <Link to="/dashboard/instructor">Instructor Home</Link>
                </li>
                <li>
                  <Link to="/dashboard/addclasses">Add a Class</Link>
                </li>
                <li>
                  <Link to="/dashboard/myclasses">My Classes</Link>
                </li>
              </>
            )}
            {isStudent && (
              <>
                <li>
                  <Link to="/dashboard/student">Student Home</Link>
                </li>
                <li>
                  <Link to={"/dashboard/selectedclass"}>My Selected Class</Link>
                </li>
                <li>
                  <Link to={"/dashboard/enrolledclas"}>My Enrolled Class</Link>
                </li>
              </>
            )}
            <li>
              <Link to={"/"}>Home</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
