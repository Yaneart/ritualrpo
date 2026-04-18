import { CalculatorOption } from "@/types";

interface CheckboxItemProps {
  item: CalculatorOption;
  checked: boolean;
  onToggle: (id: string) => void;
  formatPrice: (price: number) => string;
}

export default function CheckboxItem({
  item,
  checked,
  onToggle,
  formatPrice,
}: CheckboxItemProps) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer
        ${checked ? "border-accent bg-accent/5" : "border-border bg-white hover:border-accent/40"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
            ${checked ? "bg-accent border-accent" : "border-border"}`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span className="text-sm">{item.title}</span>
      </div>
      <span className="text-sm font-medium">{formatPrice(item.price)} ₽</span>
    </button>
  );
}
