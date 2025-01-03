import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./Button";

export default function Modal(props: {
  buttonText: string;
  children: React.ReactNode;
}) {
  const { buttonText, children } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-nowrap">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export const ModalTitle = DialogTitle;

export function ModalCloseIcon() {
  return (
    <DialogClose asChild>
      <svg
        width="15"
        height="15"
        xmlns="http:www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          d="M11.314 0l2.828 2.828L9.9 7.071l4.243 4.243-2.828 2.828L7.07 9.9l-4.243 4.243L0 11.314 4.242 7.07 0 2.828 2.828 0l4.243 4.242L11.314 0z"
          fill="#000"
          fillRule="evenodd"
          opacity=".4"
        />
      </svg>
    </DialogClose>
  );
}
