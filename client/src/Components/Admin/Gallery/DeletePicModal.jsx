import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const DeletePicModal = ({ title,currId, setClicked,showLoader,hideLoader,setPhotos }) => {
  const handleDelete = async() => {
    try {
      showLoader();
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/delete/${currId}`,{withCredentials:true});
      
      setPhotos(prev => prev.filter(photo => photo._id !== currId));

      toast.success("Deleted Successfully");
      setClicked(null);
    } catch (error) {
      toast.error("Error: deleting img")
    } finally{
      hideLoader();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {/* Warning Icon and Message */}
        <div className="flex flex-col items-center justify-center text-center p-4">
          <MdDelete className="text-5xl text-red-500 mb-3" />
          <p className="text-gray-700 text-lg font-medium">Are you sure you want to delete this image?</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setClicked(null)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePicModal;
