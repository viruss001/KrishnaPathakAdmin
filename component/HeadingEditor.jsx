"use client"
import React from "react";
import BulletPointEditor from "./BulletPointEditor";

const HeadingEditor = ({ heading, onChange }) => {
  if (!heading) return null;

  const { title = "", description = "", bulletPoints = [] } = heading;

  const updateField = (field, value) => {
    onChange({ ...heading, [field]: value });
  };

  const addBullet = () => {
    updateField("bulletPoints", [...bulletPoints, "New bullet point"]);
  };

  const updateBullet = (index, value) => {
    const newBullets = bulletPoints.map((b, i) => (i === index ? value : b));
    updateField("bulletPoints", newBullets);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <input
        type="text"
        value={title}
        onChange={(e) => updateField("title", e.target.value)}
        className="text-lg font-semibold w-full mb-2 border-b focus:outline-none focus:border-blue-500"
      />

      <textarea
        value={description}
        onChange={(e) => updateField("description", e.target.value)}
        className="w-full border rounded-lg p-2 mb-3 focus:ring focus:ring-blue-200"
        placeholder="Add description..."
      />

      <div className="ml-4 space-y-2">
        {bulletPoints.map((bp, i) => (
          <BulletPointEditor
            key={i}
            value={bp}
            onChange={(val) => updateBullet(i, val)}
          />
        ))}
      </div>

      <button
        onClick={addBullet}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        + Add Bullet Point
      </button>
    </div>
  );
};

export default HeadingEditor;
