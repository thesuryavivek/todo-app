"use client";

import { DatePicker } from "@/components/Datepicker";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useState,
  type Dispatch,
  type FC,
  type FormEvent,
  type SetStateAction,
} from "react";
import Loading from "./Loading";

type TodoStatus = "none" | "Progress" | "Review" | "Completed";

interface Todo {
  todoId?: string;
  todoText: string;
  startDate: Date;
  endDate: Date;
  todoStatus: TodoStatus;
}

interface TodoFormProps {
  projectId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  todo: Todo;
  setTodo: Dispatch<SetStateAction<Todo>>;
  endPoint: "createTodo" | "editTodo";
}

const TodoForm: FC<TodoFormProps> = ({
  projectId,
  setOpen,
  todo,
  setTodo,
  endPoint,
}) => {
  const { todoText, startDate, endDate, todoStatus, todoId } = todo;

  const setTodoText = (txt: string) => {
    setTodo((oldTodo) => ({
      ...oldTodo,
      todoText: txt,
    }));
  };

  const setStartDate = (date: Date | undefined) => {
    if (!date) return;

    setTodo((oldTodo) => ({
      ...oldTodo,
      startDate: date,
    }));
  };

  const setEndDate = (date: Date | undefined) => {
    if (!date) return;

    setTodo((oldTodo) => ({
      ...oldTodo,
      endDate: date,
    }));
  };

  const setTodoStatus = (status: string) => {
    let sts = status as TodoStatus;
    setTodo((oldTodo) => ({
      ...oldTodo,
      todoStatus: sts,
    }));
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let reqBody;

    if (endPoint === "createTodo") {
      reqBody = JSON.stringify({
        todoText,
        todoStatus:
          todoStatus !== "none"
            ? capitalizeFirstLetter(todoStatus)
            : todoStatus,
        projectId,
        startDate,
        endDate,
      });
    }

    if (endPoint === "editTodo") {
      reqBody = JSON.stringify({
        todoId,
        todoText,
        todoStatus:
          todoStatus !== "none"
            ? capitalizeFirstLetter(todoStatus)
            : todoStatus,
        projectId,
        startDate,
        endDate,
      });
    }

    const res = await fetch(`/api/${endPoint}`, {
      method: "POST",
      body: reqBody,
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
          <DatePicker date={startDate} setDate={setStartDate} />
        </div>
        <div className="space-y-2 w-1/2">
          <Label>End Date</Label>
          <DatePicker date={endDate} setDate={setEndDate} />
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
            <Button
              type="reset"
              variant={"secondary"}
              className="bg-blue-50 text-blue-700"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"default"}
            className="space-x-2 bg-blue-600 text-zinc-50 hover:bg-blue-700"
          >
            <span>Add</span>
            {loading && <Loading />}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
