import nitLogo from "../assets/logo2.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
const Header = ({ isLogin, setIsLogin, showLoader, hideLoader }) => {
  const navigate = useNavigate();
  const navData = [
    {
      heading: "Home",
      link: "/",
      islink: true,
    },
    {
      heading: "Login",
      link: "/login",
      islink: true,
    },
    {
      heading: "Stock View",
      link: "/stock-view",
      islink: true,
    },
    {
      heading: "NewEvents",
      link: "",
      islink: false,
    },
    {
      heading: "Helpline",
      link: "",
      islink: false,
    },
  ];

  const location = useLocation();

  const matchRoute = (route) => {
    return route === location.pathname;
  };

  const handleLogOut = async () => {
    try {
      showLoader();
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      toast.success("Logged Out");

      localStorage.clear();
      setIsLogin(false);

      navigate("/");
    } catch (error) {
      toast.error("Logout Failed");
    } finally {
      hideLoader();
    }
  };
  const [event, setEvent] = useState([]);
  const fetchAllEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/notification/get-all`
      );
      // console.log(res.data.allEvent);
      setEvent(res.data.allEvent);
    } catch (error) {
      toast.error("Error:Fetching Events");
    }
  };
  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="w-full flex flex-col mx-auto items-center">
      {/* college logo and name with app logo */}

      <div className="w-full flex flex-row justify-between px-3 py-2">
        <div className="flex flex-row gap-3 mx-3">
          <img src={nitLogo} alt="College Logo" className=" h-20 w-20 p-1" />
          <div className="flex flex-col justify-center leading-tight items-start">
            <div className="text-sm md:text-base font-semibold text-blue-400 ">
              राष्ट्रीय प्रौद्योगिकी संस्थान, रायपुर
            </div>
            <div className="font-bold text-blue-400 text-lg">
              National Institute of Technology, Raipur
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 m-2.5 p-1.5">
          <Link
            to="https://www.instagram.com/nit_raipur/?hl=en"
            className="text-pink-500 text-2xl"
          >
            <FaInstagramSquare />
          </Link>
          <Link
            to="https://in.linkedin.com/school/national-institute-of-technology-raipur/"
            className="text-blue-700 text-2xl"
          >
            <FaLinkedin />
          </Link>
          <Link
            to="https://x.com/NITRR?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            className="text-black text-2xl"
          >
            <FaSquareXTwitter />
          </Link>
          <Link
            to="https://www.facebook.com/nitrr.raipur/"
            className="text-blue-600 text-2xl"
          >
            <FaFacebook />
          </Link>
        </div>
      </div>

      {/* navbar */}

      <div className=" bg-blue-400 w-full flex flex-row justify-between gap-2 px-30 mt-4">
        {navData.map((ele, idx) => {
          return (
            <div
              key={idx}
              className="m-2 text-white font-semibold rounded-full hover:bg-blue-500 py-1 px-2"
            >
              {ele.islink ? (
                idx == 1 && isLogin ? (
                  <div onClick={handleLogOut} className="hover:cursor-pointer">
                    <div>{"Logout"}</div>
                  </div>
                ) : (
                  <Link
                    to={ele.link}
                    className={`${
                      matchRoute(ele.link) ? "text-green-900" : ""
                    }`}
                  >
                    <div>{ele.heading}</div>
                  </Link>
                )
              ) : (
                <div className="relative inline-block group">
                  <div className="flex flex-row gap-1">
                    {ele.heading}
                    <IoIosArrowDropdownCircle className="my-auto" />
                  </div>

                  <div className="absolute left-[-3.1rem] mt-2 w-60 bg-white shadow-lg rounded-md p-3 hidden group-hover:block z-50">

                    {idx == 3 && 
                      <ul className="list-disc list-inside text-sm text-gray-800">
                        {
                            event.map((elt, idx2) => (
                                <li key={idx2}>{elt.title}</li>
                            ))
                        }
                      </ul>
                    }

                    {idx == 4 && 
                      <ul className="list-disc list-inside text-sm text-gray-800">
                        <li>EMERGENCY NUMBER - 9589489844 (AMBULANCE)</li>
                        <li>
                          EMERGENCY CONTACT NUMBER – 8109136657 (DISPENSARY)
                        </li>
                        <li>Supporting Staff Mobile No.9993006540</li>
                      </ul>
                    }

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
