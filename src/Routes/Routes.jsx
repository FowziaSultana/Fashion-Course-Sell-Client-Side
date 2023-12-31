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
import MyClasses from "../Pages/Dashboard/InstructorsDashboard/MyClasses";
import ManageClasessByAdmin from "../Pages/Dashboard/AdminDashboard/ManageClasessByAdmin";
import SelectedClass from "../Pages/Dashboard/StudentDashboard/SelectedClass";
import EnrolledClass from "../Pages/Dashboard/StudentDashboard/EnrolledClass";
import Payment from "../Pages/Dashboard/StudentDashboard/AllPayment/Payment";
import PaymentHistory from "../Pages/Dashboard/StudentDashboard/AllPayment/PaymentHistory";

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
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasessByAdmin></ManageClasessByAdmin>
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
        path: "myclasses",
        element: (
          <InstructorRoute>
            {" "}
            <MyClasses></MyClasses>
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
      {
        path: "selectedclass",
        element: (
          <StudentRoute>
            <SelectedClass></SelectedClass>
          </StudentRoute>
        ),
      },
      {
        path: "enrolledclas",
        element: (
          <StudentRoute>
            <EnrolledClass></EnrolledClass>
          </StudentRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
      {
        path: "paymenthistory",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
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
