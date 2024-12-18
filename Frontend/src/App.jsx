
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import JobsSection from './components/Jobs'
import BrowseJobs from './components/BrowseJobs'
import Profile from './components/Profile'
import JobDetails from './components/JobDetails'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <JobsSection />
  },
  {
    path: "/details/:id",
    element: <JobDetails />
  },
  {
    path: "/browse",
    element: <BrowseJobs />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin 

  {
    path: "/admin/companies",
    element:<ProtectedRoute><Companies /></ProtectedRoute> 
  },
  {
    path: "/admin/companies/create",
    element:<ProtectedRoute><CreateCompany /></ProtectedRoute> 
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
])


function App() {
  

  return (
    <div>
    <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
