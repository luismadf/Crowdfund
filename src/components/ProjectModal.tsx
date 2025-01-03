import { useState } from "react";
import Modal, { ModalCloseIcon, ModalTitle } from "./Modal";
import PledgeOption from "./PledgeOption";
import { option } from "./Option";
import Button from "./Button";

export default function ProjectModal(props: {
  buttonText: string;
  activeOptionId?: string;
  options: Array<option>;
}) {
  const { buttonText, activeOptionId, options } = props;
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeOption, setActiveOption] = useState(
    activeOptionId || options[0].id,
  );

  return (
    <Modal buttonText={buttonText}>
      {isSuccess ? (
        <div className="flex flex-col items-center">
          <div>
            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <circle fill="#3CB3AB" cx="32" cy="32" r="32" />
                <path
                  stroke="#FFF"
                  strokeWidth="5"
                  d="M20 31.86L28.093 40 44 24"
                />
              </g>
            </svg>
          </div>

          <ModalTitle className="my-7 text-lg font-bold">
            Thanks for your support!
          </ModalTitle>

          <p className="mb-8 text-center text-sm leading-6 text-dark-gray">
            Your pledge brings us one step closer to sharing Mastercraft Bamboo
            Monitor Riser worldwide. You will get an email once our campaign is
            completed.
          </p>
          <Button>Got it!</Button>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <ModalTitle className="text-lg font-bold">
              Back this project
            </ModalTitle>
            <ModalCloseIcon />
          </div>
          <p className="mb-7 text-sm leading-6 text-dark-gray">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out
            in the world?
          </p>

          <div className="flex flex-col gap-6">
            {options.map((option) => (
              <PledgeOption
                key={option.id}
                option={option}
                isActive={activeOption === option.id}
                onClick={setActiveOption}
                onPledgeSuccess={setIsSuccess}
              />
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}
