import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddPicModal from "../../Components/Admin/Gallery/AddPicModal";
import DeletePicModal from "../../Components/Admin/Gallery/DeletePicModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Gallery = ({showLoader,hideLoader}) => {
  const [photos,setPhotos]=useState([]);

  const fetchAllPhotos=async()=>{
    try {
      showLoader();
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/get-all`);
      setPhotos(res.data.allImg);
      
    } catch (error) {
      toast.error("Error: Retrieving Pics")
    } finally{
      hideLoader();
    }
  }
  useEffect(()=>{
    fetchAllPhotos();
  },[])

  const [addPicModal,setAddPicModal]=useState(false);
  const [clicked,setClicked]=useState(false);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Back link */}
      <Link
        to="/admin/dashboard"
        className="w-fit flex items-center text-lg font-medium text-blue-600 hover:underline mb-6 transition-all"
      >
        <IoMdArrowRoundBack className="mr-2 text-xl" />
        Back to Dashboard
      </Link>

      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Gallery</h2>
        <button onClick={()=>setAddPicModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition shadow-sm hover:shadow-md">
          + Add Pic
        </button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((elt, idx) => (
          <div
            key={idx}
            onClick={()=>setClicked(elt._id)}
            className="overflow-hidden rounded-xl shadow hover:shadow-md transition transform hover:scale-105"
          >
            <img
              src={elt.link}
              alt={`gallery img ${idx + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      <div>
        {
            addPicModal && <AddPicModal title={"Add Pic"} fxnOpenClose={setAddPicModal} setPhotos={setPhotos} showLoader={showLoader} hideLoader={hideLoader} />
            
        }
        {
            clicked && <DeletePicModal title={"Delete Pic"} currId={clicked} setClicked={setClicked} showLoader={showLoader} hideLoader={hideLoader} setPhotos={setPhotos} />
        }
      </div>


    </div>
  );
};

export default Gallery;
