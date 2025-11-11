"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";


const ContactUsTable = () => {  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-800"> Kit Downloaded data</h1>

        {/* Search bar */}
        
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white rounded-lg shadow-sm">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              
             
            </tr>
          </thead>
          <tbody>
             
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  No Data  found.
                </td>
              </tr>
           
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ContactUsTable;
