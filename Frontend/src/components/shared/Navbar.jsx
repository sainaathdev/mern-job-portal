// import { Link, useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";

// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constantss";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";



// function Navbar() {
//   const dispatch = useDispatch();
//     const navigate = useNavigate();
//   const { user } = useSelector(store => store.auth);

//   const logoutHandler = async () => {
//     try {
//         const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
//         if (res.data.success) {
//             dispatch(setUser(null));
//             navigate("/");
//             toast.success(res.data.message);
//         }
//     } catch (error) {
//         console.log(error);
//         toast.error(error.response.data.message);
//     }
//   }
//   return (
//     <div>
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           <h1 className="text-2xl font-bold cursor-pointer" >
//             Job<span className="text-teal-400" >Portal</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-12">
//           <ul className="flex font-medium items-center gap-5">
//           {
//             user && user.role === 'recruiter' ? (
//                 <>
//                     <li><Link to="/admin/companies">Companies</Link></li>
//                     <li><Link to="/admin/jobs">Jobs</Link></li>
//                 </>
//             ) : (
//                 <>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/jobs">Jobs</Link></li>
//                     <li><Link to="/browse">Browse</Link></li>
//                 </>
//             )
//         }
//           </ul>

//           {!user ? (
//             <div className="flex items-center gap-2">
//             <Link to="/login"> <Button variant="outline">Login</Button></Link>
//              <Link to="/signup"><Button className="bg-[black] hover:bg-[#5b30a6]">
//              Signup
//            </Button></Link>
              
//             </div>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar className="cursor-pointer">
//                   <AvatarImage
//                     src={user?.profile?.profilePhoto}
//                     alt="@shadcn"
//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div>
//                   <div>
//                     <h4 className="font-medium">{user?.fullname}</h4>
//                     <p>{user?.profile?.bio}</p>
//                   </div>
//                 </div>

//                 {
//                 user && user.role === "student" &&(
//                  <div>
//                   <Button variant="link" className="border-slate-900 mt-2">
//                   <Link to="/profile">View Profile</Link>
//                   </Button>
//                   </div>
//                 )
//                 }
               
//               <div>
//                   <Button className="cursor-pointer" asChild onClick={logoutHandler}>
//                     <h2>Logout</h2>
//                   </Button>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constantss";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#4f46e5] shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 lg:px-10 mx-auto max-w-7xl h-16">
        
        <div onClick={()=> navigate("/")}>
          <h1 className="flex text-3xl font-sans text-zinc-200  font-bold cursor-pointer">
          <BsPersonWorkspace className="mr-2 "size={"35px"} /> Job<span className="text-teal-400">Dive</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-8">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link className="hover:text-teal-400" to="/admin/companies">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-teal-400" to="/admin/jobs">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="hover:text-teal-400 text-white" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-teal-400 text-white" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-teal-400 text-white" to="/browse">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[black] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@user"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-gray-500">{user?.profile?.bio}</p>
                  </div>
                  {user && user.role === "student" && (
                    <Button variant="link" className="mt-2">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  )}
                  <Button
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 py-6">
          <ul className="space-y-4">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link className="block hover:text-teal-400" to="/admin/companies">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link className="block hover:text-teal-400" to="/admin/jobs">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="block hover:text-teal-400" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="block hover:text-teal-400" to="/jobs">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link className="block hover:text-teal-400" to="/browse">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="mt-6 space-y-4">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[black] hover:bg-[#5b30a6] w-full">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {user && user.role === "student" && (
                <Button variant="link" className="w-full">
                  <Link to="/profile">View Profile</Link>
                </Button>
              )}
              <Button
                className="bg-red-500 hover:bg-red-600 w-full text-white"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
