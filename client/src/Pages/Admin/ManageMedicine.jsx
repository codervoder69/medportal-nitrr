import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import AddMedicineModal from "../../Components/Admin/AddMedicineModal";
import { toast } from "react-toastify";
import axios from "axios";
import EditMedicineModal from "../../Components/Admin/EditMedicineModal";

const ManageMedicines = ({showLoader,hideLoader}) => {
  const headData = ["S.no", "Medicine Name", "Added by", "Quantity", "Edit", "Delete"];

  const [tableData,setTableData]=useState([]);

  const [medSearch,setMedSearch]=useState("");
  const [showModal, setShowModal]=useState(false);
  const [clicked,setClicked]=useState(null);


  const fetchMed=async()=>{
    try {
      showLoader();
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/medicine/get-by-name?name=${medSearch}`);
      // console.log(res.data.med);
      setTableData(res.data.med)
      
    } catch (error){
      toast.error("Error: fetching Med");
      
    } finally{
      hideLoader();
    }
  }
  useEffect(()=>{
    fetchMed();
  },[medSearch])

  const handleDel=async(eltId)=>{
    try {
      showLoader();
      const res=await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/medicine/delete/${eltId}`,{withCredentials:true})
      // entry remove from ui
      const arr = tableData.filter((elt) => elt._id !== eltId);

      setTableData(arr);
      toast.success("Med Deleted Successfully");
    } catch (error) {
      toast.error("Error:deleting")
      
    } finally{
      hideLoader();
    }
  }
  
  const handleEdit=(elt)=>{
    setClicked(elt);

  }

  return (
    <div className="p-10">
      {/* Back Link */}
      <Link to="/admin/dashboard" className="w-fit flex items-center text-lg font-semibold text-blue-600 hover:underline">
        <IoMdArrowRoundBack className="mr-2" />
        Back to Dashboard
      </Link>

      {/* Header Section */}
      <div className="flex justify-between items-center mt-6">
        <SearchBox placeH={"Search Medicine"} value={medSearch} onChange={setMedSearch}/>
        <button onClick={()=>setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
          Add Medicine
        </button>
      </div>

      {/* Table */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 bg-gray-100 text-gray-800 font-semibold p-4 text-center">
          {headData.map((head, idx) => (
            <div key={idx}>{head}</div>
          ))}
        </div>

        {/* Table Rows */}
        {tableData.map((elt, idx) => (
          <div key={idx} className="grid grid-cols-6 items-center border-t p-4 text-center hover:bg-gray-50">
            <div>{idx + 1}</div>
            <div>{elt.name}</div>
            <div>{elt.addedBy?.name}</div>
            <div>{elt.quantity}</div>
            <button className="text-blue-500 hover:text-blue-700">
              <MdModeEdit onClick={()=>handleEdit(elt)} className="inline text-xl" />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <MdDelete onClick={()=>handleDel(elt._id)} className="inline text-xl" />
            </button>
          </div>
        ))}
      </div>

      {/* Add modal */}
      {
        showModal && <AddMedicineModal title={"Add Medicine"} fxnOpenClose={setShowModal} showLoader={showLoader} hideLoader={hideLoader} setTableData={setTableData}  />
      }
      {
        clicked && <EditMedicineModal title={"Edit Medicine"} showLoader={showLoader} hideLoader={hideLoader} setTableData={setTableData} currElt={clicked} setClicked={setClicked}/>
      }
    </div>
  );
};

export default ManageMedicines;
