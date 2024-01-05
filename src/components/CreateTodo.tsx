"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type FC } from "react";
import TodoForm from "./TodoForm";

interface CreateTodoProps {
  className: string;
  projectId: string;
}

interface Todo {
  todoText: string;
  startDate: Date;
  endDate: Date;
  todoStatus: "none" | "Progress" | "Review" | "Completed";
}

const CreateTodo: FC<CreateTodoProps> = ({ className, projectId }) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<Todo>({
    todoText: "",
    startDate: new Date(),
    endDate: new Date(),
    todoStatus: "none",
  });

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
        <TodoForm
          projectId={projectId}
          setOpen={setOpen}
          todo={todo}
          setTodo={setTodo}
          endPoint="createTodo"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodo;
