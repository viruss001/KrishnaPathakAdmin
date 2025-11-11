"use client"
import React from "react";

const BulletPointEditor = ({ value, onChange }) => {
  return (
    <div className="flex items-start gap-2">
      <span className="text-lg mt-1">•</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border-b focus:outline-none focus:border-blue-500 pb-1"
      />
    </div>
  );
};

export default BulletPointEditor;
