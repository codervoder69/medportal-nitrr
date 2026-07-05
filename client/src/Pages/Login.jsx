import { useState } from 'react';
import ForgotPassModal from '../Components/ForgotPassModal';
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLogin,showLoader,hideLoader}) => {
  const navigate=useNavigate();
  const [loginformData, setloginFormData] = useState({ 
        email: '', 
        password: '' 
    });
  const [signupformData, setsignupFormData] = useState({
        name: '',
        email: '',
        password: '',
        rollno: ''
  });


  const handleChangelogin = (e) => {
    const { name, value } = e.target;
    setloginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleChangesignup = (e) => {
    const { name, value } = e.target;
    setsignupFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleSubmitlogin = async (e) => {
  e.preventDefault();

  try {
    showLoader();

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
      loginformData,
      { withCredentials: true }
    );

    if (res.data.success) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      localStorage.setItem('isLogin', true);
      setIsLogin(true);
      toast.success("Logged In Successfully");

      if (res.data.user.role === "Student") {
        navigate(`/student/${res.data.user._id}`);
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      toast.error(res.data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed");
  } finally {
    hideLoader();
  }
};



  const handleSubmitsignup = async(e) => {
    e.preventDefault();

    try {
      showLoader();
      const res=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,signupformData);
      toast.success("SignUp Successful");
      toast.success("Login Now...");
      
    } catch (error) {
      toast.error("SignUp Failed");
    }
    finally{
      hideLoader();
    }



  };

  const [openForgotPass,setOpenForgotPass]=useState(false);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
    <div className="flex flex-col md:flex-row gap-10 bg-blue-100 p-10 rounded-xl shadow-lg w-full max-w-5xl">
        
        {/* Login Form */}
        <form
        onSubmit={handleSubmitlogin}
        className="flex-1 space-y-6 border-r border-blue-200 pr-8"
        >
        <h2 className="text-2xl font-bold text-blue-500 text-center">Login</h2>

        <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
            type="email"
            name="email"
            required
            value={loginformData.email}
            onChange={handleChangelogin}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
            type="password"
            name="password"
            required
            value={loginformData.password}
            onChange={handleChangelogin}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <button
            type="submit"
            className="hover:cursor-pointer w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition"
        >
            Sign In
        </button>
        <div className='underline text-blue-500 hover:cursor-pointer' onClick={()=>setOpenForgotPass(true)}>Forgot password ??</div>
        </form>
        {
          openForgotPass && <ForgotPassModal title={"Forgot Password"} fxnOpenClose={setOpenForgotPass} showLoader={showLoader} hideLoader={hideLoader}/>
        }

        {/* Signup Form */}
        <form
        onSubmit={handleSubmitsignup}
        className="flex-1 space-y-6 pl-8"
        >
        <h2 className="text-2xl font-bold text-blue-500 text-center">Register</h2>

        <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
            type="text"
            name="name"
            required
            value={signupformData.name}
            onChange={handleChangesignup}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
            type="email"
            name="email"
            required
            value={signupformData.email}
            onChange={handleChangesignup}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
            type="password"
            name="password"
            required
            value={signupformData.password}
            onChange={handleChangesignup}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Roll No</label>
            <input
            type="text"
            name="rollno"
            required
            value={signupformData.rollno}
            onChange={handleChangesignup}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <button
            type="submit"
            className="hover:cursor-pointer w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition"
        >
            Sign Up
        </button>
        </form>
    </div>
</div>

  )
};

export default Login;
