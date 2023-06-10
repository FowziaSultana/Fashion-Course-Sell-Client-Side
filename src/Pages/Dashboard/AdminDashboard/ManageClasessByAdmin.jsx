import React, { useContext, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
//TODO Instructor name,
const ManageClasessByAdmin = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const dialogRef = useRef(null);
  const [classId, setClassId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //fetching all classes
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/classes`);
    //console.log(res.data);
    return res.data;
  });

  const handleApprove = (id, name) => {
    // console.log(id);
    fetch(`http://localhost:5000/classes/${id}?status=approved`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} is successfully approved`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleDeny = (id, name) => {
    // console.log(id);
    fetch(`http://localhost:5000/classes/${id}?status=denied`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} is successfully denied `,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //feedback submit
  const onSubmit = (data) => {
    const feed = data.feed;
    const myId = { classId };
    if (dialogRef.current) {
      dialogRef.current.close();
    }

    reset();
    const id = myId.classId;
    //console.log(feed, myId.classId);
    fetch(`http://localhost:5000/updatefeedback/${id}?feedback=${feed}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount == 1) {
          toast.success("Feedback updated");
        }
        reset();
      });
  };
  const openModal = (event) => {
    const classId = event.target.getAttribute("data-attribute");
    setClassId(classId);
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <div>
        <h1 className="text-tahiti text-4xl mb-8"> Manage all Classes</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>Fee(Tk)</th>
                <th>Available Seats</th>
                <th>Status</th>
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
                  <td>
                    {aClass.instructorName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {aClass.instructorEmail}
                    </span>
                  </td>
                  <td>{aClass.price}</td>
                  <td>{aClass.seats}</td>
                  <td>{aClass.status}</td>
                  <td>
                    <div className="grid grid-cols-1 gap-2">
                      <span className="space-x-2">
                        <button
                          onClick={() => handleApprove(aClass._id, aClass.name)}
                          disabled={
                            aClass.status === "approved" ||
                            aClass.status === "denied"
                          }
                          className="btn btn-error btn-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeny(aClass._id, aClass.name)}
                          disabled={
                            aClass.status === "approved" ||
                            aClass.status === "denied"
                          }
                          className="btn btn-error btn-xs"
                        >
                          Deny
                        </button>
                      </span>
                      <span>
                        <button
                          data-attribute={aClass._id}
                          className="btn btn-error btn-xs"
                          onClick={openModal}
                        >
                          FeedBack
                        </button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog ref={dialogRef} id="my_modal_2" className="modal">
        <div className="modal-box text-center">
          <form
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
            className="modal-box"
          >
            <input
              {...register("feed", {
                required: true,
                minLength: 6,
              })}
              type="text"
              placeholder="Feedback"
              className="input input-bordered"
            />
            {errors.feed?.type === "required" && (
              <p className="text-tahiti">Feedback is required</p>
            )}
            <input className="btn btn-warning " type="submit"></input>
          </form>
          <span
            className="btn btn-error my-5 btn-xs rounded-full"
            onClick={closeModal}
          >
            Close
          </span>
        </div>
      </dialog>
    </>
  );
};

export default ManageClasessByAdmin;
