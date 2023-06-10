import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Classes = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, role } = useContext(AuthContext);

  //fetching all classes
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/classes`);
    const approvedClasses = res.data.filter(
      (aData) => aData.status == "approved"
    );
    //console.log(approvedClasses);
    return approvedClasses;
  });

  const handleSelectClass = (classObj) => {
    Swal.fire({
      title: "Do you wish to enroll in this?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(id);
        const newItem = {
          name: classObj.name,
          photo: classObj.photo,
          price: parseFloat(classObj.price),
          isEnrolled: "pending",
          studentEmail: user.email,
          classId: classObj._id,
          paymentStatus: "pending",
          instructorName: classObj.instructorName,
        };
        // console.log(newItem);
        axiosSecure.post("/enrolledClass", newItem).then((data) => {
          //console.log("after adding new class", data.data);
          if (data.data.insertedId) {
            Swal.fire("Added to your class list", "", "success");
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-tahiti text-xl lg:text-5xl my-8">
        All Classes
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-y-10">
        {classes.map((aClass) => (
          <div
            key={aClass._id}
            className={`max-w-sm ${
              aClass.seats === 0 ? "bg-[#f87171]" : "bg-white"
            }  rounded-lg shadow-xl p-5 hover:shadow-tahiti`}
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
              <p className=" font-normal text-gray-700 ">
                <span className="font-bold text-tahiti">
                  Course Instructor:
                </span>{" "}
                <span className="uppercase">{aClass.instructorName}</span>
              </p>
              <p className=" font-normal text-gray-700 ">
                <span className="font-bold text-tahiti"> Course FEE:</span>{" "}
                {aClass.price} tk
              </p>
              <p className="mb-3 font-normal text-gray-700 ">
                <span className="font-bold text-tahiti">Available seats:</span>{" "}
                {aClass.seats}
              </p>
              {user ? (
                <button
                  disabled={
                    aClass.seats == 0 ||
                    role === "admin" ||
                    role === "instructor"
                  }
                  className="btn  btn-error"
                  onClick={() => handleSelectClass(aClass)}
                >
                  Select
                </button>
              ) : (
                <button
                  className="btn btn-error btn-outline"
                  onClick={() => window.my_modal_5.showModal()}
                >
                  Select
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box text-center">
          <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">You have to login first</h3>
          <Link className="btn btn-xs btn-error" to={"/login"}>
            Login
          </Link>
        </form>
      </dialog>
    </div>
  );
};

export default Classes;
