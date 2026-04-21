import { useNavigate } from "react-router";
import { Bus, Navigation } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100%",
        height: 844,
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top orange wave background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          background: "linear-gradient(160deg, #F47C20 0%, #DD6D17 60%, #c75a10 100%)",
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          zIndex: 0,
        }}
      />

      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 40, right: 20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)", zIndex: 1 }} />
      <div style={{ position: "absolute", top: 160, left: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)", zIndex: 1 }} />

      {/* Bus icon pattern */}
      <div className="flex flex-wrap gap-8 absolute" style={{ top: 20, left: 20, right: 20, zIndex: 1, opacity: 0.12 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Bus key={i} size={20} color="#fff" />
        ))}
      </div>

      {/* Logo area */}
      <div className="flex flex-col items-center" style={{ marginTop: 120, zIndex: 2, position: "relative" }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            borderRadius: 24,
            background: "#fff",
            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
            marginBottom: 16,
          }}
        >
          <Bus size={42} style={{ color: "#F47C20" }} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: "34px", margin: 0 }}>UB Smart Bus</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 8, textAlign: "center", padding: "0 32px", lineHeight: "20px" }}>
          Хот дотор зорчих хамгийн хялбар арга
        </p>
      </div>

      {/* Bottom content */}
      <div className="flex flex-col" style={{ flex: 1, position: "relative", zIndex: 2, padding: "40px 24px 48px" }}>
        {/* Feature items */}
        <div className="flex flex-col gap-4" style={{ marginTop: "auto" }}>
          <FeatureItem icon="🚌" title="Бодит цагийн мэдээлэл" desc="Автобусны ирэх хугацааг мэдэж аваарай" />
          <FeatureItem icon="📍" title="Ойролцоох буудал" desc="Таны байршилд хамгийн ойр буудлыг олоорой" />
          <FeatureItem icon="🗺️" title="Чиглэлийн газрын зураг" desc="Бүх чиглэлийг газрын зураг дээр харах" />
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ fontSize: 13, color: "#9CA3AF", textAlign: "center", marginBottom: 20, lineHeight: "18px" }}>
            Байршлаа ашиглан ойролцоох буудлыг харах боломжтой
          </p>
          <button
            onClick={() => navigate("/home")}
            className="w-full flex items-center justify-center gap-2"
            style={{
              height: 52,
              background: "#F47C20",
              border: "none",
              borderRadius: 999,
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(244,124,32,0.35)",
            }}
          >
            <Navigation size={18} />
            Эхлэх
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full"
            style={{
              marginTop: 12,
              height: 48,
              background: "transparent",
              border: "1.5px solid #E2E8F0",
              borderRadius: 999,
              color: "#6B7280",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Байршилгүйгээр үргэлжлүүлэх
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "#FFF1E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", lineHeight: "20px" }}>{title}</div>
        <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px", marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}