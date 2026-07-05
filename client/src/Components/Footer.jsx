import appLogo from '/swasthya_nitrr_logo.png';
import nitLogo from '../assets/logo2.png';
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 py-10 px-6 shadow-inner mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

        {/* NIT Info */}
        <div className="space-y-3 text-center md:text-left">
          <img src={nitLogo} alt="NIT Logo" className="w-20 h-20 mx-auto md:mx-0 object-contain" />
          <div className="text-sm leading-relaxed">
            <p className="text-blue-800 font-bold">NIT Raipur</p>
            <p>G.E. Road, Raipur, Chhattisgarh - 492010</p>
            <p>Email: info@nitrr.ac.in</p>
            <p>Phone: 0771-2254200</p>
          </div>
        </div>

        {/* App Info */}
        <div className="space-y-3 text-center">
          <img
            src={appLogo}
            alt="App Logo"
            className="w-16 h-16 rounded-full border-2 border-blue-300 shadow-sm mx-auto"
          />
          <div className="text-sm leading-relaxed">
            <p className="text-blue-800 font-bold">NIT Dispensary Portal</p>
            <p>Email: support@nitdispensary.app</p>
            <p>Phone: +91-987654xxxx</p>
          </div>
        </div>

        {/* Credits */}
        <div className="space-y-2 text-center md:text-right">
          <p className="flex items-center justify-center md:justify-end gap-1 text-gray-700 text-sm">
            Made with <span className="text-red-500">❤️</span> by 
            <a
              href="https://www.linkedin.com/in/harsh-sharma-698833247/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaLinkedin className="inline-block text-lg mx-1" />
            </a>
            <span className="font-semibold text-blue-700">Harsh Sharma</span>
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
