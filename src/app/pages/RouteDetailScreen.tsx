import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Star, MapPin, Clock, Users, ChevronRight, Bus } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { EtaChip } from "../components/EtaChip";

const routeData: Record<string, {
  number: string;
  name: string;
  color: string;
  forward: Stop[];
  backward: Stop[];
  buses: LiveBus[];
}> = {
  XO112: {
    number: "XO:112",
    name: "Хонхор - Офицеруудын ордон",
    color: "#F47C20",
    buses: [
      { id: "B1", label: "№ 1432", eta: 2, occupancy: "low" },
      { id: "B2", label: "№ 2241", eta: 9, occupancy: "medium" },
      { id: "B3", label: "№ 3308", eta: 15, occupancy: "full" },
    ],
    forward: [
      { id: "s1", name: "Хонхор", passed: true, time: "8:12" },
      { id: "s2", name: "Сансар дэлгүүр", passed: true, time: "8:17" },
      { id: "s3", name: "Наадмын талбай", passed: true, time: "8:22" },
      { id: "s4", name: "Нийслэлийн эмнэлэг", current: true, time: "8:28" },
      { id: "s5", name: "Сүхбаатарын талбай", time: "8:33" },
      { id: "s6", name: "Их дэлгүүр", time: "8:38" },
      { id: "s7", name: "Улаанбаатар зочид буудал", time: "8:43" },
      { id: "s8", name: "Офицеруудын ордон", time: "8:50" },
    ],
    backward: [
      { id: "b1", name: "Офицеруудын ордон", passed: false, time: "9:00" },
      { id: "b2", name: "Улаанбаатар зочид буудал", time: "9:07" },
      { id: "b3", name: "Их дэлгүүр", time: "9:12" },
      { id: "b4", name: "Сүхбаатарын талбай", time: "9:17" },
      { id: "b5", name: "Нийслэлийн эмнэлэг", time: "9:22" },
      { id: "b6", name: "Наадмын талбай", time: "9:27" },
      { id: "b7", name: "Сансар дэлгүүр", time: "9:32" },
      { id: "b8", name: "Хонхор", time: "9:38" },
    ],
  },
  XO12: {
    number: "XO:12",
    name: "Мал бордох - 5 шар",
    color: "#2563EB",
    buses: [
      { id: "B1", label: "№ 5612", eta: 5, occupancy: "medium" },
      { id: "B2", label: "№ 7723", eta: 11, occupancy: "low" },
    ],
    forward: [
      { id: "s1", name: "Мал бордох", passed: true, time: "7:45" },
      { id: "s2", name: "Амгалан", passed: true, time: "7:52" },
      { id: "s3", name: "Баянзүрх дүүрэг", current: true, time: "7:59" },
      { id: "s4", name: "Их дэлгүүр", time: "8:07" },
      { id: "s5", name: "Нийслэлийн шүүх", time: "8:13" },
      { id: "s6", name: "5 шар", time: "8:20" },
    ],
    backward: [
      { id: "b1", name: "5 шар", time: "9:00" },
      { id: "b2", name: "Нийслэлийн шүүх", time: "9:07" },
      { id: "b3", name: "Их дэлгүүр", time: "9:13" },
      { id: "b4", name: "Баянзүрх дүүрэг", time: "9:21" },
      { id: "b5", name: "Амгалан", time: "9:28" },
      { id: "b6", name: "Мал бордох", time: "9:35" },
    ],
  },
};

type Stop = { id: string; name: string; passed?: boolean; current?: boolean; time: string };
type LiveBus = { id: string; label: string; eta: number; occupancy: string };

const defaultRoute = {
  number: "XO:13",
  name: "Баруун 4 зам - 10 хороо",
  color: "#7C3AED",
  buses: [{ id: "B1", label: "№ 9901", eta: 3, occupancy: "low" }],
  forward: [
    { id: "s1", name: "Баруун 4 зам", passed: true, time: "8:00" },
    { id: "s2", name: "Хан-Уул дүүрэг", current: true, time: "8:08" },
    { id: "s3", name: "Зайсан", time: "8:16" },
    { id: "s4", name: "10 хороо", time: "8:24" },
  ],
  backward: [
    { id: "b1", name: "10 хороо", time: "9:00" },
    { id: "b2", name: "Зайсан", time: "9:08" },
    { id: "b3", name: "Хан-Уул дүүрэг", time: "9:16" },
    { id: "b4", name: "Баруун 4 зам", time: "9:24" },
  ],
};

const occupancyColors: Record<string, { bg: string; color: string; label: string }> = {
  low: { bg: "#EAF8EF", color: "#16A34A", label: "" },
  medium: { bg: "#FFF7E8", color: "#D97706", label: "" },
  full: { bg: "#FDECEC", color: "#DC2626", label: "" },
};

export function RouteDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const route = routeData[id || ""] || defaultRoute;
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [fav, setFav] = useState(false);
  const [selectedBus, setSelectedBus] = useState(route.buses[0]?.id);

  const stops = direction === "forward" ? route.forward : route.backward;

  return (
    <div className="flex flex-col" style={{ minHeight: 844, background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #F1F3F6" }}>
        <AppBar
          title={route.number}
          showBack
          rightContent={
            <button
              onClick={() => setFav(!fav)}
              style={{ width: 40, height: 40, borderRadius: "50%", background: fav ? "#FFF7E0" : "#F7F8FA", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Star size={20} style={{ color: fav ? "#F59E0B" : "#9CA3AF", fill: fav ? "#F59E0B" : "none" }} />
            </button>
          }
        />

        {/* Route info card */}
        <div className="px-4 pb-4">
          <div style={{ background: route.color + "12", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 4 }}>Чиглэл</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{route.name}</div>
            <div className="flex gap-3 mt-3">
              <InfoPill icon={<Clock size={13} />} text="~38 мин" />
              <InfoPill icon={<MapPin size={13} />} text={`${stops.length} буудал`} />
            </div>
          </div>

          {/* Direction tabs */}
          <div className="flex mt-3 p-1" style={{ background: "#F1F3F6", borderRadius: 12 }}>
            <button
              onClick={() => setDirection("forward")}
              style={{
                flex: 1, height: 36, borderRadius: 10, border: "none", cursor: "pointer",
                background: direction === "forward" ? "#fff" : "transparent",
                color: direction === "forward" ? "#111827" : "#9CA3AF",
                fontSize: 13, fontWeight: direction === "forward" ? 600 : 400,
                boxShadow: direction === "forward" ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              Явах чиглэл
            </button>
            <button
              onClick={() => setDirection("backward")}
              style={{
                flex: 1, height: 36, borderRadius: 10, border: "none", cursor: "pointer",
                background: direction === "backward" ? "#fff" : "transparent",
                color: direction === "backward" ? "#111827" : "#9CA3AF",
                fontSize: 13, fontWeight: direction === "backward" ? 600 : 400,
                boxShadow: direction === "backward" ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
              }}
            >
              Буцах чиглэл
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ scrollbarWidth: "none" }}>
        {/* Live buses */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 600, marginBottom: 8 }}>Дараагийн автобус</div>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none", paddingBottom: 4 }}>
            {route.buses.map(bus => {
              const occ = occupancyColors[bus.occupancy];
              const isSelected = selectedBus === bus.id;
              return (
                <button
                  key={bus.id}
                  onClick={() => setSelectedBus(bus.id)}
                  style={{
                    flexShrink: 0,
                    background: isSelected ? "#F47C20" : "#fff",
                    borderRadius: 12,
                    padding: "8px 14px",
                    border: isSelected ? "none" : "1.5px solid #E2E8F0",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    minWidth: 100,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Bus size={13} style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "#6B7280" }} />
                    <span style={{ fontSize: 12, color: isSelected ? "#fff" : "#374151", fontWeight: 600 }}>{bus.label}</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: isSelected ? "#fff" : "#111827" }}>{bus.eta} мин</div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    background: isSelected ? "rgba(255,255,255,0.2)" : occ.bg,
                    color: isSelected ? "#fff" : occ.color,
                    borderRadius: 6, padding: "1px 6px",
                    alignSelf: "flex-start",
                  }}>{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stop timeline */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "16px", border: "1px solid #F1F3F6", marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 600, marginBottom: 12 }}>Зогсоолын жагсаалт</div>
          {stops.map((stop, i) => (
            <div key={stop.id} className="flex gap-3" style={{ paddingBottom: i < stops.length - 1 ? 0 : 0 }}>
              {/* Timeline */}
              <div className="flex flex-col items-center" style={{ width: 20 }}>
                <div style={{
                  width: stop.current ? 14 : 10,
                  height: stop.current ? 14 : 10,
                  borderRadius: "50%",
                  background: stop.current ? route.color : stop.passed ? "#D1D5DB" : "#E5E7EB",
                  border: stop.current ? `3px solid ${route.color}40` : "none",
                  flexShrink: 0,
                  zIndex: 1,
                  boxSizing: "border-box",
                  marginTop: 4,
                }} />
                {i < stops.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: stop.passed ? "#D1D5DB" : "#F1F3F6", minHeight: 24, margin: "2px 0" }} />
                )}
              </div>

              {/* Content */}
              <div className="flex items-start justify-between flex-1 pb-3">
                <div>
                  <div style={{
                    fontSize: stop.current ? 15 : 14,
                    fontWeight: stop.current ? 700 : stop.passed ? 400 : 500,
                    color: stop.current ? "#111827" : stop.passed ? "#9CA3AF" : "#374151",
                    lineHeight: "20px",
                  }}>{stop.name}</div>
                  {stop.current && (
                    <span style={{ fontSize: 11, fontWeight: 600, background: route.color + "18", color: route.color, borderRadius: 6, padding: "1px 6px" }}>
                      Автобус энд байна
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 13, color: stop.passed ? "#9CA3AF" : "#6B7280", fontWeight: stop.current ? 600 : 400, flexShrink: 0, marginLeft: 8 }}>{stop.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-4" style={{ background: "#fff", borderTop: "1px solid #F1F3F6" }}>
        <button
          onClick={() => navigate("/map")}
          className="w-full flex items-center justify-center gap-2"
          style={{
            height: 52, background: "#F47C20", border: "none", borderRadius: 999,
            color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(244,124,32,0.3)",
          }}
        >
          <MapPin size={18} />
          Газрын зураг дээр харах
        </button>
      </div>
    </div>
  );
}

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5" style={{ background: "#fff", borderRadius: 999, padding: "4px 10px" }}>
      <span style={{ color: "#6B7280" }}>{icon}</span>
      <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{text}</span>
    </div>
  );
}
