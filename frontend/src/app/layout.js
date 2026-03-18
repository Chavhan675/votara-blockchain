"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">

        <AuthProvider>

          <Navbar />

          <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>

          <Footer />

        </AuthProvider>

      </body>
    </html>
  );
}