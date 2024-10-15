import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <div className="w-full relative flex">
        <svg
          viewBox="0 0 400 150"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="myGradient" gradientTransform="rotate(90)">
              <stop offset="5%" stopColor="#dc2626" />
              <stop offset="95%" stopColor="#e0c3fc" />
            </linearGradient>
          </defs>
          <path
            d="M208.09,0.00 C152.70,67.10 262.02,75.98 200.80,150.00 L0.00,150.00 L0.00,0.00 Z"
            fill="url(#myGradient)"
          />
        </svg>

        <div className="absolute top-0 p-8 flex justify-between w-full items-center z-10">
          <h1 className="text-3xl text-indigo-900 uppercase font-bold">
            Caring
          </h1>
          <Link to="/register">
            <button className="border-2 bg-neutral text-secondary p-2 text-indigo-900 hover:bg-purple-300 hover:text-purple-900 rounded transition duration-500 ease-in-out font-medium cursor-pointer">
              Registration
            </button>
          </Link>
        </div>

        <form className="absolute inset-0 flex flex-col items-center justify-center px-8">
          <h1 className="text-5xl text-indigo-600 font-bold mb-8">
            Welcome Back
          </h1>
          <input
            className="py-2 px-4 border rounded mt-4 text-indigo-600 placeholder-indigo-600 w-full max-w-md"
            type="email"
            placeholder="Type your email"
          />
          <input
            className="py-2 px-4 border rounded mt-4 placeholder-indigo-600 text-indigo-600 w-full max-w-md"
            type="password"
            placeholder="Type your password"
          />
          <button className="border-2 bg-purple-300 p-2 text-purple-900 hover:bg-indigo-300 hover:text-indigo-900 rounded transition duration-500 ease-in-out font-bold mt-4 uppercase w-full max-w-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
