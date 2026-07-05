import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const EditHosModal = ({ title, currElt,setClicked,setData,showLoader,hideLoader }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchAll=()=>{
    setFormData(
        {
            name:currElt.name,
            address:currElt.address,
            contact:currElt.contact
        }
    )
  }
  useEffect(()=>{
    fetchAll();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      showLoader();
      const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/hospital/update/${currElt._id}`,formData,{withCredentials:true});

      console.log(res.data.final);
        
      setData(prev =>
        prev.map(item =>
            item._id === res.data.final._id ? res.data.final : item
        )
      );




      toast.success("Hospital Updated");
      setClicked(null);
      
    } catch (error) {
      toast.error("Error:Adding Hospital");
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. AIIMS"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Address..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="96556xxxxx"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default EditHosModal;
