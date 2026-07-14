type Props = { onBack: () => void };

const specs = [
  { label: "Статус", value: "Страница в подготовке" },
  { label: "Модель", value: "LOVOL FR215F" },
  { label: "Категория", value: "Гидравлический экскаватор" },
];

export default function FR215F({ onBack }: Props) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top, rgba(18, 89, 128, 0.35), transparent 30%), linear-gradient(180deg, #081018 0%, #101c28 100%)",
        color: "#f4f7fb",
      }}
    >
      <div
        style={{
          width: "min(720px, 100%)",
          borderRadius: "28px",
          padding: "32px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            marginBottom: "24px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            padding: "12px 18px",
            background: "rgba(0,0,0,0.26)",
            color: "inherit",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ← Назад
        </button>

        <p style={{ margin: 0, color: "#7be8ff", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.22em" }}>
          TURKUAZ MACHINERY CENTRAL ASIA
        </p>
        <h1 style={{ margin: "12px 0 10px", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", lineHeight: 0.95 }}>
          LOVOL FR215F
        </h1>
        <p style={{ margin: 0, maxWidth: "46ch", color: "rgba(244,247,251,0.82)", lineHeight: 1.7 }}>
          Страница модели ещё наполняется контентом. Навигация и маршрут уже доступны, поэтому раздел больше не ломает сборку и готов к дальнейшему наполнению.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginTop: "28px",
          }}
        >
          {specs.map((spec) => (
            <article
              key={spec.label}
              style={{
                padding: "18px",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ fontSize: "1.05rem", fontWeight: 700 }}>{spec.value}</div>
              <div style={{ marginTop: "6px", color: "rgba(244,247,251,0.68)" }}>{spec.label}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}