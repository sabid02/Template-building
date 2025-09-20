// components/EditableText.jsx
import React from "react";
import { useNode } from "@craftjs/core";

export const EditableText = ({ text }) => {
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

EditableText.craft = { displayName: "Text" };

// components/EditableImage.jsx
import React from "react";
import { useNode } from "@craftjs/core";

export const EditableImage = ({ src, width = "100%" }) => {
  const { connectors } = useNode();
  return <img ref={connectors.connect} src={src} width={width} alt="" />;
};

EditableImage.craft = { displayName: "Image" };
