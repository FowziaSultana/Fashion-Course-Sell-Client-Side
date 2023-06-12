import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
      <h1 className="text-5xl text-red-600 mt-10 text-center ">
        Ours Best Instructors :
      </h1>
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          {instructors.map((aIns) => (
            <div class="p-4 md:w-1/3">
              <div class="h-full rounded-xl shadow-cla-violate bg-gradient-to-r from-pink-50 to-red-50 overflow-hidden">
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                  src={aIns.photo}
                  alt="blog"
                />
                <div class="p-6">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY-1
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-600 mb-3">
                    The Catalyzer
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div class="flex items-center flex-wrap ">
                    <button class="bg-gradient-to-r from-orange-300 to-amber-400 hover:scale-105 drop-shadow-md shadow-cla-violate px-4 py-1 rounded-lg">
                      Learn more
                    </button>
                  </div>
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
