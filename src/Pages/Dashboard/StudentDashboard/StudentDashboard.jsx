import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="text-[#721227] text-6xl">
        Welcome Student <span className="uppercase">{user.displayName}</span>{" "}
      </h1>
    </div>
  );
};

export default StudentDashboard;
