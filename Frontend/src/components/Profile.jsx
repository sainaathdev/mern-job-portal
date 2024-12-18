import { useState } from "react";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import { Badge } from "./ui/badge";
import useGetAppliedJobs from "@/customHooks/useGetAppliedJobs";
import AppliedJobsInfo from "./AppliedJobsInfo";

const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-sans">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                <div className="text-center relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/1177/1177568.png"
                    alt="Profile picture"
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg transition-transform hover:scale-105"
                  />
                  <h1 className="mt-4 text-2xl font-bold">{user?.fullname}</h1>
                  <p className="mt-2 text-sm">software</p>
                  {/* Edit button */}
                  <button
                    onClick={() => setOpen(true)}
                    className="absolute top-2 right-2 bg-white text-blue-600 px-2 py-1 rounded-full shadow hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-6">
                  <p className="flex items-center">
                    <span className="mr-2">📞</span>
                    {user?.phoneNumber}
                  </p>
                  <p className="flex items-center mt-2">
                    <span className="mr-2">📧</span> {user?.email}
                  </p>
                </div>
                <div className="mt-6">
                  {isResume ? (
                    <a
                      href={user?.profile?.resume}
                      target="_blank"
                      className="block text-center bg-white text-blue-600 font-semibold py-2 px-5 rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      {user?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="block text-center text-gray-500">NA</span>
                  )}
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    About Me
                  </h2>
                  <p className="text-gray-600">{user?.profile?.bio}</p>
                </div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user?.profile?.skills && user.profile.skills.length > 0 ? (
                      user.profile.skills.map((item, index) => (
                        <Badge
                          key={index}
                          className="text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <span>NA</span>
                    )}
                  </div>
                </div>
                    <AppliedJobsInfo />
               
              </div>
            </div>
          </div>
        </div>
        {/* UpdateProfile modal component */}
        <UpdateProfile open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Profile;
