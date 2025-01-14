import { formatToLocalNumber, formatToUSD } from "@/lib/utils";

export default function StatsDisplay(props: {
  type?: "number" | "currency";
  value: string | number;
  description: string;
}) {
  const { type, value, description } = props;

  let formattedValue = value;

  if (type === "number") {
    formattedValue = formatToLocalNumber(Number(value));
  }

  if (type === "currency") {
    formattedValue = formatToUSD(Number(value));
  }

  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="mb-2 text-[32px] font-bold">{formattedValue}</span>
      <span className="font-sm tracking-wide text-dark-gray">
        {description}
      </span>
    </div>
  );
}
