export default function StatsDisplay(props: {
  value: string;
  description: string;
}) {
  const { value, description } = props;

  return (
    <div className="flex flex-col items-center md:items-start">
      <span className="mb-2 text-[32px] font-bold">{value}</span>
      <span className="text-dark-gray font-sm tracking-wide">
        {description}
      </span>
    </div>
  );
}
