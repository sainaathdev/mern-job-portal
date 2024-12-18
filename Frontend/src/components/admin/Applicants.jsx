import { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constantss"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setAllApplicants } from "@/redux/applicationSlice"


function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
        // console.log(res.data);
        
       
          dispatch(setAllApplicants(res.data.job));
       
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllApplicants();
  }, [dispatch, params.id])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <Navbar />
  
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            Applicants {applicants?.applications?.length}
          </span>{" "}
         
        </h1>
  
        <ApplicantsTable />
      </div>
    </div>
  </div>
  
  )
}

export default Applicants
