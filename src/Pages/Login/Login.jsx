import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import useTitle from "../../hooks/useTitle";
import { useForm } from "react-hook-form";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Login = () => {
  useTitle("LOGIN");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignUp, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Successfully logged in!!");
        reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const mess = err.message;
        toast.error(mess);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content w-[300px] flex-col md:w-[500px]">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Login now!</h1>
          <p className="py-4 w-2/3 mx-auto">
            Don't Have an Account?{" "}
            <Link
              state={{ from: location?.state?.from }}
              className="link-info  hover:underline "
              to={"/registration"}
            >
              Register Here
            </Link>
          </p>
        </div>
        <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-tahiti">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered "
              />
              <span onClick={handleTogglePassword} className="btn btn-sm my-3">
                {showPassword ? (
                  <>
                    <AiFillEye></AiFillEye>
                  </>
                ) : (
                  <>
                    <AiFillEyeInvisible></AiFillEyeInvisible>
                  </>
                )}
              </span>

              {errors.password && (
                <span className="text-tahiti">This field is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-error" type="submit" value="Login" />
            </div>
          </form>
        </div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
