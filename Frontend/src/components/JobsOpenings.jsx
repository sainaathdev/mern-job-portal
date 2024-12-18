// import { useState } from "react";
// import {  FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
// import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  // const [filteredJobs, setFilteredJobs] = useState(allJobs);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("All");
  // const [sortOrder, setSortOrder] = useState("desc");

  // const handleSearch = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   filterJobs(term, selectedCategory);
  // };

  // const handleCategoryChange = (e) => {
  //   const category = e.target.value;
  //   setSelectedCategory(category);
  //   filterJobs(searchTerm, category);
  // };

  // const filterJobs = (term, category) => {
  //   let filtered = allJobs.filter(
  //     (job) =>
  //       job.title.toLowerCase().includes(term) ||
  //       job.company.toLowerCase().includes(term) ||
  //       job.description.toLowerCase().includes(term)
  //   );

  //   if (category !== "All") {
  //     filtered = filtered.filter((job) => job.category === category);
  //   }

  //   setFilteredJobs(filtered);
  // };

  // const toggleSortOrder = () => {
  //   const newOrder = sortOrder === "desc" ? "asc" : "desc";
  //   setSortOrder(newOrder);
  //   sortJobs(newOrder);
  // };

  // const sortJobs = (order) => {
  //   const sorted = [...filteredJobs].sort((a, b) => {
  //     if (order === "desc") {
  //       return new Date(b.datePosted) - new Date(a.datePosted);
  //     } else {
  //       return new Date(a.datePosted) - new Date(b.datePosted);
  //     }
  //   });
  //   setFilteredJobs(sorted);
  // };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Latest Job Openings
      </h1>
      <div className="max-w-6xl  mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {allJobs.length <= 0 ? (
    <span>No Job Available</span>
  ) : (
    allJobs.slice(0, 6).map((job) => (
      <motion.div
        key={job._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg w-full max-w-xs mx-auto"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                <path d="M10 6h4"/>
                <path d="M10 10h4"/>
                <path d="M10 14h4"/>
                <path d="M10 18h4"/>
              </svg>
              {job?.company?.name}
            </p>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Save for later">❤️</button>
        </div>
        <p className="text-gray-600 mb-4">{job?.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{job?.jobType}</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{job?.salary} LPA</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{job?.position} positions</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={()=> navigate(`/details/${job._id}`)}>
          View Details 👉
        </button>
      </motion.div>
    ))
  )}
</div>


      </div>
    </div>
  );
};

export default LatestJobs;
