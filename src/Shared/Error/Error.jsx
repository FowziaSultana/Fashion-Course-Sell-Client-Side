import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex-col items-center justify-center text-center">
        {/* <img
          className=""
          src="https://cdn.dribbble.com/users/2182116/screenshots/13933572/media/cc32730b1eb3a657a48a6ceacefc72fb.gif"
        ></img> */}
        <img
          className=""
          src="https://cdn.dribbble.com/users/745025/screenshots/6723888/gif_404.gif"
        ></img>

        <button>
          <Link to="/" className=" bg-slate-100  btn btn-error">
            <FaArrowLeft className="inline-block -mt-1 mr-2 " />
            Go Back{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Error;
