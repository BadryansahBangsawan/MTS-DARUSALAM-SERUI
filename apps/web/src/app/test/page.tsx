"use client";

import { useState } from "react";
import { LogOut, Plus, ArrowRight } from "lucide-react";

export default function TestPage() {
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [token, setToken] = useState("");

  const testFetch = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      setApiStatus({ success: true, data });
    } catch (error) {
      setApiStatus({ success: false, error: String(error) });
    }
  };

  const testLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "admin@mtsdarussalam.sch.id",
          password: "admin123"
        }),
        credentials: "include"
      });
      const data = await response.json();
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("test_token", data.token);
        alert("Login success! Token: " + data.token.substring(0, 50) + "...");
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error: any) {
      alert("Login error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Test Page</h1>
        <p className="text-gray-600">Halaman untuk test API dan fetch</p>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test API Status</h2>
          <button
            onClick={testFetch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Cek API /auth/me
          </button>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <pre className="text-sm">
              {apiStatus ? JSON.stringify(apiStatus, null, 2) : "Belum dijalankan"}
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Test Login</h2>
          <button
            onClick={testLogin}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Login dengan Default Credentials
          </button>
          
          {token && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-semibold mb-2">Token berhasil didapat:</p>
              <p className="text-xs text-gray-600 font-mono break-all">
                {token}
              </p>
              <p className="mt-2 text-xs text-gray-600">
                Token disimpan di localStorage dengan key: "test_token"
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/login"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>Ke Login Page</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="/admin"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>Ke Admin Dashboard</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="/"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>Ke Beranda</span>
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
