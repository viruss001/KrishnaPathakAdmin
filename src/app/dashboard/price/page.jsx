"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Edit } from "lucide-react";
import Link from "next/link";
import { ENDPOINTS } from "../../../../utils/api";


const Bloglist = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(ENDPOINTS.PRICE); // ✅ replace with your actual price endpoint
        if (!res.ok) throw new Error("Failed to fetch price data");
        const data = await res.json();
        setPrices(data);
      } catch (err) {
        console.error("Error fetching prices:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrices();
    console.log(prices);
    
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading price data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          💰 Price Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Manage and edit all pricing-related sections from one place.
        </p>
        <Link href="/dashboard/price/newprice">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-800 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Price Section
          </motion.button>
        </Link>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {prices.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6 flex flex-col justify-between h-40">
              <h2 className="font-semibold text-lg text-gray-800 flex items-center gap-2 mb-2">
                {p.title || "Untitled Price Plan"}
              </h2>

              <div className="flex justify-between items-center mt-auto">
                <Link href={`/dashboard/price/${p.id}/editpage`}>
                  <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-700">
          Price Management Dashboard
        </span>
        . All rights reserved.
      </footer>
    </div>
  );
};

export default Bloglist;
