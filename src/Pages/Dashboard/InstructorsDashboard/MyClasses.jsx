import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  return (
    <div>
      <h1 className="text-center text-tahiti text-xl lg:text-5xl">
        My Classes : {classes.length}
      </h1>
    </div>
  );
};

export default MyClasses;
