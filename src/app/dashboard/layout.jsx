"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../component/Sidebar";
import { ENDPOINTS } from "../../../utils/api";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    const checkUser = async () => {
      try {
        const res = await fetch(ENDPOINTS.USERS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jwt: token }),
        });

        const data = await res.json();

        if (res.ok && data.valid) {
          setUser(data);
        } else {
          router.replace("/auth/login");
        }
      } catch (err) {
        console.error("User check failed:", err);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) return null; // Prevent flicker before redirect

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
