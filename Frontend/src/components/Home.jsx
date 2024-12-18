import useGetAllJobs from "@/customHooks/useGetAllJobs"
import JobPortalHero from "./HeroSection"
import LatestJobs from "./JobsOpenings"
import Navbar from "./shared/Navbar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



function Home() {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [navigate, user?.role])
  return (
    <div>
      <Navbar />
      <JobPortalHero />
      <LatestJobs />
      
    </div>
  )
}

export default Home
