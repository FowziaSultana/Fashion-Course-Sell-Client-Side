import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import logo from "../../../assets/Capture.png";
import { Fade } from "react-awesome-reveal";
const Topclasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/classes`);
    const approvedClasses = res.data.filter(
      (aCls) => aCls.status == "approved"
    );
    const sortedClass = approvedClasses.sort(
      (a, b) => b.enrolledStudents - a.enrolledStudents
    );

    return sortedClass;
  });

  const maxToShow = 6;
  return (
    <div>
      <Fade cascade>
        <h1 className="text-5xl text-[#721227] dark:text-white my-5 text-center ">
          Ours Popular Courses
        </h1>

        <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((aClass, index) =>
              index < maxToShow ? (
                <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="ml-1.5 text-sm leading-tight">
                        <span className="text-black dark:text-white font-bold block">
                          Course By:
                          <span className="uppercase">
                            {" "}
                            {aClass.instructorName}
                          </span>
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 font-normal block">
                          {aClass.instructorEmail}
                        </span>
                      </div>
                    </div>
                    <img className="w-14 h-14 rounded-full" src={logo}></img>
                  </div>
                  <p className="text-[#721227] dark:text-white block text-xl leading-snug mt-3">
                    {aClass.name}
                  </p>
                  <img
                    className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 h-[200px] w-[325px] object-cover"
                    src={aClass.photo}
                  />
                  <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                    Available Seats: {aClass.seats}
                  </p>
                  <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
                  <div className="text-gray-500 dark:text-gray-400 flex mt-3">
                    <div className="flex items-center mr-6">
                      <span className="ml-3">Enrolled students</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <span className="ml-3">{aClass.enrolledStudents}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Topclasses;
