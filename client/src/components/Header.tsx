import { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import car from "../assets/car.gif";
import carProfile from "../assets/carProfile.png";
import { Link } from "react-router-dom";
import { setLocalStorage } from "../utils/LocalStorage";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Services", url: "/services" },
  { title: "Contact", url: "/contact" },
];

const iconList = [{ icon: <FaUser /> }];

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleBarsIconClick = () => {
    toggleModal();
  };

  return (
    <>
      {!isMobile ? (
        <nav className="bg-neutral text-primary">
          <div className="flex justify-between mx-auto items-center py-2 px-24 relative">
            <Link to="/">
              <div className="font-bold text-xl flex items-center gap-4">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <span>Caring</span>
              </div>
            </Link>

            <ul className="flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="relative text-lg after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[5px] after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.title}
                </Link>
              ))}
            </ul>

            <div className="flex justify-center items-center gap-1">
              <ul className="flex gap-6 items-center cursor-pointer group relative z-10">
                {/* Profile with Tooltip on Hover */}

                <div className="w-[60px] h-[60px] flex justify-end items-center cursor-pointer rounded-full overflow-hidden">
                  <img
                    src={carProfile}
                    alt="Car Profile"
                    className="object-cover"
                  />
                </div>

                {/* Tooltip with Signup/Login buttons */}
                <div onClick={() => setLocalStorage("regsiterAsSeller", false)} className="absolute top-12 right-[-50px] mt-1 w-[180px] bg-black shadow-md rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                  <Link to="/registartion">
                    <button className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-all duration-300">
                      SignUp/Login
                    </button>
                  </Link>
                </div>
              </ul>
              <div onClick={() => setLocalStorage("regsiterAsSeller", true)}>
                <Link to="/registartion">
                  <button className="border-2 bg-neutral text-secondary p-2 text-indigo-900 hover:bg-purple-300 hover:text-purple-900 rounded transition duration-500 ease-in-out font-medium cursor-pointer">
                    Rent Your Car
                  </button>
                </Link>
              </div>
            </div>

            <div className="absolute top-[40%] left-[-80px] w-[80px] animate-[cycle_15s_linear_infinite]">
              <img src={car} alt="Car Animation" className="h-full" />
            </div>
          </div>
        </nav>
      ) : (
        // Mobile Navbar Code Here
        <nav
          className={`${
            showModal && "h-screen"
          } bg-neutral py-4 px-4 text-primary overflow-hidden`}
        >
          <div className="mx-auto flex justify-between items-center ">
            <Link to="/">
              <div className="font-bold text-xl flex items-center gap-4">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <span>Caring</span>
              </div>
            </Link>

            <div className="flex justify-end items-center gap-6 cursor-pointer">
              {iconList.map((item, index) => (
                <div
                  key={index}
                  onClick={
                    index === iconList.length - 1
                      ? handleBarsIconClick
                      : undefined
                  }
                >
                  {item.icon}
                </div>
              ))}
              <FaBars
                onClick={handleBarsIconClick}
                className="cursor-pointer"
              />
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-primary text-neutral">
              <div className={`absolute inset-0 bg-slate-600`} />
              <FaTimes
                className="absolute top-6 right-4 cursor-pointer"
                onClick={toggleModal}
                style={{ fontSize: "16px" }}
              />
              <div className="relative bg-slate-600 w-full">
                <div className="flex flex-col gap-8 items-center justify-center h-full">
                  {navLinks.map((link, index) => (
                    <span
                      key={index}
                      className="text-white font-light text-2xl cursor-pointer"
                    >
                      {link.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Header;
