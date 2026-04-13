import { useLocation } from "react-router-dom";

const pageMeta: Record<string, { title: string; description?: string }> = {
  "/app":           { title: "Dashboard",  description: "Resumen de todas tus plataformas" },
  "/app/reports":   { title: "Reportes",   description: "Genera y descarga reportes en PDF" },
  "/app/settings":  { title: "Ajustes",    description: "Configura tus cuentas y preferencias" },
};

export const usePageMeta = () => {
  const { pathname } = useLocation();
  return pageMeta[pathname] ?? { title: "Vantage" };
};