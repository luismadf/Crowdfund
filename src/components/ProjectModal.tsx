import Modal, { ModalCloseIcon, ModalTitle } from "./Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import { DialogClose } from "./ui/dialog";
import PledgeOption from "./PledgeOption";
import { dotWave } from "ldrs";
import { option as optionTypes } from "./Option";
import { useParams } from "react-router";
import { useState } from "react";

dotWave.register();

export type PledgeType = { optionId: string; pledgeAmount: number };

const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default function ProjectModal(props: {
  buttonText: string;
  activeOptionId?: string;
}) {
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const options = useQuery({
    queryKey: ["options", projectId],
    queryFn: () => getData(`/project/${projectId}/options`),
  });
  const mutation = useMutation({
    mutationFn: (data: PledgeType) => {
      return fetch(`/project/${projectId}/pledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });

  const { buttonText, activeOptionId } = props;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOption, setActiveOption] = useState(activeOptionId || null);

  return (
    <Modal buttonText={buttonText}>
      {isLoading && (
        <div className="flex justify-center">
          <l-dot-wave size="47" speed="1" color="#3cb4ac"></l-dot-wave>
        </div>
      )}

      {isSuccess && !isLoading && (
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
          <DialogClose asChild>
            <Button>Got it!</Button>
          </DialogClose>
        </div>
      )}

      {!isSuccess && !isLoading && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <ModalTitle className="text-lg font-bold md:text-2xl">
              Back this project
            </ModalTitle>
            <ModalCloseIcon />
          </div>
          <p className="mb-7 text-sm leading-6 text-dark-gray md:text-base">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out
            in the world?
          </p>

          {options.data && (
            <div className="flex flex-col gap-6">
              {options.data.map((option: optionTypes) => (
                <PledgeOption
                  key={option.id}
                  option={option}
                  isActive={activeOption === option.id}
                  onClick={setActiveOption}
                  onPledgeSuccess={(data: PledgeType) => {
                    mutation.mutate(data);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
