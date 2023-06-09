import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Error from "../Shared/Error/Error";
import HomeDashboard from "../Pages/Dashboard/HomeDashboard/HomeDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import InstructorsDashboard from "../Pages/Dashboard/InstructorsDashboard/InstructorsDashboard";
import StudentDashboard from "../Pages/Dashboard/StudentDashboard/StudentDashboard";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers";
import AddClasses from "../Pages/Dashboard/InstructorsDashboard/AddClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <HomeDashboard></HomeDashboard>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            {" "}
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "instructor",
        element: (
          <InstructorRoute>
            {" "}
            <InstructorsDashboard></InstructorsDashboard>
          </InstructorRoute>
        ),
      },
      {
        path: "addclasses",
        element: (
          <InstructorRoute>
            {" "}
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "student",
        element: (
          <StudentRoute>
            <StudentDashboard></StudentDashboard>
          </StudentRoute>
        ),
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
