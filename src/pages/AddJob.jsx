import axios from "axios"
import { statusOpt, typeOpt } from "../constants"
import { v4 } from "uuid"
import { toast } from "react-toastify"
import { createJob, setError, setJobs, setLoading, deleteJob } from "../redux/slices/JobSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


const AddJob=()=>{
    const state = useSelector((store)=>store.JobSlice)
    
    const dispatch=useDispatch()
    const navigate=useNavigate()
//işverilerini alma
    useEffect(()=>{
        // 1-yüklenmesini güncelle
        dispatch(setLoading())
        // 2-veri gelirse store aktar
        axios
        .get("http://localhost:4000/jobs")
        .then((res)=>dispatch(setJobs(res.data)))
        .catch((err)=>dispatch(setError(err.message)))
        // 3-hata olursa store aktar



    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        //inputtaki veriye erişme
        const formData=new FormData(e.target)
       const newJob= Object.fromEntries(formData.entries())

       //tarh ve id
       newJob.id=v4()
       newJob.date=new Date().toLocaleDateString()
       axios
       .post("http://localhost:4000/jobs", newJob)
       .then(()=>{
        toast.success("Yeni iş eklendi")
        dispatch(createJob(newJob))
        navigate("/")
       })
       .catch(()=>{
        toast.warn("Ekleme işleminde hata oldu")
       })
      
    }
  

 
    return <div className="add-page">
        <section className="add-sec">
            <h2>Yeni iş Ekle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pozisyon</label>
                    <input list="positions" name="position" type="text" required />
                    <datalist id="positions">
                        {state.jobs.map((item)=>(<option value={item.position}/>))}
 
                    </datalist>
                </div>
                <div>
                    <label>Şirket</label>
                    <input list="companies" name="company" type="text" required />
                    <datalist id="companies">
                        {state.jobs.map((item)=>(<option value={item.company}/>))}
 
                    </datalist>
                </div>
                <div>
                    <label>Lokasyon</label>
                    <input list="locations"
                    name="location" type="text" required />
                    <datalist id="locations">
                        {state.jobs.map((item)=>(<option value={item.location}/>))}
 
                    </datalist>

                </div>
                <div>
                    <label>Durum</label>
                    <select name="status" required>
                        <option value="" hidden>Seçiniz</option>
                        {statusOpt.map((i)=><option>{i}</option>)}
                    </select>
                </div>
                <div>
                    <label>Tür</label>
                    <select name="type" required>
                    <option value="" hidden>Seçiniz</option>
                        {typeOpt.map((i)=><option>{i}</option>)}
                    </select>
                </div>
                <div><button>
                Ekle
                </button></div>
            </form>
        </section>
    </div>
}
export default AddJob