import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProviders";

const Registration = () => {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [accept, setAccept] = useState(false);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  useTitle("REGISTRATION");

  const handleReg = (event) => {
    event.preventDefault();
    const displayName = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const photoURL = event.target.file.value;
    const profile = {
      displayName: displayName,
      photoURL: photoURL,
    };

    if (password.length < 6) {
      toast.error("Your password must be at least 6 characters");
      return;
    } else {
      signUp(email, password, profile)
        .then(async (result) => {
          // setSuccess(true);
        })
        .catch((error) => {
          console.log("error from signup", error);
          navigate("/");
        });
      navigate(from, { replace: true });
    }
  };

  const handleChecked = (e) => {
    setAccept(e.target.checked);
    console.log(accept);
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
          <form onSubmit={handleReg} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                required
                name="file"
                type="photoURL"
                className="file-input file-input-bordered file-input-error w-full max-w-xs"
              />
            </div>
            <div className="form-control flex flex-row gap-2 items-center">
              <span>
                <input
                  onClick={handleChecked}
                  type="checkbox"
                  className="checkbox checkbox-error"
                />
              </span>

              <span className="label-text">
                Accept{" "}
                <span className="link-info  underline">
                  Terms and Condition
                </span>
              </span>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={!accept}
                className="btn btn-error"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
