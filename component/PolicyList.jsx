"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, BookText, PlusCircle } from "lucide-react";
import PolicyEditor from "./PolicyEditor";

const PolicyList = ({ onSelect }) => {
  const [addNew, setAddNew] = useState(false);

  const [policies] = useState([
    {
      id: 1,
      title: "Data Deletion and Account Removal Policy",
      slug: "data-deletion",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
    },
    {
      id: 2,
      title: "Privacy Policy",
      slug: "privacy-policy",
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    },
    {
      id: 3,
      title: "Client Consent and Terms & Conditions",
      slug: "client-consent-and-terms-conditions",
      icon: <BookText className="w-6 h-6 text-purple-600" />,
    },
  ]);

  // If user clicks "Add New Policy", show PolicyEditor instead of list
  if (addNew) {
    return (
      <PolicyEditor
        policy={{ title: "New Policy" }}
        onBack={() => setAddNew(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Policy Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage, edit, and organize your company’s policy documents.
        </p>

        {/* Add New Policy Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setAddNew(true)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Policy
        </motion.button>
      </div>

      {/* Policy Cards Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 60 }}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 transition-all duration-300"
          >
            <div className="mb-3">{p.icon}</div>
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              {p.title}
            </h2>
            <p className="text-sm text-gray-500">{p.slug}</p>
            <button
              onClick={() => onSelect(p)}
              className="mt-4 bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
            >
              Edit Policy
            </button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default PolicyList;
