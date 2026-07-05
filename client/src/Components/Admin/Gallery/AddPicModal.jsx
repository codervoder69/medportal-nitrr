import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import axios from 'axios';
import { toast } from "react-toastify";

const AddPicModal = ({ title, fxnOpenClose,setPhotos,showLoader,hideLoader }) => {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Swasthya NITRR");

    setLoader(true);

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dbh4mjcij/image/upload`, data);
      const imageUrl = response.data.secure_url;
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit=async()=>{
    try {
      showLoader();
      const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/gallery/add`,{"link":image},{withCredentials:true})
      // console.log(res.data.newImg);

      setPhotos(prev=>[...prev,res.data.newImg]);
      setImage(null);
      toast.success("Image added");

    } catch (error) {
      toast.error("Error:Adding Img");
    } finally{
      hideLoader();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative space-y-5">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={() => fxnOpenClose(false)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Upload Input */}
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
        >
          <MdCloudUpload className="text-5xl text-blue-500 mb-3" />
          <p className="text-gray-600 font-medium">Click to select an image</p>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Loader */}
        {loader && (
          <div className="text-center text-blue-600 font-medium">
            Uploading...
          </div>
        )}

        {/* Uploaded Image Preview */}
        {image && (
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-700 font-medium">Preview:</p>
            <img
              src={image}
              alt="Uploaded"
              className="rounded-lg shadow-md w-full max-h-56 object-cover mx-auto"
            />
          </div>
        )}

        {/* Submit Button */}
        {image && (
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPicModal;
