"use client"
import React, { useState } from "react";
import HeadingEditor from "./HeadingEditor";

const PolicyEditor = ({ policy=null, onBack =null }) => {
  const [headings, setHeadings] = useState([
    {
      
    },
    
  ]);

  const addHeading = () => {
    const newHeading = {
      id: Date.now(),
      title: `New Heading ${headings.length + 1}`,
      order: headings.length + 1,
      description: "",
      bulletPoints: [],
    };
    setHeadings([...headings, newHeading]);
  };

  const updateHeading = (updated) => {
    setHeadings(headings.map((h) => (h.id === updated.id ? updated : h)));
  };

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back to Policies
      </button>

      <h1 className="text-2xl font-bold mb-6">{policy?.title}</h1>

      <button
        onClick={addHeading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-6"
      >
        + Add Heading
      </button>

      <div className="space-y-6">
        {headings.map((heading) => (
          <HeadingEditor
            key={heading.id}
            heading={heading}
            onChange={updateHeading}
          />
        ))}
      </div>
    </div>
  );
};

export default PolicyEditor;
