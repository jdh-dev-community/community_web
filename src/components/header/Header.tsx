import { colors } from "@/styles/theme";
import React from "react";

export const Header = () => {
  return (
    <header
      className="fixed top-0 w-full text-white shadow-md z-10"
      style={{
        background:
          "linear-gradient(to right, #6DB33F, rgba(109, 179, 63, 0.8))",
        padding: "20px 0",
      }}
    >
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="font-bold" style={{ fontSize: "24px" }}>
            BeginCoding#
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
