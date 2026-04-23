import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Star, MapPin, Navigation, Users, RefreshCw, ChevronRight } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { EtaChip } from "../components/EtaChip";
import { BottomNav } from "../components/BottomNav";
import { NotificationButton } from "../components/NotificationButton";

const stopData: Record<string, {
  name: string;
  code: string;
  distance: string;
  arrivals: Arrival[];
}> = {
  "1": {
    name: "Сүхбаатарын талбай",
    code: "SB-01",
    distance: "120м",
    arrivals: [
      { id: "a1", route: "XO:112", destination: "Офицеруудын ордон", eta: 2, stopsAway: 3, occupancy: "low" },
      { id: "a2", route: "11", destination: "Баянгол", eta: 5, stopsAway: 6, occupancy: "medium" },
      { id: "a3", route: "23", destination: "Дэнж уул", eta: 8, stopsAway: 9, occupancy: "low" },
      { id: "a4", route: "7", destination: "Хайлааст", eta: 11, stopsAway: 14, occupancy: "full" },
      { id: "a5", route: "XO:22", destination: "Цагаан давхар", eta: 14, stopsAway: 18, occupancy: "low" },
    ],
  },
  "2": {
    name: "Их Сургуулийн буудал",
    code: "IS-04",
    distance: "280м",
    arrivals: [
      { id: "a1", route: "1", destination: "Зайсан", eta: 3, stopsAway: 4, occupancy: "medium" },
      { id: "a2", route: "5", destination: "Амгалан", eta: 7, stopsAway: 8, occupancy: "low" },
      { id: "a3", route: "XO:12", destination: "5 шар", eta: 12, stopsAway: 11, occupancy: "full" },
    ],
  },
};

type Arrival = {
  id: string;
  route: string;
  destination: string;
  eta: number;
  stopsAway: number;
  occupancy: string;
};

const occupancyIcons: Record<string, { icon: string; color: string }> = {
  low: { icon: "🟢", color: "#16A34A" },
  medium: { icon: "🟡", color: "#D97706" },
  full: { icon: "🔴", color: "#DC2626" },
};

const defaultStop = {
  name: "Их дэлгүүр",
  code: "ID-02",
  distance: "450м",
  arrivals: [
    { id: "a1", route: "3", destination: "Налайх", eta: 4, stopsAway: 5, occupancy: "low" },
    { id: "a2", route: "9", destination: "Нисэх", eta: 9, stopsAway: 10, occupancy: "medium" },
    { id: "a3", route: "32", destination: "Баянхошуу", eta: 15, stopsAway: 16, occupancy: "low" },
  ],
};

export function StopDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stop = stopData[id || ""] || defaultStop;
  const [fav, setFav] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="flex flex-col" style={{ height: "100%", background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar
        title="Буудлын мэдээлэл"
        showBack
        rightContent={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFav(!fav)}
              style={{ width: 40, height: 40, borderRadius: "50%", background: fav ? "#FFF7E0" : "#F7F8FA", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Star size={20} style={{ color: fav ? "#F59E0B" : "#9CA3AF", fill: fav ? "#F59E0B" : "none" }} />
            </button>
            <NotificationButton />
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Stop header card */}
        <div className="px-4 py-4" style={{ background: "#fff", borderBottom: "1px solid #F1F3F6" }}>
          <div style={{ background: "linear-gradient(135deg, #F47C20 0%, #DD6D17 100%)", borderRadius: 16, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
            {/* Decorative */}
            <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: -30, right: 40, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>Буудлын нэр</div>
                <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", lineHeight: "25px" }}>{stop.name}</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}># {stop.code}</span>
                  </div>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.5)" }} />
                  <div className="flex items-center gap-1">
                    <Navigation size={12} style={{ color: "rgba(255,255,255,0.8)" }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{stop.distance}</span>
                  </div>
                </div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={24} style={{ color: "#fff" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Arrivals */}
        <div className="px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Ирэх автобус</span>
            <button
              onClick={handleRefresh}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#F47C20" }}
            >
              <RefreshCw size={14} style={{ color: "#F47C20", animation: refreshing ? "spin 1s linear infinite" : "none" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#F47C20" }}>Шинэчлэх</span>
            </button>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6", boxShadow: "0 2px 8px rgba(17,24,39,0.04)" }}>
            {stop.arrivals.map((arr, i) => {
              const occ = occupancyIcons[arr.occupancy];
              return (
                <button
                  key={arr.id}
                  onClick={() => navigate(`/route/${arr.route.replace(":", "")}`)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    background: "none",
                    border: "none",
                    borderBottom: i < stop.arrivals.length - 1 ? "1px solid #F7F8FA" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {/* Route badge */}
                  <div style={{
                    minWidth: 60, padding: "5px 8px",
                    borderRadius: 10,
                    background: arr.eta <= 3 ? "#EAF8EF" : arr.eta <= 8 ? "#FFF1E7" : "#EAF2FF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: arr.eta <= 3 ? "#16A34A" : arr.eta <= 8 ? "#F47C20" : "#2563EB",
                    }}>{arr.route}</span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: "20px" }}>{arr.destination}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span style={{ fontSize: 12, color: "#9CA3AF" }}>{arr.stopsAway} буудал хол</span>
                      <span style={{ fontSize: 12 }}>{occ.icon}</span>
                    </div>
                  </div>

                  {/* ETA */}
                  <EtaChip minutes={arr.eta} />
                </button>
              );
            })}
          </div>

          {/* Map shortcut */}
          <button
            onClick={() => navigate("/map")}
            className="w-full flex items-center justify-center gap-2 mt-4"
            style={{
              height: 48, background: "#F7F8FA", border: "1.5px solid #E2E8F0", borderRadius: 999,
              color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            <MapPin size={16} style={{ color: "#F47C20" }} />
            Газрын зураг дээр харах
          </button>
        </div>
      </div>

      <BottomNav />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
