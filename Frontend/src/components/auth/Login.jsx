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
// import { setLoading, setUser } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";

// function Login() {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const { loading } = useSelector((store) => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const eventChangeHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log(input);
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         navigate("/");
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
//         LogIn
//       </h1>
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//         >
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
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               onChange={eventChangeHandler}
//               name="password"
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
//           </div>

//           {loading ? (
//             <Button className="w-full my-4">
//               {" "}
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Login
//             </Button>
//           )}

//           <span className="text-sm ">
//             Dont have an account?{" "}
//             <Link to="/signup" className="text-blue-600">
//               SignUp
//             </Link>
//           </span>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
        Log<span className="text-blue-600">In</span>
      </h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <form onSubmit={submitHandler}>
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
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              onChange={eventChangeHandler}
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <RadioGroup className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={eventChangeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
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
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full flex items-center justify-center bg-blue-600 text-white rounded-md py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2"
            >
              Login
            </Button>
          )}

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
