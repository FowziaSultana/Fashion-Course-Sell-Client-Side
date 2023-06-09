import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="text-tahiti text-6xl">
        Welcome Student {user.displayName}{" "}
      </h1>
    </div>
  );
};

export default StudentDashboard;
