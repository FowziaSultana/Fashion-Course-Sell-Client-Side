import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("LOGIN");
  const { signIn, googleSignUp, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleLogin = (event) => {
    //email sign in func
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Successfully logged in!!");
        event.target.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const mess = err.message;
        toast.error(mess);
      });
  };

  const handleGoogleLogin = () => {
    //google  sign in func
    googleSignUp()
      .then((res) => {
        const user = res.user;
        toast.success("successfully logged in with gmail");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log("err from google login", err);
        const message = err.message;
        toast.error(message);

        navigate("/login");
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col md:w-[500px]">
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
          <form onSubmit={handleLogin} className="card-body">
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
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-error">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="divider">OR</div>

        <div className="flex flex-col md:flex-row gap-2">
          <button onClick={handleGoogleLogin} className="btn btn-error">
            <FaGoogle className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
