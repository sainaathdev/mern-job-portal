
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "@/utils/constantss";
import { setJobSingle } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";


const JobDetails = () => {
  const { user } = useSelector((store) => store.auth);
  const { jobSingle } = useSelector((store) => store.job);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const isInitiallyApplied =
    jobSingle?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...jobSingle,
          applications: [...jobSingle.applications, { applicant: user?._id }],
        };
        dispatch(setJobSingle(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setJobSingle(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-400 p-6 flex justify-center items-center">
  <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-transform hover:scale-105">
    <div className="p-6 md:p-8">
      {/* Job Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
      >
        {jobSingle?.title}
      </motion.h1>

      {/* Job Details */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-4 text-gray-700 mb-6"
      >
        <div className="flex items-center">
          <FaBuilding className="text-indigo-600 mr-2" />
          <span>{jobSingle?.companyId?.name || "Company Name"}</span>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-indigo-600 mr-2" />
          <span>{jobSingle?.location || "Location"}</span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-indigo-600 mr-2" />
          <span>${jobSingle?.salary || "0"} LPA</span>
        </div>
      </motion.div>

      {/* Job Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="prose max-w-none text-gray-800"
      >
        <div className="bg-indigo-50 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
            Job Description
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {jobSingle?.description || "No description available."}
          </p>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-1">Job Type</h3>
            <p className="text-sm text-gray-700">
              {jobSingle?.jobType || "Not specified"}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              Total Applications
            </h3>
            <p className="text-sm text-gray-700">
              {jobSingle?.applications?.length || 0}
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg sm:col-span-2">
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              Posted Date
            </h3>
            <p className="text-sm text-gray-700">
              {jobSingle?.createdAt
                ? jobSingle?.createdAt.split("T")[0]
                : "Unknown"}
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-purple-50 p-4 rounded-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
            Requirements
          </h2>
          {jobSingle?.requirements?.length ? (
            <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
              {jobSingle?.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700">
              No specific requirements mentioned.
            </p>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 flex flex-col sm:flex-row justify-between items-center"
      >
        <button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`py-2 px-6 font-medium rounded-lg shadow-md text-white transition-all duration-300 
            ${isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
       
      </motion.div>
    </div>
  </div>
</div>

    </>
  );
};

export default JobDetails;

// JobDetails.propTypes = {
//   job: PropTypes.shape({
    
//     company: PropTypes.shape({
//       companyName: PropTypes.string,
      
//     }),
//   }).isRequired,
// };