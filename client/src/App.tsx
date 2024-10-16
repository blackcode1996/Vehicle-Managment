import { ToastContainer } from "react-toastify";
import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AllRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
