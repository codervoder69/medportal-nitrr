import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import StockView from './Pages/StockView'
import Login from './Pages/Login'
import Footer from './Components/Footer'
import AdminDashboard from './Pages/Admin/Dashboard'
import RegisterStudent from './Pages/Admin/RegisterStudent'
import ManageMedicines from './Pages/Admin/ManageMedicine'
import Records from './Pages/Admin/Records'
import Facilities from './Pages/Admin/Facilities'
import NearbyHospitals from './Pages/Admin/NearbyHospitals'
import Gallery from './Pages/Admin/Gallery'
import StuDashboard from './Pages/Student/StuDashboard'
import { useState } from 'react'
import GlobalLoader from './Components/Loader'
import { ToastContainer } from 'react-toastify'
function App() {
  const location=useLocation();
  const [loader,setLoader]=useState(false);
  const showLoader=()=>{
    setLoader(true);
  }
  const hideLoader=()=>{
    setLoader(false);
  }

  const [isLogin,setIsLogin]=useState(localStorage.getItem("isLogin"));

  const role=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).role:null;
  const _id=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo"))._id:null;
  return (
    <div className='flex flex-col max-w-screen overflow-x-hidden text-black'>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} showLoader={showLoader} hideLoader={hideLoader}/>

      <Routes>
        <Route path="/" element={<Home showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/login" element={isLogin?(role==="Student"?<Navigate to={`/student/${_id}`}/>:<Navigate to={`/admin/dashboard`}/>): <Login setIsLogin={setIsLogin} showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/stock-view" element={<StockView showLoader={showLoader} hideLoader={hideLoader}/>} />
        <Route path="/admin/dashboard" element={isLogin && role!=="Student" ? <AdminDashboard showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path="/admin/register-student" element={isLogin && role!=="Student" ?<RegisterStudent showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path="/admin/manage-medicine" element={isLogin && role!=="Student" ?<ManageMedicines showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path="/admin/records" element={isLogin && role!=="Student" ?<Records showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path="/admin/facilities" element={isLogin && role!=="Student" ?<Facilities showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path="/admin/nearby-hospital" element={isLogin && role!=="Student" ?<NearbyHospitals showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path="/admin/gallery" element={isLogin && role!=="Student" ?<Gallery showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
        <Route path='/student/:id' element={isLogin && role==="Student" ?<StuDashboard showLoader={showLoader} hideLoader={hideLoader}/> : <Navigate to={"/"}/>} />
      </Routes>

      {
        location.pathname!="/login"?<Footer/>:""
      }
      {
        loader && <GlobalLoader/>
      }
      <ToastContainer/>
    </div>
  )
}

export default App
