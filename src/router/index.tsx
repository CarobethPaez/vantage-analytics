import { createBrowserRouter } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { AppLayout }     from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ReportsPage }   from "@/pages/ReportsPage";
import { SettingsPage }  from "@/pages/SettingsPage";
import { LandingPage }   from "@/pages/LandingPage";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0a0e1a, #0d1425)",
  }}>
    {children}
  </div>
);

export const router = createBrowserRouter([
  { path: "/",        element: <LandingPage /> },
  { path: "/sign-in", element: <AuthLayout><SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/app" /></AuthLayout> },
  { path: "/sign-up", element: <AuthLayout><SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/app" /></AuthLayout> },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true,      element: <DashboardPage /> },
      { path: "reports",  element: <ReportsPage />   },
      { path: "settings", element: <SettingsPage />  },
    ],
  },
]);