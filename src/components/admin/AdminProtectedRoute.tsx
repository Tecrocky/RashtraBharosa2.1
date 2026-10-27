import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAdminAuth, AdminRole } from "@/context/AdminAuthContext";
import { ShieldAlert, ArrowLeft, RefreshCw } from "lucide-react";
import logo from "@/assets/logo.png";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AdminRole[];
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, profile, loading, hasRole } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] text-neutral-900 flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-3xl bg-white border border-neutral-200 flex items-center justify-center mb-6 shadow-sm animate-pulse">
          <img src={logo} alt="Rashtra Bharosa Group" className="h-10 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2.5 text-neutral-900 text-xs font-bold tracking-widest uppercase mb-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-neutral-900" />
          <span>Authenticating Session</span>
        </div>
        <p className="text-[11px] text-neutral-400 font-mono tracking-wider">
          Verifying security certificates & cryptographic tokens...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
            <ShieldAlert className="w-7 h-7 text-neutral-900" />
          </div>
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-mono uppercase tracking-widest inline-block font-bold">
            Access Restricted (403)
          </span>
          <h1 className="text-xl font-serif font-bold text-neutral-900">
            Unauthorized Access
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed">
            You do not have permission to access this section. Your account is assigned under{" "}
            <strong className="text-neutral-900 font-bold">[{profile?.role || "Restricted Role"}]</strong>.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
