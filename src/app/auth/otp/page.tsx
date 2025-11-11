"use client";

import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ENDPOINTS } from "../../../../utils/api";
import { useSearchParams, useRouter } from "next/navigation";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      alert("⚠️ Please enter a valid 6-digit OTP.");
      return;
    }

    if (!email) {
      alert("❌ Missing email. Please go back and login again.");
      return;
    }

    try {
      const res = await fetch(ENDPOINTS.VERFIYOTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
         credentials: "include", // ✅ IMPORTANT
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ ${data.error || "Verification failed"}`);
        return;
      }
      localStorage.setItem("jwt", data.token);

      alert("✅ OTP Verified Successfully!");
      console.log("Response:", data);

      // Optional: redirect based on user role
       
       setTimeout(() => router.push("/"), 2000);

    } catch (error) {
      console.error("OTP verification error:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#E6AB4C]">
      {/* Left Section */}
      <div className="bg-[#0E0E2C] w-[45%] rounded-tr-[12rem] rounded-br-[12rem]" />

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-sm text-center space-y-8">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-black hover:underline mb-4 font-medium"
          >
            <ArrowLeft size={18} /> Back to Login
          </Link>

          <h1 className="text-3xl font-bold text-black">Verify OTP</h1>
          <p className="text-gray-700 text-sm mb-4">
            Enter the 6-digit code sent to <b>{email}</b>.
          </p>

          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, index)
                }
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-black"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#0E0E2C] text-white font-semibold py-3 rounded-full hover:opacity-90 transition"
          >
            Verify OTP
          </button>

          <p className="text-sm text-black mt-3">
            Didn’t receive the code?{" "}
            <button className="font-medium underline hover:text-gray-800">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
