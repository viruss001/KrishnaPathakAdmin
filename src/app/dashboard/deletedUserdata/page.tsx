"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "../../../../utils/api";

interface DeletedUser {
  id: number;
  FirstName: string;
  LastName: string;
  YourEmail: string;
  PhoneNumber: string;
  Subject: string;
  message: string;
}

const DeletedUserTable = () => {
  const [users, setUsers] = useState<DeletedUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Fetch deleted users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(ENDPOINTS.DELETEDDATA);
        if (!res.ok) throw new Error("Failed to fetch deleted users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching deleted users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 🔍 Filter search
  const filteredUsers = users.filter((u) =>
    `${u.FirstName} ${u.LastName} ${u.YourEmail} ${u.PhoneNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto mt-10 p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-800">🗑️ Deleted Users</h1>

        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-72">
          <Search className="text-gray-500 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search deleted users..."
            className="flex-1 outline-none text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white rounded-lg shadow-sm">
          <thead className="bg-red-600 text-white text-sm">
            <tr>
              <th className="py-3 px-4 text-left">First Name</th>
              <th className="py-3 px-4 text-left">Last Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Subject</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition text-red-500"
                >
                  <td className="py-3 px-4">{user.FirstName}</td>
                  <td className="py-3 px-4">{user.LastName}</td>
                  <td className="py-3 px-4">{user.YourEmail}</td>
                  <td className="py-3 px-4">{user.PhoneNumber}</td>
                  <td className="py-3 px-4">{user.Subject}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => router.push(`/dashboard/deletedUserdata/${user.id}`)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  No deleted users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DeletedUserTable;
