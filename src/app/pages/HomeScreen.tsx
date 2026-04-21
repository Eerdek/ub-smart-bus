import { useNavigate } from "react-router";
import { Search, Bus, MapPin, CreditCard, ChevronRight, Star, Bell, Navigation, Clock } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { EtaChip } from "../components/EtaChip";

const nearbyStops = [
  { id: "1", name: "Сүхбаатарын талбай", stopId: "SB-01", distance: "120м", routes: ["7", "11", "23"], nextBus: 2 },
  { id: "2", name: "Их Сургуулийн буудал", stopId: "IS-04", distance: "280м", routes: ["1", "5", "XO:112"], nextBus: 5 },
  { id: "3", name: "Их дэлгүүр", stopId: "ID-02", distance: "450м", routes: ["3", "9", "32"], nextBus: 8 },
];

const favoriteRoutes = [
  { id: "XO112", number: "XO:112", name: "Хонхор - Офицеруудын ордон", color: "#F47C20" },
  { id: "XO12", number: "XO:12", name: "Мал бордох - 5 шар", color: "#2563EB" },
  { id: "XO13", number: "XO:13", name: "Баруун 4 зам - 10 хороо", color: "#7C3AED" },
];

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col" style={{ minHeight: 844, background: "#F7F8FA" }}>
      {/* Status bar space */}
      <div style={{ height: 44, background: "#fff" }} />

      {/* Header */}
      <div
        className="px-4 pb-4"
        style={{
          background: "#fff",
          borderBottom: "1px solid #F1F3F6",
        }}
      >
        <div className="flex items-center justify-between pt-2 pb-3">
          <div>
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px" }}>Сайн байна уу 👋</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", lineHeight: "26px" }}>Таны ойролцоох автобус</div>
          </div>
          <button
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#FFF1E7", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
            }}
          >
            <Bell size={20} style={{ color: "#F47C20" }} />
            <span style={{
              position: "absolute", top: 6, right: 6,
              width: 8, height: 8, borderRadius: "50%",
              background: "#DC2626", border: "2px solid #fff"
            }} />
          </button>
        </div>

        {/* Location bar */}
        <div className="flex items-center gap-2 mb-3" style={{ background: "#F7F8FA", borderRadius: 10, padding: "8px 12px" }}>
          <Navigation size={15} style={{ color: "#F47C20", flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "#111827", flex: 1, fontWeight: 500 }}>Сүхбаатарын талбай, Улаанбаатар</span>
          <ChevronRight size={15} style={{ color: "#9CA3AF" }} />
        </div>

        {/* Search bar */}
        <button
          className="w-full flex items-center gap-3"
          onClick={() => navigate("/search-routes")}
          style={{
            height: 44,
            background: "#F7F8FA",
            border: "1.5px solid #E2E8F0",
            borderRadius: 12,
            padding: "0 14px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <Search size={18} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: "#9CA3AF" }}>Чиглэл, буудал, автобус № хайх</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Quick action cards */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <QuickAction
              icon={<Bus size={22} style={{ color: "#F47C20" }} />}
              title="Чиглэл хайх"
              desc="Маршрут & буудал"
              bg="#FFF1E7"
              onClick={() => navigate("/search-routes")}
            />
            <QuickAction
              icon={<MapPin size={22} style={{ color: "#2563EB" }} />}
              title="Буудал хайх"
              desc="Буудлын мэдээлэл"
              bg="#EAF2FF"
              onClick={() => navigate("/search-stops")}
            />
            <QuickAction
              icon={<MapPin size={22} style={{ color: "#16A34A" }} />}
              title="Газрын зураг"
              desc="Live автобус"
              bg="#EAF8EF"
              onClick={() => navigate("/map")}
            />
            <QuickAction
              icon={<CreditCard size={22} style={{ color: "#7C3AED" }} />}
              title="Төлбөр"
              desc="Тарифын мэдээлэл"
              bg="#F3EEFF"
              onClick={() => navigate("/fare")}
            />
          </div>
        </div>

        {/* Service alert */}
        <div className="px-4 pt-4">
          <div style={{ background: "#FFF7E8", borderRadius: 14, padding: "12px 14px", border: "1px solid #FDE68A", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#D97706" }}>Үйлчилгээний мэдэгдэл</div>
              <div style={{ fontSize: 12, color: "#92400E", marginTop: 2, lineHeight: "17px" }}>XO:112 чиглэл — өнөөдөр 18:00–19:30 цагт хойшлолттой байна.</div>
            </div>
          </div>
        </div>

        {/* Nearby Stops */}
        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Ойролцоох буудлууд</span>
            <button onClick={() => navigate("/search-stops")} style={{ background: "none", border: "none", cursor: "pointer", color: "#F47C20", fontSize: 13, fontWeight: 600 }}>Бүгдийг харах</button>
          </div>
          <div className="flex flex-col gap-3">
            {nearbyStops.map(stop => (
              <button
                key={stop.id}
                onClick={() => navigate(`/stop/${stop.id}`)}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "14px 16px",
                  border: "1px solid #F1F3F6",
                  cursor: "pointer",
                  textAlign: "left",
                  boxShadow: "0 2px 8px rgba(17,24,39,0.04)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FFF1E7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={20} style={{ color: "#F47C20" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{stop.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{stop.distance}</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                    <div className="flex gap-1">
                      {stop.routes.slice(0, 3).map(r => (
                        <span key={r} style={{ fontSize: 11, fontWeight: 600, background: "#F1F3F6", color: "#374151", borderRadius: 6, padding: "1px 6px" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <EtaChip minutes={stop.nextBus} />
              </button>
            ))}
          </div>
        </div>

        {/* Favorite Routes */}
        <div className="px-4 pt-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Дуртай чиглэлүүд</span>
            <button onClick={() => navigate("/favorites")} style={{ background: "none", border: "none", cursor: "pointer", color: "#F47C20", fontSize: 13, fontWeight: 600 }}>Бүгдийг харах</button>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6", boxShadow: "0 2px 8px rgba(17,24,39,0.04)" }}>
            {favoriteRoutes.map((route, i) => (
              <button
                key={route.id}
                onClick={() => navigate(`/route/${route.id}`)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: i < favoriteRoutes.length - 1 ? "1px solid #F1F3F6" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{
                  background: route.color + "18",
                  color: route.color,
                  fontSize: 12, fontWeight: 700,
                  borderRadius: 8, padding: "4px 8px",
                  flexShrink: 0,
                  minWidth: 64, textAlign: "center",
                }}>
                  {route.number}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: "#374151", lineHeight: "18px" }}>{route.name}</span>
                <div className="flex items-center gap-2">
                  <Star size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fare info banner */}
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate("/fare")}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #F47C20 0%, #DD6D17 100%)",
              borderRadius: 16,
              padding: "16px 20px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 8px 24px rgba(244,124,32,0.25)",
            }}
          >
            <CreditCard size={32} style={{ color: "#fff", flexShrink: 0 }} />
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Төлбөрийн мэдээлэл</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>Карт, бэлэн, хөнгөлөлтийн нөхцөл</div>
            </div>
            <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.8)" }} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function QuickAction({ icon, title, desc, bg, onClick }: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bg: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "14px",
        border: "1px solid #F1F3F6",
        cursor: "pointer",
        textAlign: "left",
        boxShadow: "0 2px 8px rgba(17,24,39,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: "20px" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: "17px", marginTop: 2 }}>{desc}</div>
      </div>
    </button>
  );
}
