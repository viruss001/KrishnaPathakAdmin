"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ENDPOINTS } from "../../../../../utils/api";

const ViewContactPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [contact, setContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchContact = async () => {
      try {
        const res = await fetch(`${ENDPOINTS.CONTACT}/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch contact");
        const data = await res.json();
        setContact(data);
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  if (!contact)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Contact not found.
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl border border-gray-200"
    >
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Contact Details
      </h1>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong>First Name:</strong> {contact.FirstName}
        </p>
        <p>
          <strong>Last Name:</strong> {contact.LastName}
        </p>
        <p>
          <strong>Email:</strong> {contact.YourEmail}
        </p>
        <p>
          <strong>Phone:</strong> {contact.PhoneNumber}
        </p>
        <p>
          <strong>Subject:</strong> {contact.Subject}
        </p>
        <p className="border-t pt-3">
          <strong>Message:</strong> <br />
          {contact.message}
        </p>
      </div>
    </motion.div>
  );
};

export default ViewContactPage;
