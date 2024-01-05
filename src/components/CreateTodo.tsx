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

const CreateTodo: FC<CreateTodoProps> = ({ className, projectId }) => {
  const [open, setOpen] = useState(false);

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
        <TodoForm projectId={projectId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodo;
