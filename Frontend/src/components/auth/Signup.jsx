// import { Link, useNavigate } from "react-router-dom";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { RadioGroup } from "../ui/radio-group";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constantss";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";

// function Signup() {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });
//   const { loading } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const eventChangeHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const fileChangeHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(input);
//     const formData = new FormData(); //formdata object
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", input.role);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div>
//       <h1 className="mb-4 text-3xl text-center mt-5 font-black leading-4 sm:text-5xl xl:text-6xl">
//         Sign up
//       </h1>
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
//           <div className="my-2">
//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               onChange={eventChangeHandler}
//               name="fullname"
//               placeholder="your name"
//             />
//           </div>
//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={input.email}
//               onChange={eventChangeHandler}
//               name="email"
//               placeholder="something@gmail.com"
//             />
//           </div>
//           <div className="my-2">
//             <Label>Phone Number</Label>
//             <Input
//               type="text"
//               value={input.phoneNumber}
//               onChange={eventChangeHandler}
//               name="phoneNumber"
//               placeholder="8080808080"
//             />
//           </div>
//           <div className="my-2">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               onChange={eventChangeHandler}
//               name="password"
//               placeholder="patel@gmail.com"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-5">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role === "student"}
//                   onChange={eventChangeHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === "recruiter"}
//                   onChange={eventChangeHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>
//             <div className="flex items-center gap-2">
//               <Label>Profile</Label>
//               <Input
//                 accept="image/*"
//                 type="file"
//                 onChange={fileChangeHandler}
//                 className="cursor-pointer"
//               />
//             </div>
//           </div>
//           {loading ? (
//             <Button className="w-full my-4">
//               {" "}
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               SignUp
//             </Button>
//           )}

//           <span className="text-sm ">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600">
//               Login
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constantss";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[navigate, user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl text-center font-extrabold text-gray-900 sm:text-5xl">
        Sign<span className="text-blue-600">Up</span>
      </h1>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              value={input.fullname}
              onChange={eventChangeHandler}
              name="fullname"
              placeholder="Your name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              onChange={eventChangeHandler}
              name="email"
              placeholder="something@gmail.com"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              type="text"
              value={input.phoneNumber}
              onChange={eventChangeHandler}
              name="phoneNumber"
              placeholder="8080808080"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              onChange={eventChangeHandler}
              name="password"
              placeholder="Your password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={eventChangeHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={eventChangeHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </Label>
            <Input
              accept="image/*"
              type="file"
              onChange={fileChangeHandler}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {loading ? (
            <Button className="w-full bg-blue-600 text-white rounded-md py-2 flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2"
            >
              Sign Up
            </Button>
          )}

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
