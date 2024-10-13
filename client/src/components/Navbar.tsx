import{Link} from "react-router-dom";
import logo from "../assets/logo.png";
import car from "../assets/car.gif";
import carProfile from "../assets/carProfile.png";

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 left-0 z-[999] bg-gray-50 shadow-md overflow-visible">
      <nav
        id="navbar"
        className="p-5 h-[70px] mx-auto flex justify-between items-center relative"
      >
        
        <div className="nav-logo flex w-[20%]">
          <Link
            to="/"
            className="flex items-center text-black font-bold no-underline"
          >
            <div>
              <img src={logo} alt="Logo" className="w-10 h-10" />
            </div>
            <div id="logo-txt" className="text-2xl ml-1.5 tracking-wide">
              Caring
            </div>
          </Link>
        </div>

        <div className="nav-link flex w-[42%]">
          <ul className="w-full flex justify-center">
            <Link
              to="/"
              className="w-full flex justify-center no-underline text-gray-900 border-b-2 border-transparent hover:border-red-700 transition-all duration-600"
            >
              <li className="flex justify-center list-none font-semibold tracking-wider text-xl p-2 whitespace-nowrap transition-all duration-600">
                Home
              </li>
            </Link>
            <Link
              to="/services"
              className="w-full flex justify-center no-underline text-gray-900 border-b-2 border-transparent hover:border-red-700 transition-all duration-600"
            >
              <li className="flex justify-center list-none font-semibold tracking-wider text-xl p-2 whitespace-nowrap transition-all duration-600">
                Services
              </li>
            </Link>
            <Link
              to="/about"
              className="w-full flex justify-center no-underline text-gray-900 border-b-2 border-transparent hover:border-red-700 transition-all duration-600"
            >
              <li className="flex justify-center list-none font-semibold tracking-wider text-xl p-2 whitespace-nowrap transition-all duration-600">
                About
              </li>
            </Link>
            <Link
              to="/contact"
              className="w-full flex justify-center no-underline text-gray-900 border-b-2 border-transparent hover:border-red-700 transition-all duration-600"
            >
              <li className="flex justify-center list-none font-semibold tracking-wider text-xl p-2 whitespace-nowrap transition-all duration-600">
                Contact
              </li>
            </Link>
          </ul>
        </div>

        {/* Profile with Tooltip on Hover */}
        <div className="relative group z-10 shadow rounded-full">
          <div className="nav-right-login w-[60px] h-[60px] flex justify-end items-center cursor-pointer rounded-full overflow-hidden">
            <img
              src={carProfile}
              alt="Car Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tooltip with Signup/Login buttons */}
          <div className="absolute right-0 mt-2 w-[180px] bg-black shadow-md rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
            <a href="/auth">
              <button className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-all duration-300">
                SignUp/Login
              </button>
            </a>
          </div>
        </div>
      </nav>

      <div className="cycle absolute top-[50%] w-[70px] animate-[cycle_15s_linear_infinite]">
        <img src={car} alt="Cycle Animation" className="w-full h-[50px]" />
      </div>
    </header>
  );
};

export default Navbar;
