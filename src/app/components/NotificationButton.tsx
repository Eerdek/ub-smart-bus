import { Bell } from "lucide-react";
import { useNavigate } from "react-router";

interface NotificationButtonProps {
  count?: number;
}

export function NotificationButton({ count = 4 }: NotificationButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Мэдэгдэл"
      onClick={() => navigate("/notifications")}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#FFF1E7",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <Bell size={20} style={{ color: "#F47C20" }} />
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -3,
            right: -3,
            minWidth: 18,
            height: 18,
            borderRadius: 999,
            background: "#DC2626",
            border: "2px solid #fff",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            lineHeight: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4px",
          }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

