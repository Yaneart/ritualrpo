import { type ItemOption } from "@/data/calculator";

interface RadioItemProps {
  item: ItemOption;
  selected: boolean;
  onSelect: () => void;
  formatPrice: (price: number) => string;
}

export default function RadioItem({
  item,
  selected,
  onSelect,
  formatPrice,
}: RadioItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer
        ${selected ? "border-accent bg-accent/5" : "border-border bg-white hover:border-accent/40"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${selected ? "border-accent" : "border-border"}`}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
        </div>
        <span className="text-sm">{item.title}</span>
      </div>
      <span className="text-sm font-medium">{formatPrice(item.price)} ₽</span>
    </button>
  );
}