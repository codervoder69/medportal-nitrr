import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox";
import { useState } from "react";
import ReportModal from "../../Components/Admin/ReportModal";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterStudent = ({showLoader,hideLoader}) => {
  // Fields to show in the form
  const fields = [
    { key: "name", label: "Student Name" },
    { key: "email", label: "Email" },
    { key: "rollNo", label: "Roll no." },
    { key: "mobile", label: "Mobile" },
    { key: "fatherName", label: "Father's Name" },
    { key: "fatherMobile", label: "Father's Mobile No" },
    { key: "address", label: "Address" },
    { key: "healthIssue", label: "Previous Health Issue" },
    { key: "age", label: "Age" },
    { key: "bloodGroup", label: "Blood Group" }
  ];

  // Form state with _id (not shown in UI)
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    rollNo: "",
    mobile: "",
    fatherName: "",
    fatherMobile: "",
    address: "",
    healthIssue: "",
    age: "",
    bloodGroup: ""
  });

  // Search box state
  const [searchStudent, setSearchStudent] = useState("");

  // Modal state
  const [reportModal, setReportModal] = useState(false);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const [update,setUpdate]=useState(false);
  // Form submit
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData._id !== "" && !update) {
      toast.error("Student already exists. Press 'Update' to modify, or clear the form to register new.");
      return;
    }

    if(formData._id===""){

      try {
        showLoader();
        const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register-student-by-staff`,formData,{withCredentials:true});
        // console.log(res.data.newUser);

        setFormData(prev => ({
        ...prev,
        _id: res.data.newUser._id
      }));


        toast.success("Student registered");
        toast.success("Credentials sent to mail");
        
      } catch (error) {
        toast.error("Error:Registering student")
      } finally{
        hideLoader();
      }

      return;
    }


    //update
    if(update){
      try {
        showLoader();
        const res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/auth/update-student/${formData._id}`,formData,{withCredentials:true});
        // console.log(res.data.updatedUser);

        
        toast.success("Student Info Updated");
        toast.success("Create record");
        setUpdate(false);
        
      } catch (error) {
        toast.error("Error:Updating student")
      } finally{
        hideLoader();
      }
      return;
    }

    // record create



  };


  const searchSubmitHandler=async()=>{
    if(searchStudent.trim().length==0){
      setFormData(
        {
          _id: "",
          name: "",
          email: "",
          rollNo: "",
          mobile: "",
          fatherName: "",
          fatherMobile: "",
          address: "",
          healthIssue: "",
          age: "",
          bloodGroup: ""
        }
      )
      toast.error("Enter roll no");
      return;
    }

    try {
      showLoader();
      const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/get-student/${searchStudent}`,{withCredentials:true})
      const data=res.data.data;
        setFormData(
          {
            _id: data._id,
            name: data.name,
            email: data.email,
            rollNo: data.roll,
            mobile: data.mobileNo,
            fatherName: data.fatherName,
            fatherMobile: data.fatherMobile,
            address: data.address,
            healthIssue: data.previous_health,
            age: data.age,
            bloodGroup: data.bloodGroup
          }
        )
        
        toast.success("Info fetched");
      
    } catch (error) {
      setFormData(
        {
          _id: "",
          name: "",
          email: "",
          rollNo: "",
          mobile: "",
          fatherName: "",
          fatherMobile: "",
          address: "",
          healthIssue: "",
          age: "",
          bloodGroup: ""
        }
      )
      toast.error("First time user")
    } finally{
      hideLoader();
    }
  }

  return (
    <div className="my-6 mx-auto max-w-6xl px-4">
      {/* Back Link */}
      <div className="mb-4">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:underline text-lg"
        >
          <IoMdArrowRoundBack className="text-xl" />
          <span>Back to dashboard</span>
        </Link>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <SearchBox
          placeH="Search by Roll no."
          value={searchStudent}
          fxnSubmitHandler={searchSubmitHandler}
          onChange={setSearchStudent}
        />
      </div>

      {/* Student Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Register Student</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {fields.map(({ key, label }) => (
            <input
              key={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              type="text"
              placeholder={label}
              required
              disabled={formData._id!=="" && (key==="rollNo" || key==="email")}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <div className="mt-6">
        {
          formData._id!=="" ? (
              <div className="flex gap-2 mt-2">
              <button
                onClick={()=>setUpdate(true)}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition font-medium"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => setReportModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition font-medium"
              >
                Report
              </button>

              <button
              type="button"
              onClick={() => {
                setFormData({
                  _id: "",
                  name: "",
                  email: "",
                  rollNo: "",
                  mobile: "",
                  fatherName: "",
                  fatherMobile: "",
                  address: "",
                  healthIssue: "",
                  age: "",
                  bloodGroup: ""
                });
                setUpdate(false);
              }}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-6 rounded-md transition font-medium"
            >
              Clear
            </button>

            </div>
          ):(
              <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition font-medium"
            >
              Register
            </button>
            )
        }
          

          
        </div>
      </form>

      {/* Modal */}
        {reportModal && <ReportModal title="Report" fxnCloseOpen={setReportModal} roll={formData.rollNo} myId={formData._id} />}
    </div>
  );
};

export default RegisterStudent;
