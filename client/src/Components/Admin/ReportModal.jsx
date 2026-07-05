import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import SearchBox from "../SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReportModal = ({ title, fxnCloseOpen, roll,myId }) => {
  const [searchData, setSearchData] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]); // medicines selected with required quantity

  const fetchData = async () => {
    if (!searchData.trim()) return setSuggestions([]);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/medicine/get-by-name?name=${searchData}`
      );
      setSuggestions(res.data.med);
    } catch (error) {
      toast.error("Error fetching medicines");
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchData]);

  const handleSelect = (item) => {
    // Avoid duplicates
    if (data.some((med) => med.name === item.name)) return;
    setData((prev) => [...prev, item]);
    setSearchData("");
    setDropDown(false);
    setSuggestions([]);
  };

  const handleQuantityChange = (idx, value) => {
    const updated = [...data];
    updated[idx].required = value;
    setData(updated);
  };

  const handleDelete = (idx) => {
    const updated = [...data];
    updated.splice(idx, 1);
    setData(updated);
  };

  const handleSubmit = async () => {
    if(data.length===0){
      toast.error(`No medicine entered`);
      return;
    }
  for (let med of data) {
    if (!med.required || isNaN(med.required)) {
      toast.error(`Please enter required quantity for "${med.name}"`);
      return;
    }
    if (Number(med.required) <= 0) {
      toast.error(`"${med.name}": required quantity must be greater than 0`);
      return;
    }
    if (Number(med.required) > med.quantity) {
      toast.error(`"${med.name}": required exceeds stock (${med.quantity})`);
      return;
    }
  }

  const reportData = data.map(({_id, name, required }) => ({
    _id,
    name,
    requiredQuantity: required,
  }));

  try {
    const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/history/add`,{roll,student:myId,medicines:reportData},{withCredentials:true})
    toast.success("Report submitted!");
    fxnCloseOpen(false);
    
  } catch (error) {
    toast.error("Error:Submitting report");
  }
};



  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-blue-100/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden h-[90vh] flex flex-col border border-blue-200 ">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 bg-blue-200 text-blue-900 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <IoMdCloseCircleOutline
            onClick={() => fxnCloseOpen(false)}
            className="text-2xl cursor-pointer hover:text-red-500 transition"
          />
        </div>

        {/* Search with Dropdown */}
        <div className="relative m-3">
          <SearchBox
            placeH="Medicine Name"
            value={searchData}
            onChange={setSearchData}
            onFocus={setDropDown}
          />

          {dropDown && suggestions.length > 0 && (
            <div className="absolute w-[calc(100%-2.5rem)] top-full left-5 bg-white border border-gray-300 shadow-md rounded-md z-20 max-h-48 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <p
                  key={idx}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-blue-50 text-blue-900 font-semibold text-sm border-t border-b items-center">
          <div>Medicine Name</div>
          <div>Quantity Left</div>
          <div>Required Qty</div>
          <div>Delete</div>
        </div>

        {/* Selected Medicines */}
        <div className="overflow-y-auto flex-1">
          {data.map((elt, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 px-5 py-3 text-sm items-center border-b">
              <div className="truncate text-gray-700">{elt.name}</div>
              <div className="text-gray-700">{elt.quantity}</div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={elt.required}
                  onChange={(e) => handleQuantityChange(idx, e.target.value)}
                  className="border p-1 w-20 rounded"
                  placeholder="0"
                  required
                />
              </div>
              <button onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-700 flex">
                <MdDelete />
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-200"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
