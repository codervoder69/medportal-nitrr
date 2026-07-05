import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import NearbyModal from "../../Components/Admin/NearbyModal";
import { toast } from "react-toastify";
import axios from "axios";
import EditHosModal from "../../Components/Admin/EditHosModal";

const NearbyHospitals = ({showLoader,hideLoader}) => {
  const [data,setData]=useState([]);

  const [modal, setModal] = useState(false);
  const [clicked,setClicked]=useState(null);

  const fetchAllHos=async()=>{
    try {
      showLoader();
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/get-all`);
      // console.log(res.data.all);
      setData(res.data.all);
      
    } catch (error) {
      toast.error("Error: Fetching hospitals");
    } finally{
      hideLoader();
    }
  }
  useEffect(()=>{
    fetchAllHos();
  },[])

  const handleDel=async(eltId)=>{
    try {
      showLoader();
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/delete/${eltId}`,{withCredentials:true})
      let arr=data.filter((elt)=>
        elt._id!==eltId
      );
      setData(arr);
      toast.success("Hospital Deleted");

    } catch (error) {
      toast.error("Error:Deleting Hospital")
    } finally{
      hideLoader();
    }
  }
  const handleEdit=(elt)=>{
    setClicked(elt);
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Back link */}
      <Link
        to="/admin/dashboard"
        className="w-fit flex items-center text-base font-medium text-blue-600 hover:underline mb-6"
      >
        <IoMdArrowRoundBack className="mr-2 text-xl" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Nearby Hospitals</h2>
        <button
          onClick={() => setModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition shadow hover:shadow-md"
        >
          + Add Hospital
        </button>
      </div>

      {/* Hospital List */}
      <div className="grid md:grid-cols-2 gap-6">
        {data.map((elt, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <p className="text-xl font-semibold text-blue-600">{elt.name}</p>
                <p className="text-gray-700 text-sm">📞 Contact: {elt.contact}</p>
                <p className="text-sm text-gray-500">📍 Address: {elt.address}</p>
                <p className="text-sm text-gray-500">👤 Added by: {elt.addedBy?.name}</p>
              </div>
              <div className="flex items-center gap-2 text-xl text-gray-500 mt-1">
                <MdEdit
                  onClick={()=>handleEdit(elt)}
                  className="cursor-pointer hover:text-blue-600 transition-transform hover:scale-110"
                  title="Edit"
                />
                <MdDelete
                onClick={()=>handleDel(elt._id)}
                  className="cursor-pointer hover:text-red-500 transition-transform hover:scale-110"
                  title="Delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && <NearbyModal title={"Add Hospital"} fxnOpenClose={setModal} setData={setData} showLoader={showLoader} hideLoader={hideLoader} />}
      {
        clicked && <EditHosModal title={"Edit Hospital"} currElt={clicked} setClicked={setClicked} setData={setData} showLoader={showLoader} hideLoader={hideLoader}/>
      }
    </div>
  );
};

export default NearbyHospitals;
