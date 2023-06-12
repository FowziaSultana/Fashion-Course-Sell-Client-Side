import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProviders";

const EnrolledClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);

  //fetching all selected classes
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/enrolledClass`);
    const finalClasses = res.data.filter(
      (aCls) =>
        aCls.studentEmail == user.email && aCls.isEnrolled == "completed"
    );
    //console.log(finalClasses);
    return finalClasses;
  });
  return (
    <div>
      <h1 className="text-[#721227] text-4xl mb-8">My Enrolled Classes</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Fee(Tk)</th>
              <th>Action</th>
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
                        <img src={aClass.photo} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{aClass.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="uppercase">{aClass.instructorName}</span>
                </td>
                <td>{aClass.price}</td>
                <td>Enrolled</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClass;
