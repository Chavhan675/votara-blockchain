"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, BarChart3, Lock, Globe } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useState } from "react";
import { ethers } from "ethers";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

export default function HomePage() {
  const { user, loading } = useAuth();
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="animate-pulse text-lg tracking-widest">
          Loading VOTRA...
        </h1>
      </div>
    );
  }

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">

      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black blur-3xl animate-pulse"></div>

      {/* TOP STRIP */}
      <div className="relative bg-gradient-to-r from-orange-500 via-white to-green-500 text-black text-center py-2 text-xs font-bold tracking-widest">
        🇮🇳 SECURE • TRANSPARENT • BLOCKCHAIN VOTING SYSTEM
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
            VOTRA
          </h1>

          <div className="flex items-center gap-6 text-sm">

            <Link href="/" className="hover:text-white text-gray-400 transition">Home</Link>
            <Link href="/candidates" className="hover:text-white text-gray-400 transition">Candidates</Link>
            <Link href="/results" className="hover:text-white text-gray-400 transition">Results</Link>

            {!wallet ? (
              <button
                onClick={connectWallet}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition shadow-lg shadow-blue-500/30"
              >
                Connect
              </button>
            ) : (
              <span className="text-blue-400 text-xs bg-blue-500/10 px-3 py-1 rounded-full">
                {wallet.slice(0, 6)}...{wallet.slice(-4)}
              </span>
            )}

            {!user ? (
              <>
                <Link href="/auth/login" className="text-gray-400 hover:text-white">Login</Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-green-500 text-black font-semibold hover:scale-105 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link href="/voter/dashboard" className="px-4 py-2 rounded-lg bg-green-500 text-black font-semibold">
                Dashboard
              </Link>
            )}

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

        <motion.div {...fadeUp}>
          <h1 className="text-6xl font-extrabold leading-tight">
            Secure Voting
            <span className="block bg-gradient-to-r from-orange-400 via-yellow-300 to-green-400 bg-clip-text text-transparent animate-pulse">
              Powered by Blockchain
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-lg">
            Experience next-gen elections with transparency, security, and trust powered by decentralized systems.
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">
            {!user ? (
              <>
                <Link href="/auth/register" className="px-7 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-green-500 text-black font-semibold shadow-xl hover:scale-110 transition">
                  Get Started
                </Link>
                <Link href="/auth/login" className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
                  Learn More
                </Link>
              </>
            ) : (
              <Link href="/voter/vote" className="px-7 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition">
                Vote Now
              </Link>
            )}
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-14">
            {[
              { value: 99.9, suffix: "%", label: "Integrity" },
              { value: 256, suffix: "-bit", label: "Encryption" },
              { value: 24, suffix: "x7", label: "Availability" },
            ].map((stat, i) => (
              <div key={i}>
                <h2 className="text-3xl font-bold text-blue-400">
                  <CountUp end={stat.value} decimals={1} />
                  {stat.suffix}
                </h2>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FEATURE CARD */}
        <motion.div
          {...fadeUp}
          className="p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition"
        >
          <div className="grid grid-cols-2 gap-8 text-center">
            {[
              { icon: ShieldCheck, label: "Secure" },
              { icon: BarChart3, label: "Live Data" },
              { icon: Lock, label: "Encrypted" },
              { icon: Globe, label: "Global Access" },
            ].map((item, i) => (
              <div key={i} className="hover:scale-110 transition">
                <item.icon className="mx-auto text-blue-400" size={36} />
                <p className="mt-3 text-sm text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-14">Why VOTRA?</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Tamper Proof", "Transparent", "Accessible"].map((title, i) => (
            <div
              key={i}
              className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition shadow-lg hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                {title}
              </h3>
              <p className="text-gray-400 text-sm">
                Blockchain ensures complete trust, security, and accessibility.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} VOTRA <br />
        Built with Blockchain • CSE Project 🇮🇳
      </footer>
    </div>
  );
}