"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { colorSchemes } from "@/lib/theme";
import { getRolePrefix } from "@/utils/role-route";
import { showToast } from "@/lib/toast";

export default function LoginPage() {
  // ----------- LOGIN LOGIC -----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { login, user } = useAuth();
  const { colorScheme, isDark } = useTheme();
  const colors = colorSchemes[colorScheme];
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      const rolePrefix = getRolePrefix(user.role);
      router.push(rolePrefix ? `/${rolePrefix}/dashboard` : "/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
      showToast.success("Login successful!");
    } catch {
      setError("Invalid email or password");
      showToast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95"></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            animation: "float 8s ease-in-out infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          style={{
            animation: "float 7s ease-in-out infinite",
            animationDelay: "4s",
          }}
        ></div>
      </div>

      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10">
        <div
          className={`flex flex-col justify-center items-start px-16 text-white transition-all duration-1000 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
        >
          {/* Brand Header */}
          <div className="mb-12">
            <div
              className="flex items-center gap-3 mb-3 transition-all duration-700 delay-200"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.8)",
              }}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold tracking-tight">DMS</span>
            </div>
            <p
              className="text-sm text-slate-300 font-medium tracking-wider uppercase transition-all duration-700 delay-300"
              style={{
                opacity: mounted ? 1 : 0,
              }}
            >
              Document Management System
            </p>
          </div>

          {/* Hero Content */}
          <div
            className="max-w-md transition-all duration-1000 delay-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <p className="text-sm text-blue-400 font-semibold tracking-wider uppercase mb-3">
              Empower Your Digital Workspace
            </p>
            <h1 className="text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Smarter. Faster. Secure.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Experience an enterprise-grade platform designed to centralize,
              protect, and streamline your document lifecycle — from secure
              storage to intelligent collaboration.
            </p>
          </div>

          {/* Key Highlights */}
          <div
            className="mt-12 grid grid-cols-3 gap-6 transition-all duration-1000 delay-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">99.99%</div>
              <div className="text-xs text-slate-400 mt-1">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">256-bit</div>
              <div className="text-xs text-slate-400 mt-1">
                End-to-End Encryption
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">AI-Driven</div>
              <div className="text-xs text-slate-400 mt-1">
                Smart Automation
              </div>
            </div>
          </div>

          {/* Extra CTA or Tagline (Optional) */}
          <div
            className="mt-10 transition-all duration-1000 delay-900"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <p className="text-sm text-slate-400 italic">
              “Redefining how teams manage knowledge in the digital era.”
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 relative z-10">
        <div
          className={`w-full max-w-md transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">DMS</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-10 hover:shadow-blue-500/20 transition-all duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign in to your account
              </h2>
              <p className="text-sm text-gray-600">
                Enter your credentials to access the dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Username Input */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none hover:border-blue-300"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none hover:border-blue-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${colors.primary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className="text-center">
                <a
                  href="/register"
                  className={`text-sm ${colors.accent} hover:underline transition-all duration-300`}
                >
                  Don&#39;t have an account? Sign up
                </a>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-white/70 mt-6">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
