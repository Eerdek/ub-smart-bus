import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { NotificationButton } from "./NotificationButton";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
  transparent?: boolean;
  showNotification?: boolean;
  notificationCount?: number;
}

export function AppBar({
  title,
  showBack = false,
  rightContent,
  transparent = false,
  showNotification = true,
  notificationCount = 4,
}: AppBarProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center px-4"
      style={{
        height: 56,
        background: transparent ? "transparent" : "#fff",
        borderBottom: transparent ? "none" : "1px solid #F1F3F6",
        flexShrink: 0,
      }}
    >
      {showBack ? (
        <button
          className="flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, background: "#F7F8FA", border: "none", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} style={{ color: "#111827" }} />
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}

      <span
        className="flex-1 text-center"
        style={{ fontSize: 18, fontWeight: 600, color: "#111827", lineHeight: "24px" }}
      >
        {title}
      </span>

      {rightContent || (showNotification ? <NotificationButton count={notificationCount} /> : <div style={{ width: 40 }} />)}
    </div>
  );
}
