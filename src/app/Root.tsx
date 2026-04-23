import { Outlet, useLocation } from "react-router";

export function Root() {
  const location = useLocation();
  const isSplash = location.pathname === "/";

  return (
    <>
      {/* Desktop layout */}
      <div
        className="hidden md:flex min-h-screen items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Label */}
          <div className="flex items-center gap-2">
            <span style={{ color: "#F47C20", fontSize: 20, fontWeight: 700 }}></span>
            <span className="text-white/70 text-sm tracking-widest uppercase font-medium">UB Smart Bus — Prototype</span>
          </div>

          {/* Phone frame */}
          <div
            style={{
              width: 390,
              height: 844,
              borderRadius: 48,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)",
              background: "#F7F8FA",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Status bar */}
            <div
              style={{
                height: 44,
                background: isSplash ? "transparent" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: isSplash ? "#fff" : "#111827" }}>9:41</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* Signal */}
                <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                  {[3, 5, 7, 9].map((h, i) => (
                    <div key={i} style={{ width: 3, height: h, background: isSplash ? "rgba(255,255,255,0.9)" : "#111827", borderRadius: 1 }} />
                  ))}
                </div>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 3C10.2 3 12.2 3.9 13.7 5.3L15 4C13.1 2.1 10.7 1 8 1C5.3 1 2.9 2.1 1 4L2.3 5.3C3.8 3.9 5.8 3 8 3Z" fill={isSplash ? "rgba(255,255,255,0.9)" : "#111827"} />
                  <path d="M8 6.5C9.5 6.5 10.8 7.1 11.8 8L13 6.8C11.7 5.6 10 4.8 8 4.8C6 4.8 4.3 5.6 3 6.8L4.2 8C5.2 7.1 6.5 6.5 8 6.5Z" fill={isSplash ? "rgba(255,255,255,0.9)" : "#111827"} />
                  <circle cx="8" cy="11" r="1.5" fill={isSplash ? "rgba(255,255,255,0.9)" : "#111827"} />
                </svg>
                {/* Battery */}
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={isSplash ? "rgba(255,255,255,0.9)" : "#111827"} strokeOpacity="0.4" />
                  <rect x="1.5" y="1.5" width="15" height="9" rx="2.5" fill={isSplash ? "rgba(255,255,255,0.9)" : "#111827"} />
                  <path d="M23 4V8C23.8 7.7 24.5 6.9 24.5 6C24.5 5.1 23.8 4.3 23 4Z" fill={isSplash ? "rgba(255,255,255,0.5)" : "#111827"} fillOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Screen content (scrollable) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
              }}
            >
              <Outlet />
            </div>
          </div>

          {/* Navigation hint */}
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, textAlign: "center" }}>
            Tap the phone to interact • All screens are fully navigable
          </p>
        </div>
      </div>

      {/* Mobile layout — fill full screen */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          background: "#F7F8FA",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
