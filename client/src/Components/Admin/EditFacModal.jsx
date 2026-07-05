import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditFacModal = ({ title,currElt, setClicked, showLoader,hideLoader ,setData}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchLatest=async()=>{
      try {
        showLoader();
        setFormData(
        {
            title:currElt.title,
            description:currElt.description
        }
      )
        
      } catch (error) {
        toast.error("Error:Retrieving Fac")
      } finally{
        hideLoader();
      }
    }
    useEffect(()=>{
      fetchLatest();
    },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      showLoader();
      const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/facility/update/${currElt._id}`,formData,{withCredentials:true});
      console.log(res.data.newFac);

        setData(prev =>
  prev.map(item =>
    item._id === res.data.newFac._id ? res.data.newFac : item
  )
);



      setFormData({title:"",description:""});
      toast.success("Facility updated");
      setClicked(null);
      
    } catch (error) {
      toast.error("Error:Adding Facility");
      
    } finally{
      hideLoader();
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 bg-blue-100 text-blue-900 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <IoMdCloseCircleOutline
            onClick={() => setClicked(null)}
            className="text-2xl cursor-pointer hover:text-red-500 transition"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facility Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Ambulance"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Write a short description..."
              className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFacModal;
