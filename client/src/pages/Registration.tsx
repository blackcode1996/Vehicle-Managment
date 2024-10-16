import videoSrc from "../assets/signInVideo.mp4";
import RegistrationForm from "../components/RegistrationForm";
import { getLocalStorage } from "../utils/LocalStorage";

const Registration = () => {
  const resgisterAsSeller = getLocalStorage("regsiterAsSeller");

  return (
    <div className="relative min-h-screen flex">
      {/* Left Side Background */}
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden relative">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bg-gradient-to-b from-primary to-secondary opacity-20 inset-0 z-0"></div>
          <div className="absolute triangle min-h-screen right-0 w-20"></div>
          {/* <ul className="circles">
            {[...Array(10)].map((_, index) => (
              <li key={index}></li>
            ))}
          </ul> */}
        </div>

        {/* Right Side Form */}
        <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-primary">
                {resgisterAsSeller
                  ? "Unpack your jounrney with caring"
                  : "Start your journey"}
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Please sign in to your account
              </p>
            </div>
            <RegistrationForm resgisterAsSeller={resgisterAsSeller} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
