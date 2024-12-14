import { ButtonHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

export default function BookmarkButton(
  props: { pressed: boolean } & ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pressed, ...otherProps } = props;

  return (
    <button
      className={twJoin(
        "rounded-full md:flex md:items-center md:gap-3 md:pr-5",
        pressed ? "md:bg-[#F4F8F9]" : "md:bg-[#F4F4F4]",
      )}
      {...otherProps}
    >
      <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <circle
            className="md:hover:bg-[#707070]"
            fill={pressed ? "#147b74" : "#2F2F2F"}
            cx="28"
            cy="28"
            r="28"
          />
          <path
            fill={pressed ? "#FFFFFF" : "#B1B1B1"}
            d="M23 19v18l5-5.058L33 37V19z"
          />
        </g>
      </svg>
      <span
        className={twJoin(
          "hidden font-bold md:inline",
          pressed ? "text-dark-cyan" : "text-dark-gray",
        )}
      >
        {pressed ? "Bookmarked" : "Bookmark"}
      </span>
    </button>
  );
}
