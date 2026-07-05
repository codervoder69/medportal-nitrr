import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Modal = ({ title, fxnCloseOpen, showLoader, hideLoader }) => {
  const isStaff = title === "Manage Staff";

  const [dataList, setDataList] = useState([]);
  const [clickedStaff, setClickedStaff] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();
        const url = isStaff
          ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/get-all-staff`
          : `${import.meta.env.VITE_API_BASE_URL}/api/notification/get-all`;
        const res = await axios.get(url);
        // console.log(res.data.allEvent)
        setDataList(isStaff ? res.data.staffs : res.data.allEvent);
      } catch (error) {
        toast.error(`Error: Fetching ${isStaff ? "Staff" : "Facilities"}`);
      } finally {
        hideLoader();
      }
    };

    fetchData();
  }, []);

  const fieldConfigs = isStaff
    ? [
        { name: "name", placeholder: "Staff Name" },
        { name: "email", placeholder: "Email" },
        { name: "password", placeholder: "Password" },
        { name: "mobileNo", placeholder: "Mobile No." },
        { name: "designation", placeholder: "Designation" },
      ]
    : [{ name: "title", placeholder: "Title" }];

  const [formData, setFormData] = useState(
    fieldConfigs.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (clickedStaff) {
      try {
        showLoader();
        const res = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/update-staff/${clickedStaff._id}`,
          formData,
          { withCredentials: true }
        );

        const updatedStaff = res.data.data;

        // Update the staff in the UI list
        setDataList((prev) =>
          prev.map((item) =>
            item._id === clickedStaff._id ? updatedStaff : item
          )
        );

        toast.success("Staff Updated");

        // Reset form and exit edit mode
        setClickedStaff(null);
        setFormData(
          fieldConfigs.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
          }, {})
        );
      } catch (error) {
        toast.error("Error: Updating Staff");
      } finally {
        hideLoader();
      }
      return;
    }


    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      showLoader();
      const url = isStaff
        ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/add-staff`
        : `${import.meta.env.VITE_API_BASE_URL}/api/notification/add`;
      let res=await axios.post(url, formData, { withCredentials: true });
      res=isStaff?(res.data.newStaff):(res.data.newEvent)
      // console.log(res);
      toast.success(`${isStaff ? "Staff" : "Event"} Added Successfully`);
      if (isStaff) {
        toast.success("Credentials sent to Staff");
      }
      setDataList((prev) => [...prev, res]);
      setFormData(
        fieldConfigs.reduce((acc, field) => {
          acc[field.name] = "";
          return acc;
        }, {})
      );
    } catch (error) {
      toast.error(`Error: Adding ${isStaff ? "Staff" : "Event"}`);
    } finally {
      hideLoader();
    }
  };
  const handleEdit = async (item) => {
    try {
      showLoader();
      setClickedStaff(item);
      setFormData((prev) => ({ ...prev, ...item }));
    } catch (error) {
      toast.error("Error:Edit Staff");
    } finally {
      hideLoader();
    }
  };
  const handleDelete=async(item)=>{
    try {
      showLoader();
      const url = isStaff
        ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/delete-staff/${item?._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/notification/delete/${item?._id}`;
      await axios.delete(
          url,
          { withCredentials: true }
        );
      let newArr = dataList.filter((elt) => elt._id !== item._id);

      setDataList(newArr);

      toast.success(`${isStaff ? "Staff Deleted" : "Event Deleted"}`);
      
    } catch (error) {
      toast.error("Error in deleting")
    } finally{
      hideLoader();
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-blue-100/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-blue-200">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-blue-200 text-blue-900 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <IoMdCloseCircleOutline
            onClick={() => fxnCloseOpen(false)}
            className="text-2xl cursor-pointer hover:text-red-500 transition"
          />
        </div>

        {/* Form */}
        {/* Form */}
        <form
          onSubmit={handleAdd}
          className="flex flex-wrap gap-4 p-4 overflow-y-auto"
        >
          {fieldConfigs
            .filter((field) => !(clickedStaff && field.name === "password"))
            .map((field, idx) => (
              <input
                key={idx}
                name={field.name}
                type="text"
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                disabled={clickedStaff && field.name === "email"}
                className="flex-1 min-w-[45%] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition font-medium"
          >
            {clickedStaff ? "Update" : "Add"}
          </button>
        </form>

        {/* List */}
        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
          {dataList.map((item, idx) => (
            <div
              key={idx}
              className="bg-blue-100 p-3 rounded-lg shadow text-blue-900 flex justify-between items-center"
            >
              <div className="font-medium line-clamp-2">
                {isStaff ? <p>{item.name}</p> : <p>{item.title}</p>}
              </div>
              <div className="flex gap-3 text-xl">
                {isStaff && (
                  <MdModeEditOutline
                    onClick={() => handleEdit(item)}
                    className="cursor-pointer hover:text-blue-600 transition"
                  />
                )}
                <MdDelete
                  onClick={() => handleDelete(item)}
                  className="cursor-pointer hover:text-red-500 transition"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
