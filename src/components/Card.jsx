import {MdLocationOn} from "react-icons/md"
import {FaSuitcase} from "react-icons/fa"
import {BsFillCalendarDateFill} from "react-icons/bs"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/JobSlice";




const Card =({job})=>{
    const dispatch =useDispatch()
    const color={
        "Devam Ediyor":"orange",
        Mulakat:"green",
        Reddedildi:"red",
    }
    const handleDelete =()=>{
        if(confirm("Silmek İstediğinize Emin Misiniz?")){
            //api istegi atıp veri abanından işi kaldır
        //basarılı olursa storedan da kaldır
        //basarısız olursa uyarı ver
        axios
        .delete(`http://localhost:4000/jobs/${job.id}`)
        .then(()=>{
            toast.info("silme işlemi başarılı")
            dispatch(deleteJob(job.id))
        })
        .catch(()=>{
            toast.warn("silme işlemi başarısız oldu")
        })

        }
        
        
    }
    return (
        <div className="card">
            <div className="head">
            <div className="left">
                <div className="letter">
                    <span>{job.company[0]}</span>
                </div>
                <div className="info">
                    <p>{job.position}</p>
                    <p>{job.company}</p>
                </div>
                
            </div>
            <div className="right">
            <button  onClick={handleDelete}
            className="delete-button">
  <svg class="delete-svgIcon" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
</button>
                </div>
            </div>
            <div className="body">
            <div className="field">
                    <MdLocationOn />
                    <p>{job.location}</p>
                </div>
                <div className="field">
                    <FaSuitcase />
                    <p>{job.type}</p>
                </div>
                <div className="field">
                    <BsFillCalendarDateFill />
                    <p>{job.date}</p>
                </div>
                <div className="field">
                    
                    <p style={{background:color[job.status]}}>{job.status}</p>
                </div>
            </div>
        </div>
    )
}
export default Card