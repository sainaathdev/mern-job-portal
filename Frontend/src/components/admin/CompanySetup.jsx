import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constantss";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/customHooks/useGetCompanyById";

function CompanySetup() {
  ;
  const params = useParams();
  useGetCompanyById(params.id)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const {singleCompany} = useSelector(store=>store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
        formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
    }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      setInput({
          name: singleCompany.name || "",
          description: singleCompany.description || "",
          website: singleCompany.website || "",
          location: singleCompany.location || "",
          file: singleCompany.file || null
      })
  },[singleCompany]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg space-y-8 transform transition-all hover:shadow-2xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Company Setup</h1>
            <p className="text-gray-600 mt-2">
              Fill out the details to set up your company profile
            </p>
          </div>

          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="company-name"
              >
                Company Name
              </label>
              <input
                id="company-name"
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter company description"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent h-32 resize-none"
              ></textarea>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="website"
              >
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://company.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter location"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="logo"
              >
                Company Logo
              </label>
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                className="text-gray-600 text-sm underline hover:text-gray-800 transition-all"
                onClick={() => navigate("/admin/companies")}
              >
                Back
              </button>
              {
                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <button
                type="submit"
                className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition-all"
              >
                Save Company
              </button>
              }
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CompanySetup;
