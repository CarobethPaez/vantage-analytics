import { createBrowserRouter } from "react-router-dom";
import { AppLayout }    from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { ReportsPage }   from "@/pages/ReportsPage";
import { SettingsPage }  from "@/pages/SettingsPage";
import { LandingPage }   from "@/pages/LandingPage"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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

