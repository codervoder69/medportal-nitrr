import { MdTitle } from "react-icons/md";
import Matrix from "../../Components/Admin/Matrix";
import { PiStudentFill } from "react-icons/pi";
import { GiMedicines } from "react-icons/gi";
import { BsClipboardDataFill } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { FaHospitalAlt } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import Modal from "../../Components/Admin/Modal";
import { useState } from "react";

const AdminDashboard=({showLoader,hideLoader})=>{
    const matrixData=[
        {
            title:"Register Student",
            icon:<PiStudentFill/>,
            link:"/admin/register-student"
        },
        {
            title:"Manage Medicines",
            icon:<GiMedicines/>,
            link:"/admin/manage-medicine"
        },
        {
            title:"Records",
            icon:<BsClipboardDataFill/>,
            link:"/admin/records"
        },
        {
            title:"Facilities",
            icon:<FaHandsHelping/>,
            link:"/admin/facilities"
        },
        {
            title:"Nearby Hospitals",
            icon:<FaHospitalAlt/>,
            link:"/admin/nearby-hospital"
        },
        {
            title:"Gallery",
            icon:<RiGalleryFill/>,
            link:"/admin/gallery"
        }
    ]

    const [manageStaff,setManageStaff]=useState(false);
    const [manageEvent,setManageEvent]=useState(false);

    const openCloseHandler=(val)=>{
        if(val==="Event"){
            setManageEvent(prev=>!prev)
            setManageStaff(false)
        }
        else{
            setManageStaff(prev=>!prev)
            setManageEvent(false)
        }
    }
    const userType=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;
    return (
        <div className="flex flex-col gap-10 m-20">

            {/* head */}
            <div className="flex justify-between items-center w-full mx-auto p-4 border-b border-gray-300 bg-white shadow-sm">
                <p className="text-lg font-semibold text-gray-800">Welcome to Admin Panel</p>
                <div className="flex gap-4">
                    {
                        userType?.role==="Admin" && <button onClick={()=>openCloseHandler("Staff")} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                                Manage Staff
                                            </button>
                    }
                    <button onClick={()=>openCloseHandler("Event")} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                        Manage Events
                    </button>
                </div>
            </div>


            {/* grid here */}
            <Matrix data={matrixData}/>


            {/* modal */}
            {
                manageStaff && <Modal title="Manage Staff" showLoader={showLoader} hideLoader={hideLoader} fxnCloseOpen={setManageStaff}/>
            }
            {
                manageEvent && <Modal title="Manage Events" showLoader={showLoader} hideLoader={hideLoader} fxnCloseOpen={setManageEvent}/>
            }
            
        </div>
    )
}
export default AdminDashboard;