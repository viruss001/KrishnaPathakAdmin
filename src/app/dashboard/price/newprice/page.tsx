"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const CreatePriceSectionPage = () => {
  const router = useRouter();

  // ✅ State for each field in PriceSection model
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [validity, setValidity] = useState("");
  const [offer, setOffer] = useState("");

  // ✅ Form submission handler
  const handleSave = async () => {
    if (!title.trim() || !price.trim() || !validity.trim() || !offer.trim()) {
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    const newPriceSection = {
      title,
      price: parseInt(price),
      validity,
      offer,
    };

    try {
      // Replace this URL with your actual Django backend endpoint
      const response = await fetch("http://127.0.0.1:8000/api/price/prices/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPriceSection),
      });

      if (response.ok) {
        alert("✅ Price section created successfully!");
        router.push("/dashboard/price");
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("❌ Failed to create price section. Check console for details.");
      }
    } catch (error) {
      console.error("Error creating price section:", error);
      alert("❌ Network or server error.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">💰 Create Price Section</h1>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter plan title..."
          className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price..."
          className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
        />
      </div>

      {/* Validity */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Validity</label>
        <input
          type="text"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          placeholder="e.g. 1 Month, 3 Months..."
          className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
        />
      </div>

      {/* Offer */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Offer</label>
        <input
          type="text"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="e.g. 50% OFF"
          className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => router.back()}
          className="border border-red-500 px-8 py-2.5 rounded-lg text-red-600 font-semibold bg-white hover:bg-red-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-2.5 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
        >
          Save Plan
        </button>
      </div>
    </motion.div>
  );
};

export default CreatePriceSectionPage;
