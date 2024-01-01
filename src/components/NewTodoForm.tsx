"use client";

import { DatePickerDemo } from "@/components/Datepicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTodoStore } from "@/utils/zustand";
import { ChevronDown, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";

interface NewTodoFormProps {
  className: string;
  projectId: string;
}

const NewTodoForm: FC<NewTodoFormProps> = ({ className, projectId }) => {
  const {
    todoStatus,
    setTodoStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    todoText,
    setTodoText,
  } = useTodoStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/createTodo", {
      method: "POST",
      body: JSON.stringify({
        todoText,
        todoStatus:
          todoStatus !== "none"
            ? capitalizeFirstLetter(todoStatus)
            : todoStatus,
        projectId,
        startDate,
        endDate,
      }),
    });

    const data = await res.json();
    console.log({ data });

    setTodoStatus("none");
    setEndDate(new Date());
    setStartDate(new Date());
    setTodoText("");

    setLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-full">
        <Button
          type="button"
          variant={"default"}
          className={`${className} text-xs hover:${className}`}
        >
          + Add new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add new task</DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Label htmlFor="task-name">Name of the Task</Label>
          <Input
            id="task-name"
            name="task-name"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <div className="flex gap-4">
            <div className="space-y-2 w-1/2">
              <Label>Start Date</Label>
              <DatePickerDemo date={startDate} setDate={setStartDate} />
            </div>
            <div className="space-y-2 w-1/2">
              <Label>End Date</Label>
              <DatePickerDemo date={endDate} setDate={setEndDate} />
            </div>
          </div>
          <div>
            <DropdownMenu>
              <div className="space-y-2">
                <Label>Status</Label>
                <DropdownMenuTrigger className="w-full">
                  <Button
                    variant={"outline"}
                    className="w-full flex justify-between"
                  >
                    <span className="capitalize">
                      {todoStatus === "none" ? "To Do" : todoStatus}
                    </span>
                    <span>
                      <ChevronDown />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="w-[28rem]">
                <DropdownMenuRadioGroup
                  value={todoStatus}
                  onValueChange={setTodoStatus}
                >
                  <DropdownMenuRadioItem
                    className="hover:bg-zinc-50 space-x-2"
                    value="none"
                  >
                    <Circle className="fill-indigo-300 stroke-none" size={12} />
                    <span> To Do </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="hover:bg-zinc-50 space-x-2"
                    value="progress"
                  >
                    <Circle className="fill-pink-300 stroke-none" size={12} />
                    <span> Progress </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="hover:bg-zinc-50 space-x-2"
                    value="review"
                  >
                    <Circle className="fill-sky-300 stroke-none" size={12} />
                    <span> Review </span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="hover:bg-zinc-50 space-x-2"
                    value="completed"
                  >
                    <Circle className="fill-green-300 stroke-none" size={12} />
                    <span> Completed </span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex space-x-2 justify-end mt-2">
              <DialogClose>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
              <Button type="submit" variant={"default"} className="space-x-2">
                <span>Add</span>
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTodoForm;
