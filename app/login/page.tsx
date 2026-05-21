"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";

const DEMO_USERS = [
  { label: "Admin", email: "admin@college.edu", role: "Admin", color: "bg-purple-100 text-purple-700" },
  { label: "Student", email: "22cs3046@rgipt.ac.in", role: "Student", color: "bg-blue-100 text-blue-700" },
  { label: "Alumni", email: "john@example.com", role: "Alumni", color: "bg-green-100 text-green-700" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <GraduationCap className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Alumni Portal</h1>
          <p className="text-blue-300 text-sm">RGIPT Centralized Alumni Management System</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-md text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-white">Sign In</CardTitle>
            <CardDescription className="text-blue-200">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-100">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-blue-400"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...</>
                ) : "Sign In"}
              </Button>
            </form>

            {/* Demo Login */}
            <div className="mt-6">
              <p className="text-xs text-center text-blue-300 mb-3">— Quick demo access —</p>
              <div className="grid grid-cols-3 gap-2">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => fillDemo(u.email)}
                    className="text-center py-2 px-1 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.color}`}>
                      {u.label}
                    </span>
                    <p className="text-[10px] text-blue-300 mt-1 truncate">{u.email}</p>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-blue-400 text-center mt-2">
                All demo accounts use password: <span className="font-mono font-bold text-blue-200">password123</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
