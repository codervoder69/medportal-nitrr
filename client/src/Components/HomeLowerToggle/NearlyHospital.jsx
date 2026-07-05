import { useEffect, useState } from "react";
import GenericTable from "../GenericTable";
import axios from "axios";


const columns = [
  { header: "S.no", accessor: "sno" },
  { header: "Name", accessor: "name" },
  { header: "Address", accessor: "address" },
  { header: "Contact", accessor: "contact" },
];
const NearbyHospital=({showLoader,hideLoader})=>{

  const [data,setData]=useState([]);

  const getAllData=async()=>{
    try {
      showLoader();
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/get-all`);
      // console.log(res.data.all);
      let arr=[];
      res.data.all.forEach((elt,idx)=>{
        arr.push({sno:idx+1,name:elt.name,address:elt.address,contact:elt.contact});
      })
      // console.log(arr);
      setData(arr);
      hideLoader();
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllData();
  },[]);

    return (
        <div>
            <GenericTable columns={columns} data={data}/>
        </div>
    )
}
export default NearbyHospital;