"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react";
import { ENDPOINTS } from "../../../../utils/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("⚠️ Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("❌ Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setMsg("");

      const res = await fetch(ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setMsg(data.message || "✅ Signup successful!");
      router.push(`/auth/login`);
    } catch (error) {
      setErrorMsg(error.message || "❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#E6AB4C]">
      {/* Left Section */}
      <div className="bg-[#0E0E2C] w-[45%] rounded-tr-[12rem] rounded-br-[12rem]" />

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-10">
        <h1 className="text-3xl font-bold text-black mb-10">Create Account</h1>

        <div className="w-full max-w-sm space-y-4">
          {/* Full Name */}
          <div className="flex items-center border border-gray-700 rounded-full px-4 py-3 bg-transparent">
            <User className="text-gray-600 mr-2" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-700 rounded-full px-4 py-3 bg-transparent">
            <Mail className="text-gray-600 mr-2" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-full px-4 py-3 bg-transparent">
            <Lock className="text-gray-600 mr-2" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
            />
            {showPassword ? (
              <EyeOff
                className="text-gray-600 ml-2 cursor-pointer"
                size={18}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="text-gray-600 ml-2 cursor-pointer"
                size={18}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-700 rounded-full px-4 py-3 bg-transparent">
            <Lock className="text-gray-600 mr-2" size={18} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
            />
            {showConfirmPassword ? (
              <EyeOff
                className="text-gray-600 ml-2 cursor-pointer"
                size={18}
                onClick={() => setShowConfirmPassword(false)}
              />
            ) : (
              <Eye
                className="text-gray-600 ml-2 cursor-pointer"
                size={18}
                onClick={() => setShowConfirmPassword(true)}
              />
            )}
          </div>

          {/* Error / Success Messages */}
          {errorMsg && (
            <div className="text-red-600 text-sm text-center">{errorMsg}</div>
          )}
          {msg && (
            <div className="text-green-700 text-sm font-medium text-center">
              {msg}
            </div>
          )}

          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-full transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0E0E2C] text-white hover:opacity-90"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-center text-black mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
