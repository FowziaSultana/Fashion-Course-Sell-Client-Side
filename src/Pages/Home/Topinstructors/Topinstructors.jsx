import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Fade } from "react-awesome-reveal";

const Topinstructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: instructors = [], refetch } = useQuery(
    ["instructors"],
    async () => {
      const res = await axiosSecure.get(`/topinstructors`);
      console.log(res.data);
      return res.data;
    }
  );
  return (
    <section class="text-gray-600 body-font">
      <h1 className="text-5xl text-[#721227] dark:text-white my-10 text-center ">
        Ours Popular Instructors
      </h1>

      <div class="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
        <div class="flex flex-wrap -m-4">
          {instructors.map((aIns, index) => (
            <div class="p-4 md:w-1/3 ">
              <div class="h-full rounded-xl dark:rounded-none dark:rounded-t-lg shadow-cla-violate bg-gradient-to-r from-pink-50 to-red-50 overflow-hidden ">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                  src={aIns.photo}
                  alt="blog"
                />
                <div class="p-6 dark:bg-gray-900 ">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 dark:text-gray-50">
                    RANK -{index + 1}
                  </h2>
                  <h1 class="title-font text-lg font-medium text-[#721227] mb-1 dark:text-gray-50 uppercase">
                    {aIns.name}
                  </h1>
                  <p class="leading-relaxed mb-3">{aIns.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topinstructors;
