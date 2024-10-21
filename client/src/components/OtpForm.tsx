import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

interface OTPFormProps {
  email: string;
}

const OTPForm: React.FC<OTPFormProps> = ({ email }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const index = inputsRef.current.indexOf(target);

    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      if (index > 0) {
        inputsRef.current[index - 1]!.value = "";
        inputsRef.current[index - 1]!.focus();
      }
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const index = inputsRef.current.indexOf(target);

    if (target.value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]!.focus();
    } else if (target.value && index === inputsRef.current.length - 1) {
      submitRef.current!.focus();
    }
  };

  const handleFocus = (e: FocusEvent) => {
    (e.target as HTMLInputElement).select();
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text") as string;

    if (!/^\d{6}$/.test(text)) {
      return;
    }

    const digits = text.split("");
    inputsRef.current.forEach((input, index) => {
      if (input) input.value = digits[index];
    });
    submitRef.current!.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = inputsRef.current.map((input) => input?.value).join("");
    try {
      await axiosInstance.post("/api/auth/verifyotp", {
        email,
        otp,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      await axiosInstance.post("/api/auth/resendotp", {
        email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const inputs = inputsRef.current;
    inputs.forEach((input) => {
      if (input) {
        input.addEventListener("input", handleInput as EventListener);
        input.addEventListener("keydown", handleKeyDown);
        input.addEventListener("focus", handleFocus);
        input.addEventListener("paste", handlePaste);
      }
    });

    return () => {
      inputs.forEach((input) => {
        if (input) {
          input.removeEventListener("input", handleInput as EventListener);
          input.removeEventListener("keydown", handleKeyDown);
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("paste", handlePaste);
        }
      });
    };
  }, []);

  return (
    <form id="otp-form" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            className="w-14 h-14 text-center text-2xl font-extrabold text-primary bg-neutral border border-transparent hover:border-neutral appearance-none rounded p-4 outline-none focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary"
            maxLength={1}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </div>
      <div className="max-w-[260px] mx-auto mt-4">
        <button
          type="submit"
          ref={submitRef}
          className="w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Verify Account
        </button>
      </div>

      <div className="text-sm text-slate-500 mt-4 flex justify-between items-center p-2">
        Didn't receive code?{" "}
        <button
          type="button"
          onClick={handleResendOTP}
          className="w-[90px] flex justify-center bg-gradient-to-r from-primary to-secondary text-neutral p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Resend
        </button>
      </div>
    </form>
  );
};

export default OTPForm;
