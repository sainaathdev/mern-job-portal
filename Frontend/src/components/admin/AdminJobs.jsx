


import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"


import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/customHooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";


function AdminJobs() {
    useGetAllAdminJobs();
    const [input, setInput] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    },[dispatch, input])
  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="max-w-6xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between my-6 space-y-4 sm:space-y-0">
            <Input
                className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150"
                placeholder="Search companies by name"
                 onChange={(e) => setInput(e.target.value)}
            />
            <Button
                className="w-full sm:w-auto px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition ease-in-out duration-150"
                 onClick={() => navigate("/admin/jobs/create")}
            >
                + New Job
            </Button>
        </div>
        <div className="overflow-hidden bg-white rounded-lg shadow-md">
            <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Jobs Directory</h2>
                <p className="mt-1 text-gray-600 text-sm sm:text-base">
                    Filter and manage your Jobs efficiently.
                </p>
            </div>
          <AdminJobsTable />
        </div>
    </div>
</div>


  )
}

export default AdminJobs

