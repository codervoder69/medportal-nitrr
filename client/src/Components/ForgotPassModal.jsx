import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassModal = ({ title, fxnOpenClose, showLoader,hideLoader }) => {
  const [step,setStep]=useState(1);
  const [input,setInput]=useState({
    email:"",
    otp:"",
    newPassword:""
  })

  const handleOnchange=(event,key)=>{
    setInput({...input,[key]:event.target.value})
  }

  const sendOTP=async()=>{
    if(input.email.trim().length==0){
      toast.error("Enter email Id")
      return;
    }
    try {
      showLoader();
      const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`,{email:input.email})
      toast.success("OTP sent")
      setStep(2);
      
    } catch (error) {
      toast.error("Error:sending OTP")
    } finally{
      hideLoader();
    }
  }
  const checkOTP=async()=>{
    if(input.otp.trim().length==0){
      toast.error("Enter OTP")
      return;
    }
    try {
      showLoader();
      const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`,{email:input.email,otp:input.otp})
      setStep(3);
      toast.success("Reset Password Now")
      
    } catch (error) {
      toast.error("Internal server Issue");
    } finally{
      hideLoader();
    }
  }
  const resetPass=async()=>{
    if(input.newPassword.trim().length==0){
      toast.error("Enter new Password")
      return;
    }
    try {
      showLoader();
      const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`,{email:input.email,newPass:input.newPassword})
      setStep(4);
      toast.success("Password Updated Successfully");
      toast.success("Login Now");
      fxnOpenClose(false);
      
    } catch (error) {
      toast.error("Internal server Issue");
    } finally{
      hideLoader();
    }
  }

  const handleBtn=async()=>{
    if(step==1){
      await sendOTP();
    }
    else if(step==2){
      await checkOTP();
    }
    else{
      await resetPass();
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">{title}</p>

          <button onClick={()=>fxnOpenClose(false)}>
            <IoMdCloseCircleOutline className="text-2xl text-gray-600 hover:text-red-500" />
          </button>

        </div>
        <input
        value={input.email}
        onChange={(e)=>handleOnchange(e,'email')}
        disabled={step!==1}
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {
          (step==2 || step==3) && <input
          value={input.otp}
          onChange={(e)=>handleOnchange(e,'otp')}
          disabled={step>2}
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        }
        {
          step==3 && <input
          value={input.newPassword}
          onChange={(e)=>handleOnchange(e,'newPassword')}
          type="password"
          placeholder="Enter new Password"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        }

        <button onClick={handleBtn} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          {
            step==1 && <p>Send OTP</p>
          }
          {
            step==2 && <p>Validate OTP</p>
          }
          {
            step==3 && <p>Reset Password</p>
          }
        </button>
      </div>
    </div>
  );
};

export default ForgotPassModal;
