import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Apparel construction
// Fashion design
// Footwear and accessories design
// Jewelry design
// Textile and surface design
// Visual arts
// Art history
// Graphic de

const AddClasses = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [axiosSecure] = useAxiosSecure();

  const onSubmit = (data) => {
    const { name, photo, price, seats } = data;
    const newItem = {
      name,
      photo,
      price: parseFloat(price),
      seats: parseInt(seats),
      status: "pending",
      enrolledStudents: parseInt(0),
      feedback: "",
      instructorEmail: user.email,
      instructorName: user.displayName,
    };
    // console.log(newItem);
    axiosSecure.post("/classes", newItem).then((data) => {
      // console.log("after adding new class", data.data);
      if (data.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className=" container mx-auto w-3/4 bg-[#F4F3F0] px-3 md:px-24 py-5 md:py-14 mt-11 rounded-lg">
      <h1 className="text-center text-tahiti text-xl lg:text-5xl">
        Add Classes
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ---------------------NAME Price------------------------------------ */}
        <div
          className="grid md:grid-cols-2  gap-5 my-3
        "
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-tahiti font-semibold text-xl">
                Name
              </span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter Name"
              className="input input-bordered "
            />
            {errors.name && (
              <span className="text-tahiti">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-tahiti font-semibold text-xl">
                Price(Tk)
              </span>
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Enter Price"
              className="input input-bordered "
            />
            {errors.price && (
              <span className="text-tahiti">This field is required</span>
            )}
          </div>
        </div>
        {/* ------------------------Available seats and image photo--------------------------------- */}
        <div
          className="grid md:grid-cols-2  gap-5 my-3
        "
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-tahiti font-semibold text-xl">
                Available seats
              </span>
            </label>
            <input
              {...register("seats", { required: true })}
              type="number"
              placeholder="Enter seats"
              className="input input-bordered "
            />
            {errors.seats && (
              <span className="text-tahiti">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-tahiti font-semibold text-xl">
                Photo
              </span>
            </label>
            <input
              {...register("photo", { required: true })}
              type="text"
              placeholder="Enter URL"
              className="input input-bordered "
              name="photo"
            />
            {errors.photo && (
              <span className="text-tahiti">This field is required</span>
            )}
          </div>
        </div>
        {/* --------------------------Instructors name and email------------------------------- */}
        <div
          className="grid md:grid-cols-2  gap-5 my-3
        "
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-tahiti font-semibold text-xl">
                Instructor
              </span>
            </label>
            <input
              readOnly
              className="input input-bordered "
              name="instructor"
              defaultValue={user?.displayName}
            />
          </div>{" "}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-tahiti font-semibold text-xl">
                Email
              </span>
            </label>
            <input
              readOnly
              placeholder="Enter Email"
              className="input input-bordered "
              name="email"
              defaultValue={user?.email}
            />
          </div>
        </div>

        <input
          className="btn btn-block  btn-warning mt-5"
          type="submit"
          value="Add Class"
        />
      </form>
    </div>
  );
};

export default AddClasses;
