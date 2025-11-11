"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { ENDPOINTS } from "../../../../../../utils/api"; // adjust path if needed

const BlogEditPage = () => {
  const router = useRouter();
  const { id } = useParams(); // ✅ dynamic blog ID from route

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch specific blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${ENDPOINTS.BLOGS}${id}/`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setType(data.type);
        setImage(data.image);
      } catch (err) {
        console.error(err);
        alert("Error fetching blog data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  // ✅ PATCH request to update only changed fields
  const handleSave = async () => {
    try {
      const formData = new FormData();

      // append only fields that have values
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (type) formData.append("type", type);
      if (image instanceof File) formData.append("image", image);

      const res = await fetch(`${ENDPOINTS.BLOGS}${id}/`, {
        method: "PATCH", // ✅ PATCH instead of PUT
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update blog");
      alert("✅ Blog updated successfully!");
      router.push("/dashboard/blog");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating blog.");
    }
  };

  // ✅ Delete blog
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${ENDPOINTS.BLOGS}${id}/`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      alert("🗑️ Blog deleted successfully!");
      router.push("/dashboard/blog");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting blog.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading blog details...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-gray-200 mb-6">
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          src={
            typeof image === "string"
              ? image
              : URL.createObjectURL(image)
          }
          alt="blog"
          className="w-40 h-40 object-cover rounded-xl shadow-md border border-gray-100"
        />

        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold text-gray-800 w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none transition"
            />
            <div className="hidden sm:flex gap-2 ml-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 border px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 transition text-sm text-gray-700 shadow-sm"
              >
                <Pencil size={16} /> Save
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 border px-3 py-1.5 rounded-lg text-red-600 bg-white hover:bg-red-50 transition text-sm shadow-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>

          {/* Blog Content Textarea */}
          <textarea
            className="text-gray-700 text-sm w-full mt-2 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write or edit your blog content here..."
          />
        </div>
      </div>

      {/* Type Field */}
      <div className="mt-6">
        <div className="mb-2 font-semibold text-gray-800 text-lg">Type</div>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter blog type (e.g., News, Politics)"
          className="w-full border border-gray-300 rounded-lg px-4 text-black py-2 text-sm bg-white focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>

      {/* Upload Image */}
      <div className="mt-6">
        <label className="block font-semibold text-gray-800 text-lg mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <button
          onClick={() => router.back()}
          className="border border-red-500 px-8 py-2.5 rounded-lg text-red-600 font-semibold bg-white hover:bg-red-50 transition"
        >
          Discard
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-2.5 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default BlogEditPage;
