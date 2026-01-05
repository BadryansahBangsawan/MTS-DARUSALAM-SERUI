"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowLeft, GraduationCap } from "lucide-react";
import { setAuthToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("Login page mounted");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!username || !password) {
      setError("Username dan password harus diisi");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting login with:", username);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (data.success) {
        console.log("✅ Login successful!");
        setSuccess(true);

        if (data.token) {
          setAuthToken(data.token);
        }

        setTimeout(() => {
          console.log("Redirecting to /admin");
          window.location.href = "/admin";
        }, 500);
      } else {
        console.error("❌ Login failed:", data.error);
        setError(data.error || "Login gagal");
      }
    } catch (err: any) {
      console.error("❌ Login error:", err);
      if (err.message && err.message.includes("Failed to fetch")) {
        setError("Gagal terhubung ke server. Pastikan dev server berjalan.");
      } else {
        setError("Terjadi kesalahan saat login. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-md w-full relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-green-600 mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-500">
              Masuk ke dashboard admin MTs Darussalam
            </p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 animate-pulse">
              Login berhasil! Mengalihkan...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Masukkan username"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Masukkan password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0-4.411-3.589-8-8-8-8s-8 3.589-8 8c0 2.34 1.025 4.441 2.656 5.891l-1.781-1.03c-.605-.349-1.089-.928-1.089-1.605 0-.592.356-1.107.87-1.36l1.891-1.092A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8c0 2.34-1.025 4.441-2.656 5.891l1.781 1.03c.605.349 1.089.928 1.089 1.605 0 .592-.356 1.107-.87 1.36l-1.891 1.092A7.962 7.962 0 014 12c0 4.411-3.589 8-8 8z"
                    ></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">MTs Darussalam © 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
