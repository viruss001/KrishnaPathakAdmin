"use client"
import React, { useState } from "react";
import PolicyList from "../../../../component/PolicyList";
import PolicyEditor from "../../../../component/PolicyEditor";

export default function App() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {!selectedPolicy ? (
        <PolicyList onSelect={(p) => setSelectedPolicy(p)} />
      ) : (
        <PolicyEditor policy={selectedPolicy} onBack={() => setSelectedPolicy(null)} />
      )}
    </div>
  );
}
