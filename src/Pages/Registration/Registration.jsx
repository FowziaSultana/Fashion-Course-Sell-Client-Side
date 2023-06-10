import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const watchPassword = watch("password", "");
  const navigate = useNavigate();
  const { signUp, updateUserProfile, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  useTitle("REGISTRATION");

  const onSubmit = (data) => {
    signUp(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
              role: "student",
              photo: data.photoURL,
            };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        reset();
        setLoading(false);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:w-[500px]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Register now!</h1>
          <p className="py-4 w-2/3 mx-auto">
            Already have an account ?{" "}
            <Link to={"/login"} className="link-info  hover:underline ">
              Login Here!
            </Link>
          </p>
        </div>
        <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-tahiti">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="email"
                className="input input-bordered"
              />

              {errors.email && (
                <span className="text-tahiti">{errors.email.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-tahiti">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-tahiti">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-tahiti">
                  Password must be less than 20 characters
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>

              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watchPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-tahiti">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("photoURL", { required: true })}
                type="photoURL"
                className="file-input file-input-bordered w-full "
              />
              {errors.photoURL && (
                <span className="text-tahiti">Photo is required</span>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-error">
                Register
              </button>
            </div>
          </form>
        </div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Registration;
