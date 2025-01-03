import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { menuOptions } from "../utils";
import Card from "./Card";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="relative z-50 h-full">
        {open ? (
          <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fillRule="evenodd">
              <path d="M2.404.782l11.314 11.314-2.122 2.122L.282 2.904z" />
              <path d="M.282 12.096L11.596.782l2.122 2.122L2.404 14.218z" />
            </g>
          </svg>
        ) : (
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fillRule="evenodd">
              <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
            </g>
          </svg>
        )}
      </button>

      <div
        className={twJoin(
          "to-transparent absolute left-0 right-0 top-0 z-40 h-[800px] bg-gradient-to-b from-black/70",
          open ? "flex" : "hidden",
        )}
      ></div>

      <Card
        className={twJoin(
          "absolute left-0 right-0 top-20 z-50 mx-6 bg-white p-0",
          open ? "flex" : "hidden",
        )}
      >
        <div className="flex w-full flex-col divide-y divide-[#D8D8D8]">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              className="flex px-6 py-7 text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
