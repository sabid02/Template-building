import React, { useState } from "react";
import { Editor, Frame, Element } from "@craftjs/core";
import { Text } from "./Text"; // Editable text component

const Section = ({ children }) => (
  <div
    style={{ padding: "2rem", border: "1px dashed #ccc", marginBottom: "1rem" }}
  >
    {children}
  </div>
);

Section.craft = {
  rules: { canMoveIn: () => true },
};

export default function ReactPageEditor() {
  const [pageData, setPageData] = useState(null);

  const handleSave = (editor) => {
    const json = editor.serialize();
    console.log("Page JSON:", json);
    setPageData(json); // save to database if needed
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#f9f9f9" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        React Page Editor
      </h1>

      <Editor resolver={{ Section, Text }}>
        <Frame>
          <Element is={Section} canvas>
            <Text text="Welcome to your editable template!" />
          </Element>
        </Frame>
      </Editor>

      <button
        onClick={() => handleSave(window.Craft?.editor)}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          background: "#4f46e5",
          color: "#fff",
          borderRadius: "6px",
        }}
      >
        Save Template
      </button>

      {pageData && (
        <pre
          style={{
            marginTop: "2rem",
            background: "#333",
            color: "#fff",
            padding: "1rem",
            borderRadius: "6px",
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(pageData, null, 2)}
        </pre>
      )}
    </div>
  );
}
