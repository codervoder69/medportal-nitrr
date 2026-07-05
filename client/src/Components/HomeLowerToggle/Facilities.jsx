import axios from "axios";
import { useEffect, useState } from "react";

const Facilities=({showLoader,hideLoader})=>{
    const [facility,setFac]=useState([]);

    const provideFac=async()=>{
        try {
            showLoader();
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/facility/get-all-fac`);
            // console.log(res.data.allFac);
            setFac(res.data.allFac);
            hideLoader();
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        provideFac();
    },[])

    return (

        
        <div className="flex flex-col gap-3">
            {
                facility.map((elt,idx)=>(
                    <div key={idx} className="flex flex-col  gap-0.5">
                        <p className="text-blue-400 font-semibold">{elt.title} : </p>
                        <p className="text-blue-800">{elt.description}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default Facilities;