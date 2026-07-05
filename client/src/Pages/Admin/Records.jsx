import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import ViewRecord from "../../Components/Admin/Records/ViewRecord";
import ViewByRoll from "../../Components/Admin/Records/ViewByRoll";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from 'date-fns';

    let monthList=[
        "Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"
    ];
const Records=({showLoader,hideLoader})=>{

    const [searchRoll,setSearchRoll]=useState("");

    const [yearList,setYearList]=useState([]);
    
    const [selectedYear,setSelectedYear]=useState("");
    const [selectedMonth,setSelectedMonth]=useState("");

    useEffect(() => {
        let currYear = new Date().getFullYear();
        let years = [];
        for (let i = currYear; i >= 2020; i--) {
            years.push(i.toString());
        }
        setYearList(years);

        const defaultYear = years[0];
        const defaultMonth = monthList[new Date().getMonth()];

        setSelectedYear(defaultYear);
        setSelectedMonth(defaultMonth);
    }, []);


    const headData=["View", "Student Name", "Roll no", "Date"];

    const [recordData,setRecordData]=useState([]);

    const fetchRecords=async()=>{
        try {
            showLoader();
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history/get-by-month?month=${selectedMonth}&year=${selectedYear}`,{withCredentials:true})

            // console.log(res.data.history);
            setRecordData(res.data.history);

        } catch (error) {
            toast.error("Error:Fetching details");
        } finally{
            hideLoader();
        }
    }
    useEffect(()=>{
        if(!selectedMonth || !selectedYear)
        return;
        fetchRecords();
    },[selectedMonth,selectedYear])


    

    const [view,setView]=useState(null);
    const [viewbyRoll,setViewbyRoll]=useState(null);


    const fxnSubmitHandler=async()=>{
        if(!searchRoll){
            toast.error("Enter a valid Roll No");
            return;
        }
        try {
            showLoader();
            const res=await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history/get-by-roll?roll=${searchRoll}`,{withCredentials:true});
            // console.log(res.data.details);
            setViewbyRoll(res.data.details);
            toast.success("Data fetched");
        } catch (error) {
            toast.error("Error:No data found");
        } finally{
            hideLoader();
        }
    }

    return (
        <div className="p-10 flex flex-col">
            <Link to="/admin/dashboard" className=" w-fit flex items-center text-lg font-semibold text-blue-600 hover:underline mb-4">
                <IoMdArrowRoundBack className="mr-2" />
                <span>Back to Dashboard</span>
            </Link>

            <SearchBox placeH={"Enter Roll no."} value={searchRoll} onChange={setSearchRoll} fxnSubmitHandler={fxnSubmitHandler}/>

            <div className="mt-6">
                <div className="mb-4 font-semibold text-gray-700 text-lg">Year</div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {yearList.map((elt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedYear(elt)}
                            className={`px-4 py-2 rounded-lg border text-sm ${
                                elt === selectedYear
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        >
                            {elt}
                        </button>
                    ))}
                </div>

                <div className="mb-4 font-semibold text-gray-700 text-lg">Month</div>
                <div className="flex flex-wrap gap-2">
                    {monthList.map((elt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedMonth(elt)}
                            className={`px-4 py-2 rounded-lg border text-sm ${
                                elt === selectedMonth
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                            }`}
                        >
                            {elt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-100 rounded-md font-semibold text-gray-700">
                    {headData.map((elt, idx) => (
                        <div key={idx}>
                            {elt}
                        </div>
                    ))}
                </div>

                {recordData.map((elt, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-4 gap-4 items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-all mt-2"
                    >
                        <div className="text-blue-500">
                            <IoEye onClick={()=>setView(elt)}/>
                        </div>
                        <div>{elt?.student?.name}</div>
                        <div>{elt.roll}</div>
                        <div>{format(new Date(elt.createdAt), 'dd-MM-yyyy')}</div>
                    </div>
                ))}
            </div>

            <div>
                {
                    view && <ViewRecord title={view?.student?.name} currElt={view} fxnOpenClose={setView}/>
                }
                {
                    viewbyRoll && <ViewByRoll title={viewbyRoll[0]?.student?.name} currElt={viewbyRoll} fxnOpenClose={setViewbyRoll}/>
                }
            </div>



        </div>
    )
}
export default Records;