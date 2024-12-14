export default function ProgressBar(props: { value: string }) {
  const { value } = props;
  return (
    <progress
      className="[&::-webkit-progress-value]:bg-moderate-cyan h-3 w-full [&::-moz-progress-bar]:bg-[#F4F4F4] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#F4F4F4] [&::-webkit-progress-value]:rounded-full"
      max="100"
      value={value}
    />
  );
}
