import { useSelector } from "react-redux";

function AppliedJobsInfo() {
    const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Applied Jobs</h2>
            {allAppliedJobs.length <= 0 ? (
                <span>You haven&apos;t applied for any jobs yet.</span>
            ) : (
                <ul className="space-y-3">
                    {allAppliedJobs.map((appliedJob) => (
                        <li
                            key={appliedJob._id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                            <span className="font-medium text-lg">
                                {appliedJob.job?.title} at {appliedJob.job?.company?.name}
                            </span>
                            <span
                                className={`${
                                    appliedJob.status === 'rejected'
                                        ? 'bg-red-100 text-red-800'
                                        : appliedJob.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                } text-xm font-medium px-2 py-1 rounded-full`}
                            >
                                {appliedJob.status.charAt(0).toUpperCase() + appliedJob.status.slice(1)}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
  );
}

export default AppliedJobsInfo;
