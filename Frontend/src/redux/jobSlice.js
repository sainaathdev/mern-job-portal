import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        jobSingle: null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:""
    },
    reducers: {
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setJobSingle:(state,action) => {
            state.jobSingle = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
})

export const {setAllJobs, setJobSingle, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;