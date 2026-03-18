"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import ConnectWallet from "../components/ConnectWallet";
import {
  ShieldCheck,
  BarChart3,
  Lock,
  Globe
} from "lucide-react";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("User loaded:", user);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-xl animate-pulse">Loading Secure Environment...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* TOP STRIP */}
      <div className="bg-gradient-to-r from-orange-500 via-white to-green-500 text-black text-center py-2 text-sm font-medium">
        🇮🇳 National Digital Election Platform • Blockchain Secured • Transparent • Tamper-Proof
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
            Votara
          </h1>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/auth/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-orange-500 to-green-500 px-5 py-2 rounded-lg text-black font-semibold"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <span className="text-green-400 font-semibold">
                  👋 {user.name}
                </span>
                <Link
                  href="/voter/dashboard"
                  className="bg-green-500 text-black px-5 py-2 rounded-lg font-semibold"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">

        <motion.div {...fadeUp}>
          <h1 className="text-5xl font-bold leading-tight">
            India’s Next-Gen
            <span className="block bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              Digital Voting System
            </span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg max-w-lg">
            A blockchain-powered election platform ensuring transparency,
            security, and trust for every citizen across India.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            {!user ? (
              <>
                <Link href="/auth/register" className="bg-gradient-to-r from-orange-500 to-green-500 px-7 py-3 rounded-lg text-black font-semibold">
                  Register
                </Link>
                <Link href="/auth/login" className="border border-white/20 px-7 py-3 rounded-lg">
                  Login
                </Link>
              </>
            ) : (
              <Link href="/voter/vote" className="bg-blue-600 px-7 py-3 rounded-lg">
                Vote Now
              </Link>
            )}
          </div>

          <div className="mt-8">
            <ConnectWallet />
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10 text-sm text-gray-400">
            <div>
              <h2 className="text-white text-xl font-bold"><CountUp end={100} />%</h2>
              Security
            </div>
            <div>
              <h2 className="text-white text-xl font-bold"><CountUp end={0} />%</h2>
              Fraud
            </div>
            <div>
              <h2 className="text-white text-xl font-bold"><CountUp end={24} />x7</h2>
              Availability
            </div>
          </div>
        </motion.div>

        {/* FEATURES */}
        <motion.div {...fadeUp} className="bg-white/5 rounded-xl p-8 border border-white/10">
          <div className="grid grid-cols-2 gap-8 text-center">
            {[
              { icon: ShieldCheck, label: "Secure" },
              { icon: BarChart3, label: "Live Results" },
              { icon: Lock, label: "Encrypted" },
              { icon: Globe, label: "Accessible" }
            ].map((item, i) => (
              <div key={i}>
                <item.icon className="mx-auto text-blue-400" size={36} />
                <p className="text-gray-400 text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-16">
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { step: "01", title: "Authenticate", desc: "Secure identity verification" },
            { step: "02", title: "Vote", desc: "Encrypted blockchain voting" },
            { step: "03", title: "Verify", desc: "Transparent counting system" }
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h3 className="text-orange-400">{item.step}</h3>
              <h2 className="text-xl font-semibold mt-3">{item.title}</h2>
              <p className="text-gray-400 mt-3 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECURITY */}
      <section className="bg-white/5 py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold mb-6">
              Advanced Security Architecture
            </h2>
            <p className="text-gray-400">
              Blockchain ensures tamper-proof, encrypted, and transparent elections.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="bg-white/5 p-8 rounded-xl border border-white/10">
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>✔ Immutable Ledger</li>
              <li>✔ End-to-End Encryption</li>
              <li>✔ Fraud Prevention</li>
              <li>✔ Public Auditability</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.h2 {...fadeUp} className="text-3xl font-bold mb-10">
          Trusted & Compliant Infrastructure
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Election Commission Ready", desc: "Integration ready with Indian systems." },
            { title: "Blockchain Verified", desc: "Immutable public audit logs." },
            { title: "Data Privacy", desc: "Zero-knowledge identity protection." }
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-green-400 font-semibold">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-slate-900 py-24 border-y border-white/10 text-center">
        <motion.h2 {...fadeUp} className="text-3xl font-bold mb-12">
          Real-Time Platform Metrics
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-10">
          <div><CountUp end={1200000} />+<p className="text-gray-400">Votes</p></div>
          <div><CountUp end={99.99} decimals={2} />%<p className="text-gray-400">Uptime</p></div>
          <div><CountUp end={256} /><p className="text-gray-400">Encryption</p></div>
          <div><CountUp end={0} />%<p className="text-gray-400">Tampering</p></div>
        </div>
      </section>

      {/* ROLES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-16">
          Built For Everyone
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Voters", "Admins", "Government"].map((role, i) => (
            <motion.div key={i} {...fadeUp} className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h3 className="text-orange-400 font-semibold">{role}</h3>
              <p className="text-gray-400 text-sm mt-2">Powerful tools tailored for {role}.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-white/5 py-24 text-center border-y border-white/10">
        <motion.h2 {...fadeUp} className="text-3xl font-bold mb-12">
          Powered By Modern Tech
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4">
          {["Blockchain","Next.js","Node.js","MongoDB","Web3"].map((tech,i)=>(
            <span key={i} className="px-4 py-2 bg-black/40 rounded-full border border-white/10">{tech}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <motion.h2 {...fadeUp} className="text-3xl font-bold text-center mb-12">
          FAQ
        </motion.h2>

        <div className="space-y-6 text-gray-300">
          <div><h3 className="text-white">Is it secure?</h3><p>Yes, blockchain protected.</p></div>
          <div><h3 className="text-white">Can votes change?</h3><p>No, immutable.</p></div>
          <div><h3 className="text-white">Transparent?</h3><p>Fully auditable.</p></div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-green-500 py-16 text-center text-black">
        <h2 className="text-3xl font-bold">Join Digital India Voting</h2>
        {!user && (
          <Link href="/auth/register" className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-lg">
            Register Now
          </Link>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Votara • Built for India 🇮🇳
      </footer>

    </div>
  );
}