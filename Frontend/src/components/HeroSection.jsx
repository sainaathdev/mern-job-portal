import { useState, useEffect } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";


const JobPortalHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Discover Your Dream Career
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with top employers and find the perfect job opportunity that matches your skills and aspirations.
          </p>
          <Link to="/jobs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Explore Opportunities
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-16 bg-white rounded-2xl shadow-2xl overflow-hidden relative z-20"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Job Search</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                  Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="keyword"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Job title, skills, or company"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <FaSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
             
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={searchJobHandler}
                >
                  Search Jobs
                </motion.button>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Job Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {["Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer", "FullStack Developer", "Design", "Sales", "Engineering"].map(
                (category, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center justify-between bg-white p-3 rounded-lg hover:bg-indigo-100 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.03 }}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={()=>searchJobHandler(category)}
                  >
                    <span className="text-gray-700">{category}</span>
                    <FaArrowRight className="text-indigo-500" />
                  </motion.a>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Gradient and Image */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-200 to-transparent opacity-50 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
        alt="Professional working on a laptop"
        className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-10 md:opacity-20 z-10"
      />
    </div>
  );
};

export default JobPortalHero;
