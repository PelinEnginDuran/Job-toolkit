import { useEffect, useState } from "react"
import { sortOpt, statusOpt, typeOpt } from "../constants"
import { useDispatch } from "react-redux"
import { clearFilters, filterBySearch, sortJobs } from "../redux/slices/JobSlice"

const Filter =({jobs})=>{
    const [text, setText] = useState("")
    const dispatch =useDispatch()
      //kullanıcı klavyeden elini çektiğinde yani yazmayı bıraktığında arama yapar
    //buna "debounce" denir.
    //her tuş vuruşunda filtreleme yapmak eğer api kullanılıyorsa gereksiz api 
    //isteklerine sebep olur ayrıca uygulamayı da yavaslatır.

    //text in değişimini izleyecek bir use effect hooks u yazdık;
    useEffect(()=>{
       
        //sayac başlatıcaz ve işlemi sayac durdugunda yapıcaz
    
            const timer = setTimeout(()=>{
                dispatch(filterBySearch({field: "position", text}))
  
        }, 500);

        //eger süre bitmeden tekrardan use effect calısırsa oncekş sayacı sıfırla
        return()=>clearTimeout(timer)

    },[text, dispatch])

    return (
        <section className="filter-sec">
            <h2>Filtreleme Formu</h2>
            <form>
                <div>
                    <label>Pozisyon ismine göre ara;</label>
                    <input 
                  
                   onChange={(e)=>setText(e.target.value)} type="text" />
                </div>
                <div>
                    <label>Durum</label>
                    <select 
                        onChange=
                        {(e)=>dispatch(filterBySearch(
                        {field: "status",
                        text: e.target.value,
                    }))}
                    name="status" >
                        <option value="" hidden>Seçiniz</option>
                        {statusOpt.map((i)=>(<option>{i}</option>))}
                    </select>
                </div>
                <div>
                    <label>Tür</label>
                    <select 
                     onChange={(e)=>dispatch(filterBySearch(
                        {field: "type",
                        text: e.target.value,
                    }))}
                    name="type">
                    <option value={""} hidden>Seçiniz</option>
                        {typeOpt.map((i)=>(<option value={i}>{i}</option>))}
                    </select>
                </div>
                <div>
                    <label>Sırala</label>
                    <select
                    onChange={(e)=>
                        dispatch(sortJobs({payload: e.target.value})
                        
                    )}
                     name="type">
                        <option value={""} hidden>Seçiniz</option>
                        {sortOpt.map((i)=>(<option value={i}>{i}</option>))}
                    </select>
                </div>
                <div><button
                 onClick={()=>dispatch(clearFilters())} type="reset">
                Filtreleri Sıfırla
                </button>
                </div>
            </form>

        </section>
    )
}
export default Filter