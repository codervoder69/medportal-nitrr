import { useEffect, useState } from "react";
import SearchBox from "../Components/SearchBox";
import GenericTable from "../Components/GenericTable";
import { toast } from "react-toastify";
import axios from "axios";
import { FaQuran } from "react-icons/fa";

const StockView=({showLoader,hideLoader})=>{
    const [med,setMed]=useState("");

    const columns = [
    { header: "S.no", accessor: "sno" },
    { header: "Name", accessor: "name" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Usage", accessor: "usage" },
    ];


    const [data,setData]=useState([]);

    const fetchData=async()=>{
        try {
            // showLoader();

            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/medicine/get-by-name?name=${med}`);
            let arr=[];
            res.data.med.map((elt,idx)=>{
                arr.push({sno:idx+1,name:elt.name,quantity:elt.quantity,usage:elt.usage})
            })
            setData(arr);

        } catch (error) {
            toast.error("Error");
        }
        finally{
            // hideLoader();
        }
    }
    useEffect(()=>{
        fetchData();
    },[med])
    return (
        <div>
            <div className="ml-20 mt-10">
                <SearchBox placeH="Search Medicine" value={med} onChange={setMed} />
            </div>
            
            <div className="mx-20 my-10 border-2 border-blue-300 rounded-xl p-4 shadow-md h-[45vh] overflow-y-scroll">
                <GenericTable columns={columns} data={data}/>
            </div>
        </div>
    )
}
export default StockView;