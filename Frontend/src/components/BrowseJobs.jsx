import Navbar from "./shared/Navbar";
// import { Avatar, AvatarImage } from "./ui/avatar"

import { useDispatch, useSelector } from "react-redux";
import SingleJob from "./SingleJob";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/customHooks/useGetAllJobs";
import { motion } from "framer-motion";

function BrowseJobs() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-xl my-6 text-center sm:text-left">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return (
              <motion.div
              key={job._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              >

              <SingleJob key={job._id} job={job} />;
              </motion.div>
            ) 
          })}
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;
