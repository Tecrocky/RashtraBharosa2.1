import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
  KeyRound,
  Shield,
} from "lucide-react";
import logo from "@/assets/logo.png";

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, resetPassword, loading: authLoading } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const from = (location.state as any)?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (user && !authLoading) {
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your email or login ID.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        setSuccessMessage("Authentication verified. Redirecting to Dashboard...");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 500);
      } else {
        setErrorMessage(
          result.error || "Invalid login credentials. Please check your email/login ID and password."
        );
      }
    } catch (err) {
      setErrorMessage("An unexpected authentication error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);

    if (!resetEmail.trim()) {
      setResetMessage({ text: "Please enter your registered administrator email.", isError: true });
      return;
    }

    setResetSubmitting(true);
    try {
      const res = await resetPassword(resetEmail);
      if (res.success) {
        setResetMessage({
          text: "Password reset instructions have been dispatched to your email.",
          isError: false,
        });
        setTimeout(() => {
          setShowForgotModal(false);
          setResetEmail("");
          setResetMessage(null);
        }, 3000);
      } else {
        setResetMessage({
          text: res.error || "Unable to dispatch reset link. Please contact IT Systems Administrator.",
          isError: true,
        });
      }
    } catch (e) {
      setResetMessage({
        text: "System could not process your request at this time.",
        isError: true,
      });
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-neutral-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top minimal header bar */}
      <header className="relative z-10 w-full px-6 sm:px-12 py-5 flex items-center justify-between border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
        >
          <span>←</span> Back to Public Portal
        </Link>
      </header>

      {/* Main Login Card Section */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card Container in Liquid Class */}
          <div className="bg-white border border-neutral-200/80 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] p-8 sm:p-10 relative">
            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60 shadow-inner mb-4">
                <img
                  src={logo}
                  alt="Rashtra Bharosa Group"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-1">
                Rashtra Bharosa Group
              </p>
              <h1 className="text-2xl font-serif font-bold text-black tracking-tight">
                RashBhar Admin
              </h1>
              <p className="text-xs text-neutral-500 mt-1 font-sans">
                Central Management & Directorate
              </p>
            </div>

            {/* Error Message Notification */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-start gap-3 text-neutral-800 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-neutral-800 flex-shrink-0 mt-0.5" />
                <div className="flex-grow font-medium leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Success Message Notification */}
            {successMessage && (
              <div className="mb-6 p-3.5 rounded-2xl bg-neutral-900 text-white flex items-start gap-3 text-xs animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex-grow font-medium leading-relaxed">{successMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Login ID / Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                  Login ID / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or login ID"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-11 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Session & Forgot Password Row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 hover:text-black">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-0"
                  />
                  <span>Remember session</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email || "");
                    setResetMessage(null);
                    setShowForgotModal(true);
                  }}
                  className="text-neutral-700 hover:text-black font-semibold hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button in Pure Black Liquid Style */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>LOGIN TO DASHBOARD</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>

            {/* Micro security footer */}
            <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
                <span>Restricted Management Portal • Authorized Personnel Only</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-neutral-300 rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">Reset Admin Password</h3>
                <p className="text-xs text-neutral-500">Verify your registered administrator email</p>
              </div>
            </div>

            {resetMessage && (
              <div
                className={`mb-4 p-3 rounded-2xl text-xs flex items-start gap-2.5 ${
                  resetMessage.isError
                    ? "bg-neutral-100 border border-neutral-300 text-neutral-900"
                    : "bg-neutral-900 text-white"
                }`}
              >
                {resetMessage.isError ? (
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-neutral-800" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                )}
                <div className="font-medium">{resetMessage.text}</div>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Administrator Email
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@rashtrabharosagroup.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="px-5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50 flex items-center gap-1.5"
                >
                  {resetSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="relative z-10 w-full px-6 py-5 text-center border-t border-neutral-200/80 text-[11px] text-neutral-400 font-mono">
        © 2026 Rashtra Bharosa Group Limited. All Administrative Rights Reserved.
      </footer>
    </div>
  );
};

export default AdminLogin;
