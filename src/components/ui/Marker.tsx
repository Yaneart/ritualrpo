interface MarkerProps {
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export default function Marker({
  children,
  className = "",
  theme = "light",
}: MarkerProps) {
  const color = theme === "dark" ? "text-white/50" : "text-text-muted";

  return (
    <span
      className={`label ${color} inline-flex items-center gap-2 ${className}`}
    >
      <span className="opacity-60">[</span>
      <span>{children}</span>
      <span className="opacity-60">]</span>
    </span>
  );
}
