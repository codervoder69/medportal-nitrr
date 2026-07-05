import { useEffect, useState } from "react"
import axios from 'axios'

const Gallery=({showLoader,hideLoader})=>{
    const [imgData,setImgData]=useState([]);
    const fetchAllData=async()=>{
        try {
            showLoader();
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/get-all`);
            // console.log(res.data.allImg);
            setImgData(res.data.allImg);
            hideLoader();
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchAllData()
    },[]);
    
    return (

        

        <div className="flex flex-wrap -mx-2">
            {
                imgData.map((elt, idx) => (
                <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                <img
                    src={elt.link}
                    alt={"img"+idx}
                    className="w-full h-48 object-cover rounded-xl shadow-sm transition-transform duration-300 hover:scale-105"
                />
                </div>
            ))}
            {
                !imgData.length && <p className="p-1 m-1">No data found</p>
            }
        </div>

    )
}
export default Gallery;