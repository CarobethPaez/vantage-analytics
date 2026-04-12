import { useState } from "react";

interface ProfileForm {
  name: string;
  email: string;
  plan: string;
}

interface NotifForm {
  emailReports: boolean;
  weeklyDigest: boolean;
  alertsEnabled: boolean;
}

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "0.5px solid rgba(99,130,255,0.2)",
  borderRadius: "10px",
  padding: "20px",
};

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "0.5px solid rgba(99,130,255,0.25)",
  borderRadius: "8px",
  color: "var(--text-primary)",
  fontSize: "13px",
  padding: "8px 12px",
  width: "100%",
  outline: "none",
};

const labelStyle = {
  color: "var(--text-muted)",
  fontSize: "11px",
  marginBottom: "6px",
  display: "block",
};

const sectionTitle = {
  color: "var(--text-secondary)",
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "16px",
  paddingBottom: "10px",
  borderBottom: "0.5px solid rgba(99,130,255,0.15)",
};

export const SettingsPage = () => {
  const [profile, setProfile] = useState<ProfileForm>({
    name:  "Tu nombre",
    email: "tu@email.com",
    plan:  "Gratuito",
  });

  const [notifs, setNotifs] = useState<NotifForm>({
    emailReports:  true,
    weeklyDigest:  false,
    alertsEnabled: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-4 max-w-2xl">

      {/* Perfil */}
      <div style={card}>
        <p style={sectionTitle}>Perfil de cuenta</p>
        <div className="space-y-4">
          <div>
            <label style={labelStyle}>Nombre</label>
            <input
              style={inputStyle}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label style={labelStyle}>Plan actual</label>
            <div style={{
              ...inputStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "default",
            }}>
              <span>{profile.plan}</span>
              <span style={{
                background: "rgba(99,130,255,0.15)",
                color: "#a0b4ff",
                border: "0.5px solid rgba(99,130,255,0.3)",
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 20,
              }}>
                Actualizar plan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plataformas conectadas */}
      <div style={card}>
        <p style={sectionTitle}>Plataformas conectadas</p>
        <div className="space-y-3">
          {[
            { name: "YouTube",   connected: true,  color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)" },
            { name: "TikTok",    connected: true,  color: "#4ade80", bg: "rgba(74,222,128,0.15)",  border: "rgba(74,222,128,0.3)"  },
            { name: "Instagram", connected: false, color: "#a0b4ff", bg: "rgba(99,130,255,0.15)",  border: "rgba(99,130,255,0.3)"  },
            { name: "X",         connected: false, color: "#a0b4ff", bg: "rgba(99,130,255,0.15)",  border: "rgba(99,130,255,0.3)"  },
          ].map(({ name, connected, color, bg, border }) => (
            <div key={name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: connected ? color : "rgba(99,130,255,0.2)",
                }} />
                <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{name}</span>
              </div>
              <button style={{
                background: bg,
                color,
                border: `0.5px solid ${border}`,
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                cursor: "pointer",
              }}>
                {connected ? "Conectado" : "Conectar"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notificaciones */}
      <div style={card}>
        <p style={sectionTitle}>Notificaciones</p>
        <div className="space-y-4">
          {[
            { key: "emailReports",  label: "Reportes por email",     desc: "Recibe un reporte PDF cada semana"         },
            { key: "weeklyDigest",  label: "Resumen semanal",         desc: "Resumen de métricas cada lunes"            },
            { key: "alertsEnabled", label: "Alertas de rendimiento",  desc: "Aviso cuando una métrica cambia +20%"      },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>{label}</p>
                <p style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>{desc}</p>
              </div>
              <button
                onClick={() => setNotifs({ ...notifs, [key]: !notifs[key as keyof NotifForm] })}
                style={{
                  width: 36,
                  height: 20,
                  borderRadius: 10,
                  background: notifs[key as keyof NotifForm]
                    ? "linear-gradient(135deg, #4a6fff, #6a3fff)"
                    : "rgba(255,255,255,0.1)",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <div style={{
                  position: "absolute",
                  top: 2,
                  left: notifs[key as keyof NotifForm] ? 18 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "white",
                  transition: "left 0.2s",
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Botón guardar */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          style={{
            background: "linear-gradient(135deg, #4a6fff, #6a3fff)",
            border: "none",
            color: "white",
            fontSize: 13,
            padding: "9px 24px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Guardar cambios
        </button>
        {saved && (
          <span style={{ color: "#4ade80", fontSize: 12 }}>
            ✓ Cambios guardados
          </span>
        )}
      </div>

    </div>
  );
};