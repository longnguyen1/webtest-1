"use client";
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Cập nhật trạng thái khi đăng nhập thành công
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Cập nhật trạng thái khi đăng xuất
  };

  return (
    <html lang="en">
      <body>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>
          <p>
            Copyright &copy; {new Date().getFullYear()} - All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
