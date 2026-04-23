import { useMemo, useState } from "react";
import { AppBar } from "../components/AppBar";
import { BottomNav } from "../components/BottomNav";
import { Bus, MapPin, LocateFixed, ArrowRightLeft, Footprints } from "lucide-react";

type MapPoint = [number, number];

type RouteOption = {
  id: string;
  line: string;
  minutes: number;
  interval: string;
  distance: string;
  color: string;
  path: MapPoint[];
  bubblePos: { x: number; y: number };
  from: string;
  to: string;
  walk: string;
  busStops: string;
  firstBus: string;
  lastBus: string;
  fare: string;
  steps: string[];
};

const routeOptions: RouteOption[] = [
  {
    id: "r23",
    line: "23",
    minutes: 23,
    interval: "5 мин тутам",
    distance: "2.1 км",
    color: "#00A7D6",
    path: [
      [22, 48],
      [30, 48],
      [38, 48],
      [46, 48],
      [52, 48],
      [56, 47],
      [58, 45],
      [61, 45],
    ],
    bubblePos: { x: 11, y: 40 },
    from: "5 Толгой дэлгүүр",
    to: "БЗД 17-р хороо",
    walk: "120 м",
    busStops: "8 буудал",
    firstBus: "06:10",
    lastBus: "22:40",
    fare: "500₮",
    steps: [
      "Эхлэлээс 120м алхаж 23 чиглэлийн буудалд очно.",
      "23-р автобусанд сууж 8 буудал явна.",
      "БЗД 17-р хорооны буудал дээр бууна.",
    ],
  },
  {
    id: "r30",
    line: "30",
    minutes: 30,
    interval: "6 мин тутам",
    distance: "2.3 км",
    color: "#E2B400",
    path: [
      [22, 48],
      [24, 40],
      [25, 31],
      [26, 22],
      [27, 14],
      [29, 8],
      [33, 6],
      [38, 7],
      [42, 12],
      [44, 19],
      [45, 27],
      [47, 34],
      [51, 39],
      [57, 41],
      [61, 45],
    ],
    bubblePos: { x: 52, y: 22 },
    from: "5 Толгой дэлгүүр",
    to: "БЗД 17-р хороо",
    walk: "250 м",
    busStops: "11 буудал",
    firstBus: "06:20",
    lastBus: "22:20",
    fare: "500₮",
    steps: [
      "Эхлэлээс баруун хойд чигт 250м алхана.",
      "30-р автобусанд сууж 11 буудал явна.",
      "Эцсийн буудлаас 90м алхаж зорьсон цэгт хүрнэ.",
    ],
  },
  {
    id: "r33",
    line: "33",
    minutes: 33,
    interval: "5 мин тутам",
    distance: "2.8 км",
    color: "#3047F2",
    path: [
      [22, 48],
      [22, 56],
      [23, 65],
      [24, 74],
      [27, 82],
      [32, 83],
      [39, 79],
      [45, 73],
      [49, 66],
      [50, 58],
      [50, 49],
      [51, 41],
      [55, 40],
      [58, 42],
      [61, 45],
    ],
    bubblePos: { x: 33, y: 58 },
    from: "5 Толгой дэлгүүр",
    to: "БЗД 17-р хороо",
    walk: "310 м",
    busStops: "12 буудал",
    firstBus: "06:00",
    lastBus: "22:50",
    fare: "500₮",
    steps: [
      "Эхлэлээс урд зүгт 310м алхана.",
      "33-р автобусанд суугаад 12 буудал явна.",
      "Зорьсон буудал дээр буугаад 70м алхана.",
    ],
  },
];

const hospitals = [
  { id: "h1", x: 11, y: 59 },
  { id: "h2", x: 15, y: 76 },
  { id: "h3", x: 67, y: 88 },
];

function pointsToSvg(route: MapPoint[]) {
  return route.map(([x, y]) => `${x},${y}`).join(" ");
}

export function MapScreen() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const selected = useMemo(
    () => routeOptions.find(route => route.id === selectedRoute) ?? null,
    [selectedRoute],
  );

  return (
    <div className="flex flex-col" style={{ height: "100%", background: "#F7F8FA" }}>
      <div style={{ height: 44, background: "#fff" }} />
      <AppBar title="Газрын зураг" showBack />

      <div className="flex-1" style={{ position: "relative", overflow: "hidden", background: "#D9D9D9" }}>
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, zIndex: 30 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              border: "1px solid #D6D6D6",
              boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
              padding: 10,
            }}
          >
            <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2B2B2B", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#222", fontWeight: 600 }}>5 Толгой дэлгүүр</span>
              <button
                type="button"
                style={{
                  marginLeft: "auto",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "none",
                  background: "#F1F3F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowRightLeft size={15} style={{ color: "#646B74" }} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} style={{ color: "#D83C3C", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#222", fontWeight: 600 }}>БЗД 17-р хороо</span>
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <rect x="0" y="0" width="100" height="100" fill="#D9D9D9" />

          <path d="M3 34 L18 36 L32 37 L46 37 L60 36 L78 36 L97 36" stroke="#B8B8B8" strokeWidth="2.2" fill="none" />
          <path d="M3 72 L18 74 L29 76 L43 77 L60 78 L78 80 L98 81" stroke="#8AA3C5" strokeWidth="2.4" fill="none" />
          <path d="M25 5 L27 16 L28 29 L29 42 L29 55 L28 68 L27 81 L26 95" stroke="#B8B8B8" strokeWidth="1.3" fill="none" />
          <path d="M48 8 L48 18 L48 31 L49 45 L49 58 L49 72 L49 88" stroke="#B8B8B8" strokeWidth="1.1" fill="none" />

          <path d="M12 18 L21 21 L19 30 L10 28 Z" fill="#C7E2CD" />
          <path d="M67 86 L77 85 L80 94 L69 95 Z" fill="#C7E2CD" />

          {routeOptions.map(route => {
            const isSelected = route.id === selectedRoute;
            return (
              <g key={route.id}>
                {isSelected && (
                  <polyline
                    points={pointsToSvg(route.path)}
                    fill="none"
                    stroke="#2A2A2A"
                    strokeWidth={3.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.28}
                  />
                )}
                <polyline
                  points={pointsToSvg(route.path)}
                  fill="none"
                  stroke={isSelected ? route.color : "#AEB6BF"}
                  strokeWidth={isSelected ? 2.8 : 1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={isSelected ? 1 : 0.65}
                />
              </g>
            );
          })}

          <circle cx="22" cy="48" r="1.25" fill="#fff" stroke="#2B2B2B" strokeWidth="0.45" />
          <circle cx="61" cy="45" r="1.1" fill="#fff" stroke="#2B2B2B" strokeWidth="0.42" />

          <circle cx="24.8" cy="48" r="0.95" fill={selectedRoute === "r30" ? "#E2B400" : "#B8BEC7"} stroke="#2B2B2B" strokeWidth="0.25" />
          <circle cx="27.1" cy="48" r="0.95" fill={selectedRoute === "r33" ? "#3047F2" : "#B8BEC7"} stroke="#2B2B2B" strokeWidth="0.25" />
          <circle cx="29.4" cy="48" r="0.95" fill={selectedRoute === "r23" ? "#00A7D6" : "#B8BEC7"} stroke="#2B2B2B" strokeWidth="0.25" />
        </svg>

        {routeOptions.map(route => (
          <RouteCallout
            key={route.id}
            route={route}
            selected={route.id === selectedRoute}
            onClick={() => setSelectedRoute(prev => (prev === route.id ? null : route.id))}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: "61%",
            top: "45%",
            transform: "translate(-50%, -100%)",
            zIndex: 22,
            filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.22))",
          }}
        >
          <MapPin size={30} style={{ color: "#D83C3C", fill: "#D83C3C" }} />
        </div>

        {hospitals.map(hospital => (
          <div
            key={hospital.id}
            style={{
              position: "absolute",
              left: `${hospital.x}%`,
              top: `${hospital.y}%`,
              transform: "translate(-50%, -50%)",
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "3px solid #fff",
              background: "#F05656",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 14,
              boxShadow: "0 3px 8px rgba(0,0,0,0.22)",
            }}
          >
            H
          </div>
        ))}

        <button
          type="button"
          style={{
            position: "absolute",
            right: 12,
            bottom: selected ? 274 : 126,
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: "1px solid #CFCFCF",
            background: "#fff",
            color: "#2E6FE8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 26,
            boxShadow: "0 4px 10px rgba(0,0,0,0.16)",
            transition: "bottom 0.2s",
          }}
        >
          <LocateFixed size={20} />
        </button>

        <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, zIndex: 28 }}>
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none", paddingBottom: 2 }}>
            {routeOptions.map(route => {
              const active = route.id === selectedRoute;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setSelectedRoute(prev => (prev === route.id ? null : route.id))}
                  style={{
                    minWidth: 142,
                    borderRadius: 12,
                    border: active ? `2px solid ${route.color}` : "1px solid #D1D5DB",
                    background: active ? "#fff" : "rgba(255,255,255,0.95)",
                    padding: "8px 10px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: active ? "0 6px 14px rgba(0,0,0,0.14)" : "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Bus size={13} style={{ color: "#5B6068" }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2A2A2A" }}>
                      {route.line} • {route.minutes} мин
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{route.interval}</div>
                </button>
              );
            })}
          </div>
        </div>

        {selected && (
          <div
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              bottom: 92,
              zIndex: 29,
              background: "#fff",
              borderRadius: 14,
              border: `2px solid ${selected.color}`,
              padding: "10px 12px",
              boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1F2937" }}>
              Чиглэл {selected.line}: {selected.from} → {selected.to}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <InfoPill icon={<Footprints size={12} />} text={`Алхалт ${selected.walk}`} />
              <InfoPill icon={<Bus size={12} />} text={selected.busStops} />
              <InfoPill text={`${selected.distance} • ${selected.fare}`} />
            </div>

            <div style={{ marginTop: 8, fontSize: 11, color: "#4B5563", lineHeight: "16px" }}>
              1. {selected.steps[0]}
              <br />
              2. {selected.steps[1]}
              <br />
              3. {selected.steps[2]}
            </div>

            <div className="flex items-center gap-3" style={{ marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#6B7280" }}>Эхний: {selected.firstBus}</span>
              <span style={{ fontSize: 11, color: "#6B7280" }}>Сүүлийн: {selected.lastBus}</span>
              <span style={{ fontSize: 11, color: "#6B7280" }}>Давтамж: {selected.interval}</span>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function RouteCallout({
  route,
  selected,
  onClick,
}: {
  route: RouteOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${route.bubblePos.x}%`,
        top: `${route.bubblePos.y}%`,
        transform: "translate(-50%, -50%)",
        background: "#EFEFEF",
        border: selected ? "2px solid #9FA4AB" : "1px solid #B6BBC1",
        borderRadius: 2,
        padding: "7px 10px",
        minWidth: 112,
        textAlign: "left",
        boxShadow: "0 3px 9px rgba(0,0,0,0.16)",
        zIndex: 24,
        cursor: "pointer",
      }}
    >
      <div className="flex items-center gap-1">
        <Bus size={13} style={{ color: "#59606B" }} />
        <span style={{ fontSize: 11, color: "#636A73", fontWeight: 600 }}>{route.line}</span>
        <span style={{ fontSize: 12, color: "#8A9098", marginLeft: 2 }}>›››</span>
      </div>
      <div style={{ marginTop: 1, fontSize: 14, lineHeight: 1.1, fontWeight: 700, color: "#2F343A" }}>
        {route.minutes} мин
      </div>
      <div style={{ fontSize: 11, color: "#6C737C", marginTop: 1 }}>{route.interval}</div>
    </button>
  );
}

function InfoPill({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <span
      className="flex items-center gap-1"
      style={{
        height: 22,
        borderRadius: 999,
        padding: "0 8px",
        border: "1px solid #E5E7EB",
        background: "#F9FAFB",
        fontSize: 11,
        color: "#374151",
        fontWeight: 600,
      }}
    >
      {icon}
      {text}
    </span>
  );
}

