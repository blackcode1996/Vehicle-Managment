import { getLocalStorage } from "../utils/LocalStorage";
import OTPForm from "../components/OtpForm";

const VerifyOTP = () => {
  const { user } = getLocalStorage("user");

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow h-[40vh] m-[45px]">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
        <p className="text-[15px] text-slate-500">
          {`Enter the 6-digit verification code that was sent to ${user.email ? user.email : "your mail"}.`}
        </p>
      </header>
      <OTPForm email={user.email} />
    </div>
  );
};

export default VerifyOTP;
