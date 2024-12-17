import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./Button";

export default function Modal(props: {
  title: string;
  children: React.ReactNode;
}) {
  const { title, children } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Back this project</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-bold">{title}</span>
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
                fill-rule="evenodd"
                opacity=".4"
              />
            </svg>
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}
