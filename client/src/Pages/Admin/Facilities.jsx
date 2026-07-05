import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import FacilitiesModal from "../../Components/Admin/FacilitiesModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EditFacModal from "../../Components/Admin/EditFacModal";

const Facilities = ({showLoader,hideLoader}) => {
  const [data,setData]=useState([]);
  const fetchFac=async()=>{
    try {
      showLoader();
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/facility/get-all-fac`);
      // console.log(import.meta.env.VITE_API_BASE_URL);
      setData(res.data.allFac);
      
    } catch (error) {
      toast.error("Error:Fetching Facilities");
      
    } finally{
      hideLoader();
    }
  }
  useEffect(()=>{
    fetchFac();
  },[])

  const [modal,setModal]=useState(false);

  const handleDel=async(eltId)=>{
    try {
      showLoader();
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/facility/delete/${eltId}`,{withCredentials:true});
      let arr=data.filter((elt)=>elt._id!==eltId);
      setData(arr);
      toast.success("Facility Deleted");
      
    } catch (error) {
      toast.error("Error: Deleting Facility")
      
    } finally{
      hideLoader();
    }
  }
  const [clicked,setClicked]=useState(null);
  
  const handleEdit=(elt)=>{
    setClicked(elt);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back link */}
      <Link
        to="/admin/dashboard"
        className="w-fit flex items-center text-lg font-medium text-blue-600 hover:underline mb-6 transition-all"
      >
        <IoMdArrowRoundBack className="mr-2 text-xl" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Facilities</h2>
        <button onClick={()=>setModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md">
          + Add Facility
        </button>
      </div>

      {/* Facility List */}
      <div className="grid gap-5">
        {data.map((elt, idx) => (
          <div
            key={idx}
            className="group bg-white border border-gray-200 rounded-xl p-5 transition-all shadow-sm hover:shadow-lg hover:border-blue-300"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <p className="text-lg font-semibold text-blue-500">{elt.title}</p>
                <p className="text-gray-600">{elt.description}</p>
                <p className="text-sm text-gray-500 italic">Added by: {elt.addedBy?.name}</p>
              </div>
              <div className="flex items-center gap-3 text-xl text-gray-500">
                <MdEdit onClick={()=>handleEdit(elt)} className="hover:text-blue-600 cursor-pointer transition-transform hover:scale-110" />
                <MdDelete onClick={()=>handleDel(elt._id)} className="hover:text-red-500 cursor-pointer transition-transform hover:scale-110" />
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div>
        {
            modal && <FacilitiesModal title={"Add Facility"} fxnOpenClose={setModal} showLoader={showLoader} hideLoader={hideLoader} setData={setData} />
        }
        {
            clicked && <EditFacModal title={"Edit Facility"} currElt={clicked} setClicked={setClicked} showLoader={showLoader} hideLoader={hideLoader} setData={setData} />
        }
      </div>

    </div>
  );
};

export default Facilities;
