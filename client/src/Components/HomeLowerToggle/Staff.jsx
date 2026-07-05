import { useEffect } from "react";
import GenericTable from "../GenericTable";
import axios from "axios";
import { useState } from "react";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Designation", accessor: "designation" },
  { header: "Email", accessor: "email" },
  { header: "Contact", accessor: "mobileNo" },
];

const Staff=({showLoader,hideLoader})=>{

  const [data,setData]=useState([]);

  const getAllStaff = async () => {
    try {
      showLoader();
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/get-all-staff`);
      // console.log(res.data.staffs);
      setData(res.data.staffs);
      hideLoader();
      
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  useEffect(() => {
    getAllStaff();
  }, []);

    return (
        <div>
            <GenericTable columns={columns} data={data}/>
        </div>
    )
}
export default Staff;