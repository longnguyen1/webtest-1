"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token"); // Giả sử bạn lưu token đăng nhập ở localStorage
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token đăng nhập
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    window.location.href = "/"; // Chuyển hướng về trang chủ
  };

  return (
    <nav>
      <Link
        href="/"
        className={pathname === "/" ? "font-bold mr-4" : "text-blue-500 mr-4"}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about" ? "font-bold mr-4" : "text-blue-500 mr-4"
        }
      >
        About
      </Link>
      <Link
        href="/experts"
        className={
          pathname.startsWith("/experts")
            ? "font-bold mr-4"
            : "text-blue-500 mr-4"
        }
      >
        Expert
      </Link>
      {!isLoggedIn ? (
        <Link
          href="/login"
          className={pathname === "/login" ? "font-bold" : "text-blue-500"}
        >
          Log In
        </Link>
      ) : (
        <button onClick={handleLogout} className="text-blue-500 font-bold ml-4">
          Log Out
        </button>
      )}
    </nav>
  );
};
