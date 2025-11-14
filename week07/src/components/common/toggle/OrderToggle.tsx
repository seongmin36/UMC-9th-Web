import type { Order } from "../../../types/common/enum";

interface OrderToggleProps {
  order: Order;
  onChangeOrder: (order: Order) => void;
}

export const OrderToggle = ({ order, onChangeOrder }: OrderToggleProps) => {
  const buttons = [
    { label: "오래된순", value: "asc" },
    { label: "최신순", value: "desc" },
  ];

  return (
    <div className="flex gap-2 text-xs text-neutral-500">
      {buttons.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChangeOrder(value as Order)}
          className={`rounded-md px-2 py-1 transition-colors ${
            order === value
              ? "bg-neutral-800 text-neutral-100"
              : "text-neutral-500 hover:text-neutral-400"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
