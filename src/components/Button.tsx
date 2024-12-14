import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, disabled } = props;
  return (
    <button
      disabled={disabled}
      className="bg-moderate-cyan hover:bg-dark-cyan md:hover:bg-dark-cyan disabled:hover:bg-dark-gray disabled:bg-dark-gray rounded-full px-10 py-5 font-bold leading-4 tracking-wide text-white transition duration-150 ease-in"
    >
      {children}
    </button>
  );
}
