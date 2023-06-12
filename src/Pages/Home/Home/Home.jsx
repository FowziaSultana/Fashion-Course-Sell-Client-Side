import React, { useState } from "react";
import Topinstructors from "../Topinstructors/Topinstructors";
import Content from "../Content/Content";
import Slider from "../Slider/Slider";

const Home = () => {
  const [checkBox, setCheckbox] = useState(false);
  const handlecheck = () => {
    setCheckbox(document.getElementById("myTheme").checked);
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (checkBox) {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
    } else if (!checkBox) {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
    }
  };

  console.log(checkBox);

  return (
    <div className="container mx-auto">
      {/* <p className="bg-red-500 text-black dark:bg-red-800 dark:text-white">
        I am home
      </p>
      <input
        onClick={handlecheck}
        id="myTheme"
        type="checkbox"
        className="toggle"
      /> */}
      <Slider></Slider>
      <Topinstructors></Topinstructors>
      <Content></Content>
    </div>
  );
};

export default Home;
