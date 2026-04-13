import { useNavigate } from "react-router-dom";
import { motion, easeOut } from "framer-motion";

const LogoB = ({ size = 28 }: { size?: number }) => (
  <svg width={size * 4.5} height={size} viewBox="0 0 126 28">
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
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: easeOut },
});

const features = [
  { icon: "📊", title: "Dashboard unificado",      desc: "YouTube y TikTok en un solo lugar. Sin cambiar de pestaña."         },
  { icon: "📈", title: "Gráficas en tiempo real",  desc: "Visualiza vistas, likes y engagement con gráficas interactivas."    },
  { icon: "📅", title: "Reportes automáticos",     desc: "Recibe un PDF semanal con el resumen de tu rendimiento."            },
  { icon: "🔔", title: "Alertas inteligentes",     desc: "Aviso cuando una métrica sube o baja más de lo esperado."           },
  { icon: "🏷️", title: "White-label para agencias",desc: "Reportes con tu logo para compartir con clientes."                 },
  { icon: "🔌", title: "Más plataformas pronto",   desc: "Instagram y X en camino. Conecta todas tus redes."                 },
];

const plans = [
  {
    name: "Gratis", price: "$0", period: "para siempre", featured: false,
    features: ["2 plataformas", "30 días de historial", "Dashboard básico"],
    cta: "Empezar gratis",
  },
  {
    name: "Pro", price: "$12", period: "/mes", featured: true,
    features: ["4 plataformas", "Historial ilimitado", "Reportes PDF", "Alertas inteligentes"],
    cta: "Empezar Pro",
  },
  {
    name: "Agencia", price: "$49", period: "/mes", featured: false,
    features: ["Clientes ilimitados", "White-label", "Todo lo de Pro"],
    cta: "Contactar",
  },
];

export const LandingPage = () => {
  const navigate = useNavigate();

  const navStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 40px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "0.5px solid rgba(255,255,255,0.07)",
  };

  const btnPrimary: React.CSSProperties = {
    background: "linear-gradient(135deg, #4a6fff, #6a3fff)",
    color: "white", border: "none",
    padding: "10px 24px", borderRadius: 8,
    fontSize: 13, fontWeight: 500,
    cursor: "pointer",
  };

  const btnGhost: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    color: "#a0b4ff",
    border: "0.5px solid rgba(99,130,255,0.3)",
    padding: "10px 24px", borderRadius: 8,
    fontSize: 13, cursor: "pointer",
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", overflowX: "hidden" }}>

      {/* Navbar */}
      <nav style={navStyle}>
        <LogoB size={28} />
        <div style={{ display: "flex", gap: 28 }}>
          {["Features", "Precios", "Blog"].map((l) => (
            <span key={l} style={{ fontSize: 13, color: "#4a5a8a", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button style={btnPrimary} onClick={() => navigate("/app")}>
          Empezar gratis
        </button>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #0d1425 60%, #0a1230 100%)", padding: "72px 40px 80px", textAlign: "center" }}>
        <motion.div {...fadeUp(0)}>
          <span style={{ display: "inline-block", background: "rgba(99,130,255,0.15)", color: "#a0b4ff", border: "0.5px solid rgba(99,130,255,0.3)", fontSize: 12, padding: "4px 14px", borderRadius: 20, marginBottom: 20 }}>
            Nuevo — Soporte para TikTok Analytics
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} style={{ fontSize: 42, fontWeight: 700, color: "#e8eeff", lineHeight: 1.25, marginBottom: 16 }}>
          Todas tus métricas,<br />
          <span style={{ color: "#6382ff" }}>un solo lugar</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} style={{ fontSize: 15, color: "#4a5a8a", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Conecta YouTube y TikTok y visualiza tu crecimiento en tiempo real. Reportes automáticos, alertas inteligentes y más.
        </motion.p>

        <motion.div {...fadeUp(0.3)} style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 48 }}>
          <button style={btnPrimary} onClick={() => navigate("/app")}>Empezar gratis</button>
          <button style={btnGhost}   onClick={() => navigate("/app")}>Ver demo</button>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            maxWidth: 720, margin: "0 auto",
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(99,130,255,0.2)",
            borderRadius: 12, padding: 16,
          }}
        >
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {["#f87171","#fbbf24","#4ade80"].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
            {[["Vistas","727K"],["Seguidores","249K"],["Engagement","5.08%"],["Likes","18.4K"]].map(([l, v]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(99,130,255,0.15)", borderRadius: 8, padding: 10 }}>
                <p style={{ fontSize: 10, color: "#4a5a8a", marginBottom: 4 }}>{l}</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#e8eeff" }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(99,130,255,0.1)", borderRadius: 8, height: 64, display: "flex", alignItems: "flex-end", gap: 3, padding: 8 }}>
            {[40,55,45,70,60,80,75,65,85,72,90,78,82,69,88].map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${Math.round(v/90*100)}%`, background: i % 2 === 0 ? "#6382ff" : "#4ade80", opacity: 0.8, borderRadius: "2px 2px 0 0" }} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div style={{ background: "#f9fafb", padding: "72px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#6382ff", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Features</p>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: "#111827", textAlign: "center", marginBottom: 8 }}>Todo lo que necesitas para crecer</h2>
          <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 40 }}>Sin configuración compleja. Conecta tus cuentas y empieza en minutos.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              style={{ background: "white", border: "0.5px solid #f3f4f6", borderRadius: 10, padding: 20 }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#eff2ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 12 }}>
                {icon}
              </div>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 6 }}>{title}</p>
              <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ background: "white", padding: "72px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#6382ff", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Precios</p>
          <h2 style={{ fontSize: 28, fontWeight: 600, color: "#111827", textAlign: "center", marginBottom: 8 }}>Simple y transparente</h2>
          <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", marginBottom: 40 }}>Sin sorpresas. Cancela cuando quieras.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 700, margin: "0 auto" }}>
          {plans.map(({ name, price, period, featured, features: feats, cta }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              style={{
                borderRadius: 12, padding: 24,
                border: featured ? "2px solid rgba(99,130,255,0.4)" : "0.5px solid #f3f4f6",
                background: featured ? "linear-gradient(135deg, #0a0e1a, #0d1425)" : "#f9fafb",
              }}
            >
              {featured && (
                <div style={{ background: "rgba(99,130,255,0.2)", color: "#a0b4ff", fontSize: 10, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>
                  Más popular
                </div>
              )}
              <p style={{ fontSize: 13, fontWeight: 500, color: featured ? "#a0b4ff" : "#374151", marginBottom: 6 }}>{name}</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: featured ? "#e8eeff" : "#111827" }}>
                {price}<span style={{ fontSize: 13, fontWeight: 400, color: featured ? "#4a5a8a" : "#9ca3af" }}>{period}</span>
              </p>
              <div style={{ margin: "16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                {feats.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: featured ? "#c0ccee" : "#4b5563" }}>
                    <span style={{ color: "#4ade80", fontSize: 11 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/app")}
                style={{
                  width: "100%", fontSize: 13, padding: "9px 0", borderRadius: 8, cursor: "pointer", border: "none",
                  background: featured ? "linear-gradient(135deg, #4a6fff, #6a3fff)" : "#f3f4f6",
                  color: featured ? "white" : "#374151",
                }}
              >
                {cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div style={{ background: "linear-gradient(135deg, #0a0e1a, #0d1425)", padding: "72px 40px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#e8eeff", marginBottom: 12 }}>Empieza a crecer hoy</h2>
          <p style={{ fontSize: 15, color: "#4a5a8a", marginBottom: 28 }}>Gratis para siempre. Sin tarjeta de crédito.</p>
          <button style={btnPrimary} onClick={() => navigate("/app")}>Crear cuenta gratis</button>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ background: "#0a0e1a", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <LogoB size={22} />
        <p style={{ fontSize: 12, color: "#3a4a7a" }}>© 2026 Vantage. Todos los derechos reservados.</p>
      </div>

    </div>
  );
};