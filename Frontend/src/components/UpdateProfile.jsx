import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constantss';
import { toast } from 'sonner';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

function UpdateProfile({ open, setOpen }) {
    const { user, loading } = useSelector(store => store.auth);
     // Don't render if `open` is false
   

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume,
    });
    const dispatch = useDispatch();
    if (!open) return null;

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file && file.size > 2 * 1024 * 1024) { // Limiting file size to 2MB
          toast.error("File size should not exceed 2MB");
          return;
      }
      if (file && file.type !== "application/pdf") { // Allowing only PDFs
          toast.error("Only PDF files are allowed");
          return;
      }
        setInput({ ...input, file });
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
          dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally {
          dispatch(setLoading(false));
      }
        setOpen(false);
        // console.log(input);
    }
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            ✖
          </button>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Your Job Profile</h1>
          <form id="profileForm" className="space-y-6" onSubmit={submitHandler}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Fullname</label>
                <input
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  aria-describedby="nameError"
                />
                <p id="nameError" className="text-red-500 text-xs hidden">Please enter your name</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  aria-describedby="emailError"
                />
                <p id="emailError" className="text-red-500 text-xs hidden">Please enter a valid email address</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  aria-describedby="bioError"
                />
                <p id="emailError" className="text-red-500 text-xs hidden">Please enter a valid Bio</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="number"
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  aria-describedby="phoneNumberError"
                />
                <p id="emailError" className="text-red-500 text-xs hidden">Please enter a valid Phone Number</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  aria-describedby="skillsError"
                />
                <p id="skillsError" className="text-red-500 text-xs hidden">Please enter a valid Skills</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  id="file"
                  name="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  aria-describedby="fileError"
                />
                <p id="fileError" className="text-red-500 text-xs hidden">Please give Valid File</p>
              </div>
            </div>
            {/* Rest of your form elements */}
            <div className="flex justify-end">
            {
              loading ? (
                <Button>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                </Button>
            ) : (
              <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-105"
            >
              <span className="inline-block mr-2">Save Changes</span>
              <span className="inline-block animate-spin">🔄</span>
            </button> 
            )
            }
              
            </div>
          </form>
        </div>
      </div>
    );
  }
  UpdateProfile.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
  };
  export default UpdateProfile;
  