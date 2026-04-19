import AnimateOnScroll from "./AnimateOnScroll";

interface SectionAnchorProps {
  num: string;
  label: React.ReactNode;
  tagline?: React.ReactNode;
  theme?: "light" | "dark";
}

export default function SectionAnchor({
  num,
  label,
  tagline,
  theme = "light",
}: SectionAnchorProps) {
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-text";
  const mutedColor = isDark ? "text-white/50" : "text-text-muted";
  const lineColor = isDark ? "bg-white/15" : "bg-border/70";

  return (
    <AnimateOnScroll>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-10 md:pb-14">
        <div className="flex items-center gap-3 md:gap-6 mb-10 md:mb-14">
          <span className={`label tabular-nums whitespace-nowrap shrink-0 ${mutedColor}`}>{num}</span>
          <span className={`flex-1 min-w-[16px] h-px ${lineColor}`} />
          <span className={`italic-heading text-sm md:text-lg whitespace-nowrap shrink-0 text-right ${mutedColor}`}>
            {label}
          </span>
        </div>

        {tagline && (
          <div className="max-w-[1100px]">
            <div
              className={`font-heading text-4xl md:text-6xl leading-[1.02] tracking-[-0.01em] ${textColor}`}
            >
              {tagline}
            </div>
          </div>
        )}
      </div>
    </AnimateOnScroll>
  );
}
