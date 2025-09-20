// builderio.js
import React from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";

const BuilderIOEditor = () => {
  const isPreviewing = useIsPreviewing();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Builder.io Page Editor</h1>

      {/* Editable page component */}
      <BuilderComponent
        apiKey="b050bca83de049dc988f680cbe340170" // Add your public API key here
        model="page" // Builder.io model
        entry="YOUR_PAGE_ENTRY_ID" // Optional: specific page entry
      />

      {isPreviewing && (
        <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded">
          You are in Builder.io preview mode. Changes here will reflect in
          Builder.io.
        </div>
      )}
    </div>
  );
};

export default BuilderIOEditor;
