import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaAmazonPay, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProviders";
import { Link } from "react-router-dom";

const SelectedClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);

  //fetching all selected classes
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/enrolledClass`);
    const finalClasses = res.data.filter(
      (aCls) =>
        aCls.studentEmail == user.email && aCls.isEnrolled != "completed"
    );
    //console.log(finalClasses);
    return finalClasses;
  });

  const handleDeleteClass = (classObj) => {
    //console.log(classObj);
    let id = classObj._id;

    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // console.log(id);
        fetch(
          `https://b7a12-summer-camp-server-side-fowzia-sultana.vercel.app/enrolledClass/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);

            if (data.deletedCount == 1) {
              Swal.fire("Deleted!", "", "success");
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <h1 className="text-[#721227] text-4xl mb-8"> My Selected Classes</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Fee(Tk)</th>

              <th className="text-center">Action</th>
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
                <td>
                  <div className=" flex justify-center gap-2">
                    <button
                      onClick={() => handleDeleteClass(aClass)}
                      className=" btn btn-error btn-outline"
                    >
                      <FaTrash></FaTrash>
                    </button>
                    <Link
                      to={"/dashboard/payment"}
                      state={{ classDetails: aClass }}
                      className=" btn btn-error btn-outline"
                    >
                      <FaAmazonPay></FaAmazonPay>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClass;
