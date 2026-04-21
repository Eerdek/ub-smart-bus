import { useState } from "react";
import { useNavigate } from "react-router";
import { Star, MapPin, Bus, ChevronRight, Trash2, Clock } from "lucide-react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { EtaChip } from "../components/EtaChip";

const initFavRoutes = [
  { id: "XO112", number: "XO:112", name: "Хонхор - Офицеруудын ордон", color: "#F47C20", eta: 3 },
  { id: "XO12", number: "XO:12", name: "Мал бордох - 5 шар", color: "#2563EB", eta: 7 },
];

const initFavStops = [
  { id: "1", name: "Сүхбаатарын талбай", code: "SB-01", distance: "120м", nextBus: 2 },
  { id: "3", name: "Их дэлгүүр", code: "ID-02", distance: "450м", nextBus: 6 },
];

const recentViewed = [
  { id: "XO13", number: "XO:13", name: "Баруун 4 зам - 10 хороо", type: "route", color: "#7C3AED" },
  { id: "2", name: "Их Сургуулийн буудал", code: "IS-04", type: "stop" },
  { id: "XO45", number: "XO:45", name: "Тэргүүлэгчид - Нисэх", type: "route", color: "#16A34A" },
];

export function FavoritesScreen() {
  const navigate = useNavigate();
  const [favRoutes, setFavRoutes] = useState(initFavRoutes);
  const [favStops, setFavStops] = useState(initFavStops);

  const removeRoute = (id: string) => setFavRoutes(r => r.filter(x => x.id !== id));
  const removeStop = (id: string) => setFavStops(s => s.filter(x => x.id !== id));

  const isEmpty = favRoutes.length === 0 && favStops.length === 0;

  return (
    <div className="flex flex-col" style={{ minHeight: 844, background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title="Дуртай" />

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {isEmpty ? (
          <EmptyState onSearch={() => navigate("/search-routes")} />
        ) : (
          <div className="px-4 pt-4 pb-6">
            {/* Favorite routes */}
            {favRoutes.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Bus size={16} style={{ color: "#F47C20" }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Дуртай чиглэлүүд</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: "auto" }}>{favRoutes.length}</span>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
                  {favRoutes.map((r, i) => (
                    <div key={r.id} style={{ borderBottom: i < favRoutes.length - 1 ? "1px solid #F7F8FA" : "none" }}>
                      <div className="flex items-center gap-2" style={{ padding: "14px 16px" }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/route/${r.id}`)}
                          style={{
                            flex: 1, display: "flex", alignItems: "center", gap: 12,
                            background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0,
                          }}
                        >
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Bus size={20} style={{ color: r.color }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 2 }}>{r.number}</div>
                            <div style={{ fontSize: 14, color: "#111827", fontWeight: 500 }}>{r.name}</div>
                          </div>
                        </button>
                        <EtaChip minutes={r.eta} />
                        <button
                          type="button"
                          aria-label="Remove route from favorites"
                          onClick={() => removeRoute(r.id)}
                          style={{ width: 32, height: 32, borderRadius: "50%", background: "#FDECEC", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Trash2 size={14} style={{ color: "#DC2626" }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorite stops */}
            {favStops.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} style={{ color: "#F47C20" }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Дуртай буудлууд</span>
                  <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: "auto" }}>{favStops.length}</span>
                </div>
                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
                  {favStops.map((s, i) => (
                    <div key={s.id} style={{ borderBottom: i < favStops.length - 1 ? "1px solid #F7F8FA" : "none" }}>
                      <button
                        onClick={() => navigate(`/stop/${s.id}`)}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: 12,
                          padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                        }}
                      >
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FFF1E7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <MapPin size={20} style={{ color: "#F47C20" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{s.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span style={{ fontSize: 12, color: "#9CA3AF" }}># {s.code}</span>
                            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />
                            <span style={{ fontSize: 12, color: "#9CA3AF" }}>{s.distance}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <EtaChip minutes={s.nextBus} />
                          <button
                            onClick={e => { e.stopPropagation(); removeStop(s.id); }}
                            style={{ width: 32, height: 32, borderRadius: "50%", background: "#FDECEC", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Trash2 size={14} style={{ color: "#DC2626" }} />
                          </button>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recently viewed */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} style={{ color: "#9CA3AF" }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>Сүүлд үзсэн</span>
              </div>
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #F1F3F6" }}>
                {recentViewed.map((item: any, i) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.type === "route" ? `/route/${item.id}` : `/stop/${item.id}`)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px", background: "none", border: "none",
                      borderBottom: i < recentViewed.length - 1 ? "1px solid #F7F8FA" : "none",
                      cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: item.type === "route" ? (item.color + "18") : "#FFF1E7",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {item.type === "route"
                        ? <Bus size={16} style={{ color: item.color }} />
                        : <MapPin size={16} style={{ color: "#F47C20" }} />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      {item.type === "route" && <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 1 }}>{item.number}</div>}
                      <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{item.name}</div>
                      {item.type === "stop" && <div style={{ fontSize: 11, color: "#9CA3AF" }}># {item.code}</div>}
                    </div>
                    <ChevronRight size={16} style={{ color: "#D1D5DB" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function EmptyState({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center" style={{ flex: 1, padding: "60px 32px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>⭐</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Одоохондоо хадгалсан зүйл алга</div>
      <div style={{ fontSize: 14, color: "#9CA3AF", lineHeight: "20px", marginBottom: 32 }}>
        Чиглэл болон буудлыг дуртайдаа нэмж хэмнэлттэй аялаарай
      </div>
      <button
        onClick={onSearch}
        style={{
          height: 48, padding: "0 28px",
          background: "#F47C20", border: "none", borderRadius: 999,
          color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
          boxShadow: "0 8px 24px rgba(244,124,32,0.3)",
        }}
      >
        Чиглэл хайх
      </button>
    </div>
  );
}
