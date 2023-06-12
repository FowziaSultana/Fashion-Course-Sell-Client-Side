import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="text-[#721227] text-6xl">
        Welcome Admin {user.displayName}{" "}
      </h1>
    </div>
  );
};

export default AdminDashboard;
