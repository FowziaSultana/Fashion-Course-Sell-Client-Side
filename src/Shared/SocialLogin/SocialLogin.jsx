import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { data } from "autoprefixer";

const SocialLogin = () => {
  const { googleSignUp, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    //google  sign in func
    googleSignUp()
      .then((res) => {
        const user = res.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
          role: "student",
          photo: user.photoURL,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully logged in.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          });

        // navigate(from, { replace: true });
      })
      .catch((err) => {
        const message = err.message;
        toast.error(message);
        setLoading(false);
        // navigate("/login");
      });
  };
  return (
    <>
      <div className="divider">OR</div>

      <div className="flex flex-col md:flex-row gap-2">
        <button onClick={handleGoogleLogin} className="btn btn-error">
          <FaGoogle className="mr-2" />
          Login with Google
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
