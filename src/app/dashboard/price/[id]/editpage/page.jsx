"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, PlusCircle } from "lucide-react";
import { ENDPOINTS } from "../../../../../../utils/api";

const EditPriceSectionPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState({
    title: "",
    price: "",
    validity: "",
    offer: "",
  });

  const [bullets, setBullets] = useState([]);
  const [newBullet, setNewBullet] = useState("");

  // ✅ Fetch price section and related bullet points
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // Fetch Price Section
        const priceRes = await fetch(`${ENDPOINTS.PRICE}/${id}/`);
        if (!priceRes.ok) throw new Error("Failed to fetch price section");
        const priceData = await priceRes.json();

        // Fetch related bullet points directly using query param
        const bulletRes = await fetch(
          `${ENDPOINTS.PRICE.replace("prices", "bullets")}/?price_id=${id}`
        );
        if (!bulletRes.ok) throw new Error("Failed to fetch bullet points");
        const bulletData = await bulletRes.json();

        setPriceData({
          title: priceData.title || "",
          price: priceData.price?.toString() || "",
          validity: priceData.validity || "",
          offer: priceData.offer || "",
        });

        setBullets(bulletData);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("❌ Failed to load data. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ Update Price Section
  const handleUpdate = async () => {
    if (!priceData.title || !priceData.price || !priceData.validity || !priceData.offer) {
      alert("⚠️ Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch(`${ENDPOINTS.PRICE}/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...priceData,
          price: parseInt(priceData.price),
        }),
      });

      if (res.ok) {
        alert("✅ Price section updated!");
      } else {
        const err = await res.json();
        console.error("Error updating price:", err);
        alert("❌ Failed to update price section.");
      }
    } catch (error) {
      console.error("Error updating:", error);
      alert("❌ Network or server error.");
    }
  };

  // ✅ Delete Price Section
  const handleDeletePrice = async () => {
    if (!confirm("Are you sure you want to delete this price section?")) return;

    try {
      const res = await fetch(`${ENDPOINTS.PRICE}/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("🗑️ Price section deleted successfully!");
        router.push("/dashboard/price"); // Redirect to list page (update path as needed)
      } else {
        alert("❌ Failed to delete price section.");
      }
    } catch (error) {
      console.error("Error deleting price section:", error);
    }
  };

  // ✅ Add Bullet Point
  const handleAddBullet = async () => {
    if (!newBullet.trim()) return alert("⚠️ Enter a bullet point first.");

    try {
      const res = await fetch(`${ENDPOINTS.PRICE.replace("prices", "bullets")}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price_id: id, // ✅ Matches backend
          points: newBullet, // ✅ Matches backend
        }),
      });

      if (res.ok) {
        const added = await res.json();
        setBullets([...bullets, added]);
        setNewBullet("");
      } else {
        alert("❌ Failed to add bullet point.");
      }
    } catch (error) {
      console.error("Error adding bullet:", error);
    }
  };

  // ✅ Delete Bullet Point
  const handleDeleteBullet = async (bulletId) => {
    if (!confirm("Are you sure you want to delete this bullet point?")) return;

    try {
      const res = await fetch(
        `${ENDPOINTS.PRICE.replace("prices", "bullets")}/${bulletId}/`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setBullets(bullets.filter((b) => b.id !== bulletId));
      } else {
        alert("❌ Failed to delete bullet point.");
      }
    } catch (error) {
      console.error("Error deleting bullet:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">✏️ Edit Price Section</h1>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Price Form Fields */}
      {["title", "price", "validity", "offer"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 font-medium mb-1 capitalize">
            {field}
          </label>
          <input
            name={field}
            type={field === "price" ? "number" : "text"}
            value={priceData[field]}
            onChange={(e) => setPriceData({ ...priceData, [field]: e.target.value })}
            placeholder={`Enter ${field}...`}
            className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
          />
        </div>
      ))}

      {/* Bullets Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">📌 Bullet Points</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newBullet}
            onChange={(e) => setNewBullet(e.target.value)}
            placeholder="Add new bullet point..."
            className="flex-1 border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none bg-white"
          />
          <button
            onClick={handleAddBullet}
            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <PlusCircle className="w-4 h-4" /> Add
          </button>
        </div>

        {bullets.length === 0 ? (
          <p className="text-gray-500 text-sm">No bullet points yet.</p>
        ) : (
          <ul className="space-y-2">
            {bullets.map((b) => (
              <li
                key={b.id}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-4 py-2"
              >
                <span className="text-gray-800">{b.points}</span>
                <button
                  onClick={() => handleDeleteBullet(b.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={handleDeletePrice}
          className="border border-red-600 bg-red-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Delete Price Section
        </button>
        <button
          onClick={handleUpdate}
          className="px-8 py-2.5 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default EditPriceSectionPage;
