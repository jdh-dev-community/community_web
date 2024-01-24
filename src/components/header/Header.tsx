import React from "react";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-gray-800 text-white shadow-md z-10">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-lg">Dev Community</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
