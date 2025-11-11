"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ENDPOINTS } from "../../../../utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("⚠️ Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const res = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      // ✅ Save JWT token only if returned (superusers)
      if (data.token) {
        localStorage.setItem("jwt", data.token);
      }

      setSuccessMsg(data.message || "Login successful!");

      // ✅ Redirect based on role
      setTimeout(() => {
        if (data.is_superuser) {
          router.push("/dashboard"); // change this path if needed
        } else {
          router.push("/"); // redirect to home for normal users
        }
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("❌ Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#E6AB4C]">
      {/* Left Section */}
      <div className="bg-[#0E0E2C] w-[45%] rounded-tr-[12rem]" />

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-10">
        <h1 className="text-3xl font-bold text-black mb-10">Welcome Back!</h1>

        <div className="w-full max-w-sm space-y-5">
          {/* Email */}
          <div className="flex items-center border border-gray-700 rounded-full px-4 py-3 bg-transparent">
            <Mail className="text-gray-600 mr-2" size={18} />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-600"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-full px-4 py-3 bg-transparent">
            <Lock className="text-gray-600 mr-2" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-black hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Error / Success Message */}
          {errorMsg && (
            <div className="text-red-600 text-sm text-center">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-green-600 text-sm text-center">
              {successMsg}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-full transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0E0E2C] text-white hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up */}
          <p className="text-center text-black mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="font-medium underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
