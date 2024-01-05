import { createSlice } from "@reduxjs/toolkit"


const initialState={
    mainJobs:[], //budiziyi filtreleme için kullanıcaz ve değiştirmicez.
    jobs:[],
    isLoading:false,
    isError:false,
}
 const JobSlice= createSlice({
    name: "jobs",
    initialState,
    reducers:{
        setLoading: (state, action) =>{
            state.isLoading=true;
        },
        setError:(state, action)=>{
            state.isLoading=false,
            state.isError=action.payload
        },
        setJobs:(state, action)=>{
            state.isLoading=false,
            state.isError= false,
            state.jobs=action.payload
            state.mainJobs=action.payload
    },
         deleteJob: (state, action)=> {
          const i= state.jobs.findIndex((i)=>i.id === action.payload)
          state.jobs.splice(i,1)
    },
        createJob :(state, action)=>{
        state.jobs.push(action.payload)
    },

    filterBySearch: (state, action)=>{
        const query= action.payload.text.toLowerCase()
      const filtered =  state.mainJobs.filter((i)=>
       i[action.payload.field].toLowerCase().includes(query))
      state.jobs = filtered;
    },

    sortJobs:(state, action)=>{
      
       
        switch(action.payload){
            case "A-Z":
                state.jobs.sort((a, b)=>
                 a.company.localeCompare(b.company))
                break;

            case "Z-A":
                state.jobs.sort((a, b)=>
                 b.company.localeCompare(a.company))
                break;

            case "En Eski":
                state.jobs.sort(
                    (a, b)=> new Date(b.date) - new Date(a.date)
                )
                break;
            case "En Yeni":
                state.jobs.sort(
                    (a, b)=> new Date(a.date) - new Date(b.date)
                )
                break;   
            default:
                break;     
        }
    },
    clearFilters: (state, action)=>{
        state.jobs=state.mainJobs
    }
    
}

 })
export  const {setLoading,
     setError,
      setJobs,
       deleteJob,
        createJob,
         filterBySearch,
          sortJobs,
          clearFilters,
        } =JobSlice.actions

export default JobSlice.reducer