import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, disabled, className, ...otherProps } = props;
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-full bg-moderate-cyan px-4 py-5 font-bold leading-4 tracking-wide text-white transition duration-150 ease-in disabled:bg-dark-gray disabled:hover:bg-dark-gray xs:px-10 lg:hover:bg-dark-cyan",
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
