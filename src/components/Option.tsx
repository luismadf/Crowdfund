import { twJoin } from "tailwind-merge";
import Button from "./Button";
import Card from "./Card";

interface option {
  id: string;
  title: string;
  caption: string;
  description: string;
  amountLeft: number;
}

export default function Option(props: { option: option }) {
  const { title, caption, description, amountLeft } = props.option;

  const disabled = amountLeft === 0;

  return (
    <Card className={twJoin("py-6", disabled && "opacity-60")}>
      <div className="mb-7 flex flex-col gap-3 md:mb-8 md:flex-row md:items-center md:justify-between">
        <h4 className="text-sm font-bold md:text-lg">{title}</h4>
        <p className="text-moderate-cyan text-sm md:text-base">{caption}</p>
      </div>
      <p className="text-dark-gray mb-9 text-sm leading-6 md:mb-8 md:text-base md:leading-7">
        {description}
      </p>

      <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[32px] font-bold">{amountLeft}</span>
          <span>left</span>
        </div>
        <Button disabled={disabled}>
          {disabled ? "Out of stock" : "Select Reward"}
        </Button>
      </div>
    </Card>
  );
}
