export const SkeletonCard = () => (
  <div
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "0.5px solid rgba(99,130,255,0.2)",
      borderRadius: 10,
      padding: 14,
      overflow: "hidden",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[60, 100, 40].map((w, i) => (
        <div
          key={i}
          style={{
            height: i === 1 ? 28 : 12,
            width: `${w}%`,
            borderRadius: 6,
            background: "rgba(99,130,255,0.08)",
            animation: "skeleton-pulse 1.5s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  </div>
);