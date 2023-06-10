import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();

  //fetching all selected classes
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/users`);
    const instructors = res.data.filter((aUser) => aUser.role == "instructor");
    return instructors;
  });
  return (
    <div className="text-center">
      <h1 className="text-tahiti text-4xl my-8 "> OUR INSTRUCTORS</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-y-10">
        {users.map((aClass) => (
          <div
            key={aClass._id}
            className="max-w-sm  bg-white rounded-lg shadow-xl p-5 hover:shadow-2xl"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-[400px] h-[200px] object-cover mx-auto"
                src={aClass.photo}
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-tahiti ">
                  {aClass.name}
                </h5>
              </a>
              <p className=" font-normal text-gray-700 ">{aClass.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
