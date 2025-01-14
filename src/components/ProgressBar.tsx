export default function ProgressBar(props: { value: number }) {
  const { value } = props;
  return (
    <progress
      className="h-3 w-full [&::-moz-progress-bar]:bg-[#F4F4F4] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#F4F4F4] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-moderate-cyan"
      max="100"
      value={value}
    />
  );
}
