import { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import ViewRecordModal from "../../Components/Student/ViewRecordModal";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";

const StuDashboard = ({ showLoader, hideLoader }) => {
  const roll = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).roll
    : null;
  const name = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).name
    : null;
  const email = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).email
    : null;

  const [viewModal, setViewModal] = useState(null);
  const [data, setData] = useState([]);

  const fetchAll = async () => {
    try {
      showLoader();
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/history/get-by-roll?roll=${roll}`,
        { withCredentials: true }
      );
      setData(res.data.details);
    } catch (error) {
      toast.error("Error: fetching data");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700">
            Welcome back, {name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Your health records are just a click away — feel empowered to stay on top of your wellness.
          </p>
        </div>

        {/* Student Info */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Profile Summary</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-gray-700 text-base">
            <div>
              <p className="font-medium text-gray-500">Name</p>
              <p>{name}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Email</p>
              <p>{email}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Roll No</p>
              <p>{roll}</p>
            </div>
          </div>
        </div>

        {/* Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">🗂 Your Health Records</h2>
          {data.length === 0 ? (
            <div className="bg-white shadow-sm rounded-xl p-6 text-center text-gray-500 border border-dashed">
              <p>No health records found yet. Once you visit the clinic, your reports will appear here.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {data.map((elt, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="text-gray-900 font-medium text-lg">
                      {format(new Date(elt.createdAt), "dd MMM yyyy")}
                    </p>
                  </div>
                  <button
                    onClick={() => setViewModal(elt)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="View Record"
                  >
                    <IoEyeSharp size={26} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {viewModal && (
          <ViewRecordModal
            title="Health Record"
            currElt={viewModal}
            fxnOpenClose={setViewModal}
          />
        )}
      </div>
    </div>
  );
};

export default StuDashboard;
