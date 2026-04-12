import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage }  from "@/pages/DashboardPage";
import { ReportsPage }    from "@/pages/ReportsPage";
import { SettingsPage }   from "@/pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,      element: <DashboardPage /> },
      { path: "reports",  element: <ReportsPage />   },
      { path: "settings", element: <SettingsPage />  },
    ],
  },
]);