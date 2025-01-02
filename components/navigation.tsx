"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navigation = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("User logged out");
  };

  return (
    <nav className="flex items-center justify-center bg-gray-800 text-white py-4 shadow-lg">
      <Link
        href="/"
        className={`mx-4 px-4 py-2 rounded-lg transition-all ${
          pathname === "/"
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={`mx-4 px-4 py-2 rounded-lg transition-all ${
          pathname === "/about"
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        About
      </Link>
      <Link
        href="/experts"
        className={`mx-4 px-4 py-2 rounded-lg transition-all ${
          pathname.startsWith("/experts")
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        Experts
      </Link>
      <Link
        href="/scientificworks"
        className={`mx-4 px-4 py-2 rounded-lg transition-all ${
          pathname.startsWith("/scientificworks")
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        Scientific Works
      </Link>
      {!isLoggedIn ? (
        <Link
          href="/login"
          className={`mx-4 px-4 py-2 rounded-lg transition-all ${
            pathname === "/login"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          Log In
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="mx-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
        >
          Log Out
        </button>
      )}
    </nav>
  );
};
