import React, { useState } from "react";
import Topinstructors from "../Topinstructors/Topinstructors";
import Content from "../Content/Content";
import Slider from "../Slider/Slider";
import Topclasses from "../Topclasses/Topclasses";

const Home = () => {
  return (
    <div className="container mx-auto ">
      <Slider></Slider>
      <Topclasses></Topclasses>
      <Topinstructors></Topinstructors>
      <Content></Content>
    </div>
  );
};

export default Home;
