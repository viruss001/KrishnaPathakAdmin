"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, ArrowLeft } from "lucide-react";
import { ENDPOINTS } from "../../../../../utils/api"; // adjust path if needed

const CreateBlogPage = () => {
  const router = useRouter();

  // ✅ States for blog creation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // ✅ Create new blog (POST request)
  const handleSave = async () => {
    if (!title.trim() || !description.trim() || !type.trim()) {
      alert("⚠️ Please fill out all fields before saving.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      if (image) formData.append("image", image);

      const res = await fetch(ENDPOINTS.BLOGS, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create blog");
      }

      alert("✅ Blog created successfully!");
      router.push("/dashboard/blog");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 Create New Blog</h1>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Image Upload Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative w-40 h-40">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Blog"
              className="w-40 h-40 object-cover rounded-xl border border-gray-300 shadow-md"
            />
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
              No image
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
            <Upload size={18} />
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {image && (
            <button
              onClick={() => setImage(null)}
              className="text-sm text-red-600 mt-2 hover:underline"
            >
              Remove image
            </button>
          )}
        </div>
      </div>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title..."
        className="w-full text-xl font-semibold border-b text-black border-gray-300 bg-transparent outline-none focus:border-blue-500 transition mb-4"
      />

      {/* Description Textarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your blog description here..."
        rows={8}
        className="w-full text-gray-700 border border-gray-300 rounded-lg p-4 bg-gray-50 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
      />

      {/* Type Input */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">Type</h3>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter blog type (e.g., News, Politics)"
          className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-300 outline-none bg-white"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <button
          onClick={() => router.back()}
          disabled={loading}
          className="border border-red-500 px-8 py-2.5 rounded-lg text-red-600 font-semibold bg-white hover:bg-red-50 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-8 py-2.5 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </div>
    </motion.div>
  );
};

export default CreateBlogPage;
