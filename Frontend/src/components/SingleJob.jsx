 import PropTypes from "prop-types"; // Importing PropTypes
 import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from "./ui/avatar";

function SingleJob({job}) {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
}
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
        <h3 className="text-gray-500 mb-2 mt-0">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</h3>
          <Avatar>
          <AvatarImage src={job?.company?.logo} />
          </Avatar>
          <h3 className="text-xl font-bold text-gray-800">{job?.title}</h3>
          <p className="text-gray-600">{job?.company?.name}</p>
        </div>
        <button
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Save for later"
        >
          ❤️
        </button>
      </div>
      <p className="text-gray-600 mb-4">{job?.description}</p>
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        {job?.jobType}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {job?.salary} LPA
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
        {job?.position} positions
        </span>
      </div>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={()=> navigate(`/details/${job._id}`)}>
        View Details 👉
      </button>
    </div>
  );
}

// Adding PropTypes validation for the job prop
SingleJob.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    jobType: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    position: PropTypes.number,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    company: PropTypes.shape({
      name: PropTypes.string,
       logo: PropTypes.string,
    }),
  }).isRequired,
};

export default SingleJob;
