import axios from "axios"
import { useEffect } from "react"
import { JOB_API_END_POINT } from "@/utils/constantss"
import { setAllJobs } from "@/redux/jobSlice"
import { useDispatch, useSelector } from "react-redux";


function useGetAllJobs() {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector(store=>store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {withCredentials: true})
        if(res.data.success){
          dispatch(setAllJobs(res.data.jobs));
      }
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchAllJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useGetAllJobs
