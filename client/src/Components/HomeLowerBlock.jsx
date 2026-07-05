import { useState } from "react"
import { FaHome } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import About from "./HomeLowerToggle/About";
import Facilities from "./HomeLowerToggle/Facilities";
import Gallery from "./HomeLowerToggle/Gallery";
import NearbyHospital from "./HomeLowerToggle/NearlyHospital";
import Staff from "./HomeLowerToggle/Staff";
import { FcManager } from "react-icons/fc";

import { Link } from "react-router-dom";

const HomeLowerBlock=({showLoader,hideLoader})=>{
    const userType=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;

    const headingData=[
        {
            title:"About Us",
            logo:<FaHome className="my-auto"/>,
            comp:"About"
        },
        {
            title:"Staff",
            logo:<MdOutlinePeopleAlt className="my-auto"/>,
            comp:"Staff"
        },
        {
            title:"Facilities",
            logo:<FaHandsHelping className="my-auto"/>,
            comp:"Facilities"
        },
        {
            title:"Nearby Hospitals",
            logo:<FaHospital className="my-auto"/>,
            comp:"NearbyHospitals"
        },
        {
            title:"Gallery",
            logo:<RiGalleryFill className="my-auto"/>,
            comp:"Gallery"
        }
    ];
    const [currIdx,setCurrIdx]=useState(0);

    return (
        <div className="flex m-6">
            <div className="flex flex-col mr-5 text-lg font-semibold p-3 gap-2 w-[20%] text-blue-900">
            {
                headingData.map((elt,idx)=>(
                    <div key={idx} onClick={()=>(setCurrIdx(idx))} className={`hover:bg-blue-200 cursor-pointer flex gap-1.5 border pl-2 bg-blue-300 rounded-full py-1.5 ${headingData[currIdx].title===elt.title ? "bg-blue-500 text-white pointer-events-none":""}`}>
                            {elt.logo}
                            <span>{elt.title}</span>
                    </div>
                ))
            }
            {userType && (
            <Link to={userType.role === "Student" ? `/student/${userType._id}` : "/admin/dashboard"}>
                <div className="hover:bg-blue-200 cursor-pointer flex gap-1.5 border pl-2 bg-blue-300 rounded-full py-1.5">
                <FcManager className="my-auto" />
                <div>Dashboard</div>
                </div>
            </Link>
            )}


            </div>
            <div className="flex flex-col ml-5 p-2 w-[80%] h-[60vh] gap-2">
                <div className="text-lg font-semibold text-center bg-blue-500 text-white rounded-xl py-1">
                    {headingData[currIdx].title}
                </div>
                <div className="border-2 border-blue-300 rounded-xl p-4 shadow-md h-full overflow-y-scroll">
                    {
                        (
                            headingData[currIdx].title === "About Us"?<About/>:
                            headingData[currIdx].title === "Facilities"?<Facilities showLoader={showLoader} hideLoader={hideLoader}/>:
                            headingData[currIdx].title === "Nearby Hospitals"?<NearbyHospital showLoader={showLoader} hideLoader={hideLoader}/>:
                            headingData[currIdx].title === "Gallery"?<Gallery showLoader={showLoader} hideLoader={hideLoader}/>:<Staff showLoader={showLoader} hideLoader={hideLoader}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default HomeLowerBlock;