// components/Navbar.jsx
import React from "react";
import { useNode } from "@craftjs/core";

export const Navbar = ({ logoText = "Logo" }) => {
  const { connectors } = useNode();
  return (
    <nav
      ref={connectors.connect}
      style={{
        padding: "1rem",
        background: "#4f46e5",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{logoText}</span>
      <div>Menu</div>
    </nav>
  );
};

Navbar.craft = { displayName: "Navbar" };

// Similarly create Header, BodySection, Footer
