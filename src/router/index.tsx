import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";

const ReportsPage  = () => <div className="text-gray-400 text-sm">Reportes próximamente</div>;
const SettingsPage = () => <div className="text-gray-400 text-sm">Ajustes próximamente</div>;

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