import React from "react";
import { useNode } from "@craftjs/core";

export const Text = ({ text }) => {
  const { connectors } = useNode();
  return (
    <p
      ref={connectors.connect}
      contentEditable
      suppressContentEditableWarning
      style={{ padding: "0.25rem", minHeight: "1em" }}
    >
      {text}
    </p>
  );
};

// Add craft metadata
Text.craft = {
  displayName: "Text",
};
