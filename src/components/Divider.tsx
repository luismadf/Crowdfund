import { twMerge } from "tailwind-merge";

export default function Divider(props: { className?: string }) {
  return (
    <hr
      className={twMerge(
        "my-8 h-[1px] w-[82px] border-0 bg-[#D8D8D8] md:my-10 md:rotate-90",
        props.className,
      )}
    />
  );
}
