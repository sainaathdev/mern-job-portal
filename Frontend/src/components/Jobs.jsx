import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Navbar from "./shared/Navbar";
import SingleJob from "./SingleJob";
import { useEffect, useState } from "react";

const JobsSection = () => {
  // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === "string") {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="lg:w-1/4">
            <FilterCard />
          </aside>

          {/* Job Listing Section */}
          <main className="lg:w-3/4">
            {filterJobs.length <= 0 ? (
              <span className="text-center">Jobs Not Found</span>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <SingleJob key={job._id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default JobsSection;
