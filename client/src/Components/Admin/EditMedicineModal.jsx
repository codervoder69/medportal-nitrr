import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditMedicineModal = ({ title, showLoader,hideLoader,setTableData, currElt, setClicked }) => {
  // Define form fields
  const fields = [
    { key: "name", label: "Medicine Name" },
    { key: "quantity", label: "Quantity" },
    { key: "usage", label: "Usage" }
  ];

  // Form state (without _id)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    usage: ""
  });

  const fetchLatest=async()=>{
    try {
      showLoader();
      setFormData({
        name:currElt.name,
        quantity:currElt.quantity,
        usage:currElt.usage
      })
      
    } catch (error) {
      toast.error("Error:Retrieving Med")
    } finally{
      hideLoader();
    }
  }
  useEffect(()=>{
    fetchLatest();
  },[])

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      showLoader();
      const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/medicine/update/${currElt._id}`,formData,{withCredentials:true})
    //   console.log(res.data.updatedMed);

      setTableData(prev =>
        prev.map(med =>
            med._id === res.data.updatedMed._id ? res.data.updatedMed : med
        )
      );

      toast.success("Med Updated Successfully");
      setClicked(null);

    } catch (error) {
      toast.error("Error:Adding Med");
    } finally{
      hideLoader();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-transparent flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">{title}</p>
          <IoMdCloseCircleOutline
            onClick={() => setClicked(null)}
            className="text-2xl text-red-500 cursor-pointer hover:text-red-600"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {fields.map(({ key, label }) => (
            <input
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              type="text"
              placeholder={label}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMedicineModal;
