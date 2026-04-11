import { useLocation } from "react-router-dom";

const pageMeta: Record<string, { title: string; description?: string }> = {
  "/":         { title: "Dashboard",  description: "Resumen de todas tus plataformas" },
  "/reports":  { title: "Reportes",   description: "Genera y descarga reportes en PDF" },
  "/settings": { title: "Ajustes",    description: "Configura tus cuentas y preferencias" },
};

export const usePageMeta = () => {
  const { pathname } = useLocation();
  return pageMeta[pathname] ?? { title: "Vantage" };
};