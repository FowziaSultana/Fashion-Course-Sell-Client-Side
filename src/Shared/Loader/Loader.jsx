import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-screen fixed bg-white z-40 grid grid-cols-1 place-items-center">
      <progress className="progress progress-warning w-56"></progress>
    </div>
  );
};

export default Loader;
