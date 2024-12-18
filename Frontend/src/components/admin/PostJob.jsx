import { useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constantss";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

function PostJob() {
    // const companyArray = [];
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading]= useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeSelectHandler = (value) => {
    const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
    setInput({...input, companyId:selectedCompany._id});
};

const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
        setLoading(true);
        const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs");
        }
    } catch (error) {
        toast.error(error.response.data.message);
    } finally{
        setLoading(false);
    }
    
}


  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-indigo-100 p-8 md:p-12 lg:p-16 rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Post a New Job
        </h2>

        <form className="space-y-8" onSubmit = {submitHandler}>
          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="title"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Frontend Developer"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Detailed job description..."
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            ></textarea>
          </div>

          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="requirements"
            >
              Requirements
            </label>
            <textarea
              id="requirements"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Required skills and qualifications..."
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                type="number"
                id="salary"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 50000"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="job_type"
              >
                Job Type
              </label>
              <input
                id="job_type"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              >
                
              </input>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., New York, Remote"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="experience"
              >
                Experience Level
              </label>
              <input
                id="experience"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              >
                
              </input>
            </div>
          </div>

          <div>
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="positions"
            >
              No. of Positions
            </label>
            <input
              type="number"
              id="positions"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., 3"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
            />
          </div>
          {
            companies.length > 0 && (
                <Select onValueChange={changeSelectHandler}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                  {
                    companies.map((company) => {
                        return (
                            <SelectItem key={company?.id } value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                        )
                    })
                }
                    
                  </SelectGroup>
                </SelectContent>
              </Select>

            )
          }

          <div className="pt-4">
            
            {
                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-150 ease-in-out"
              >
                Post Job
              </button>
            }
            {
                companies.length === 0 && <p className="text-red-500 text-xm font-bold text-center my-3">*Please Register a Company first before Posting a Job</p>
            }
          </div>
        </form>
      </div>
    </>
  );
}

export default PostJob;
