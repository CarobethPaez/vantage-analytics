import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import type{ ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0e1a, #0d1425)",
      }}>
        <div style={{ textAlign: "center" }}>
          <svg width="126" height="28" viewBox="0 0 126 28" style={{ marginBottom: 16 }}>
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1D9E75"/>
                <stop offset="100%" stopColor="#4a6fff"/>
              </linearGradient>
            </defs>
            <rect x="0" y="2" width="24" height="24" rx="6" fill="#0d1a2e"/>
            <polyline points="4,20 9,14 15,16 21,6" fill="none" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="21" cy="6" r="2" fill="#4a6fff"/>
            <text x="30" y="13" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#e8eeff" dominantBaseline="middle">Vantage</text>
            <text x="30" y="23" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="400" fill="#3a4a7a" dominantBaseline="middle">analytics</text>
          </svg>
          <p style={{ color: "#4a5a8a", fontSize: 13 }}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};