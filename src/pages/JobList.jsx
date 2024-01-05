import { useDispatch, useSelector } from "react-redux"
import { setError, setJobs, setLoading } from "../redux/slices/JobSlice"
import { useEffect } from "react"
import axios from "axios"
import Loader from "../components/Loader"
import Card from "../components/Card"
import Filter from  "../components/filter"


const JobList=()=>{
    const dispatch=useDispatch()
    const state =useSelector((store)=>store.JobSlice)
//apidan veri al store a aktar
    const fetchData = ()=>{
        // 1-yüklenmesini güncelle
        dispatch(setLoading())
        // 2-veri gelirse store aktar
        axios.get("http://localhost:4000/jobs")
        .then((res)=>dispatch(setJobs(res.data)))
        .catch((err)=>dispatch(setError(err.message)))
        // 3-hata olursa store aktar


    }
    //bileşen ekrana basıldığında fonk çağır
    useEffect(()=>{

        fetchData()
    },[])

//yüklenme devam ediyorsa Loader bas
//yüklenme bittyse ve hata varsa hata mesajı ve tekrar butonu
//yüklenme bittiyse ve hata yoksa kartları bas

    return (

        <div className="list-page">
            <Filter jobs={state.jobs}/>
            {
                state.isLoading? (<Loader />
                ) : 
                    state.isError? (
                    <div className="error">
                        <p>Üzgünüz verilere erişirken sorun oluştu!
                            <span>{state.isError}</span></p>
                            <button onClick={fetchData} className="button">Tekrar Dene</button>
                            </div>
               ) : (
                 <div className="job-list">
                    {state.jobs.map((job)=>
                        <Card  job={job} key={job.id}/>
                    )}
                 </div>
            )}
        </div>
    )
}

export default JobList