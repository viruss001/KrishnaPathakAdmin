"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "../../utils/api";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Checking authentication...");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    let redirected = false; // prevent double navigation

    const checkAuth = async () => {
      try {
        const res = await fetch(ENDPOINTS.USERS, {
           method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ jwt: token }),
        }
      );

        const data = await res.json();

        if (res.ok && data.valid) {
          // ✅ Authenticated
          setStatus(`Welcome back, ${data?.username}! Redirecting...`);
          setTimeout(() => {
            if (!redirected) {
              router.replace("/dashboard");
              redirected = true;
            }
          }, 1000);
        } else {
          // ❌ Not authenticated
          setStatus("Not logged in. Redirecting to login...");
          setTimeout(() => {
            if (!redirected) {
              router.replace("/auth/login");
              redirected = true;
            }
          }, 1000);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setStatus("Error verifying user. Redirecting to login...");
        setTimeout(() => {
          if (!redirected) {
            router.replace("/auth/login");
            redirected = true;
          }
        }, 1000);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    // cleanup to cancel redirect on unmount
    return () => {
      redirected = true;
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6AB4C] text-center">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-[#0E0E2C] mb-3">
          {loading ? "Authenticating..." : "Redirecting..."}
        </h1>
        <p className="text-gray-700 text-sm">{status}</p>

        {/* Spinner */}
        {loading && (
          <div className="mt-6 w-8 h-8 border-4 border-[#0E0E2C] border-t-transparent rounded-full animate-spin mx-auto"></div>
        )}
      </div>
    </div>
  );
}
