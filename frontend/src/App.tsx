import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import ErrorBoundary from "@/components/shared/error-boundary";
import PageLoader from "@/components/shared/page-loader";
import { ManagerRoutes, ProtectedRoutes } from "@/routes";

const Landing = lazy(() => import("@/pages/public/home"));
const Login = lazy(() => import("@/pages/auth/login"));
const Register = lazy(() => import("@/pages/auth/register"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));
const ResetPassword = lazy(() => import("@/pages/auth/reset-password"));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Authenticated student routes */}
          {ProtectedRoutes()}

          {/* Manager / Admin routes */}
          {ManagerRoutes()}

          {/* Unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
