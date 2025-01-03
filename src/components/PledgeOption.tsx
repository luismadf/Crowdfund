import { twJoin, twMerge } from "tailwind-merge";
import Card from "./Card";
import { option } from "./Option";
import Button from "./Button";
import { useState } from "react";

export default function PledgeOption({
  option,
  isActive,
  onClick,
  onPledgeSuccess,
}: {
  option: option;
  isActive: boolean;
  onClick: (id: string) => void;
  onPledgeSuccess: (arg0: boolean) => void;
}) {
  const { id, title, caption, description, minValue, amountLeft } = option;
  const [value, setValue] = useState(minValue);

  const disabled = amountLeft === 0;
  const isInfinity = amountLeft < 0;

  function handleOnClick() {
    if (disabled) return;
    onClick(id);
  }

  function RadioButton() {
    return (
      <div className="border-1 h-6 w-6 rounded-full border border-[#E5E5E5] p-[5px]">
        <div
          className={twMerge(
            "h-full w-full rounded-full",
            isActive && "bg-moderate-cyan",
          )}
        ></div>
      </div>
    );
  }

  return (
    <div onClick={handleOnClick}>
      <Card
        className={twMerge(
          "px-0 md:cursor-pointer md:px-0",
          isActive && "outline outline-2 outline-moderate-cyan",
          disabled && "opacity-60 md:cursor-default",
        )}
      >
        <div className="px-6 md:flex md:gap-6">
          <div className="hidden md:flex">
            <RadioButton />
          </div>

          <div>
            <div className="mb-9 flex items-center gap-4 md:justify-between">
              <div className="md:hidden">
                <RadioButton />
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <span className="text-sm font-bold md:text-base">{title}</span>
                {caption && (
                  <span
                    className={twJoin(
                      "text-sm text-moderate-cyan md:text-base",
                      isActive && "font-semibold",
                    )}
                  >
                    {caption}
                  </span>
                )}
              </div>

              {!isInfinity && (
                <div className="hidden items-center gap-3 md:flex">
                  <span className="text-lg font-bold leading-none">
                    {amountLeft}
                  </span>
                  <span className="text-sm leading-none text-dark-gray">
                    left
                  </span>
                </div>
              )}
            </div>

            <p className="mb-8 text-sm leading-6 text-dark-gray md:text-base">
              {description}
            </p>
          </div>

          {!isInfinity && (
            <div className="flex items-center gap-3 md:hidden">
              <span className="text-lg font-bold leading-none">
                {amountLeft}
              </span>
              <span className="text-sm leading-none text-dark-gray">left</span>
            </div>
          )}
        </div>

        {isActive && (
          <>
            <hr className="mb-8 mt-7 w-full" />
            <div className="flex flex-col px-6 text-center md:flex-row md:items-center md:justify-between">
              <p className="mb-5 text-sm leading-6 text-dark-gray md:mb-0 md:text-base">
                Enter your pledge
              </p>

              <div className="flex justify-between md:gap-4">
                <div className="border-1 flex items-center gap-3 rounded-full border border-[#E5E5E5] px-6">
                  <span className="font-bold text-dark-gray">$</span>
                  <input
                    type="number"
                    value={value}
                    className="w-8 text-sm font-bold focus:outline-none md:w-12"
                    onChange={(newValue) =>
                      setValue(Number(newValue.target.value))
                    }
                    autoFocus={isActive}
                  />
                </div>
                <Button
                  className="text-sm xs:px-7 xs:py-4 md:text-base"
                  onClick={() => onPledgeSuccess(true)}
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
