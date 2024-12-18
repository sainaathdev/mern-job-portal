import axios from "axios";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constantss";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";


function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async (event) => {
     event.preventDefault();
    try {
      // const token = localStorage.getItem("authToken");
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
        headers:{
          'Content-Type':'application/json',
          // Authorization: `Bearer ${token}`,
      },
      withCredentials:true
      })
      if(res?.data?.success){
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
       
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to register company.");
      
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
  <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
    <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
      Register Your Company
    </h2>
    <form action="#" className="space-y-5">
      <div>
        <label className="block text-gray-700 font-medium">Company Name</label>
        <input type="text" placeholder="Enter company name" className="w-full mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>
      
      <div className="flex space-x-4 mt-6">
        <button type="button" className="w-1/2 px-4 py-2 font-semibold text-white bg-gray-500 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200" onClick={() => navigate("/admin/companies")}>
          Cancel
        </button>
        <button type="submit" className="w-1/2 px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200" onClick={registerNewCompany}>
          Continue
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default CreateCompany
