import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children } = props;

  return (
    <div
      className={twMerge(
        "rounded-lg border border-[#F2F2F2] bg-white px-6 py-9 md:px-11",
        className,
      )}
    >
      {children}
    </div>
  );
}
