import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProviders";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/classes/${user.email}`);
    console.log(res.data);
    return res.data;
  });
  return (
    <div>
      <h1 className="text-center text-[#721227] text-xl lg:text-3xl my-8">
        My Classes
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Fee(Tk)</th>
              <th>Enrolled Students</th>
              <th>Available Seats</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((aClass, index) => (
              <tr key={aClass._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={aClass.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{aClass.name}</div>
                    </div>
                  </div>
                </td>
                <td>{aClass.price}</td>
                <td>{aClass.enrolledStudents}</td>
                <td>{aClass.seats}</td>
                <td>{aClass.status}</td>
                {aClass.status == "pending" || aClass.status == "approved" ? (
                  <td></td>
                ) : (
                  <td>{aClass.feedback}</td>
                )}

                {/* <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
