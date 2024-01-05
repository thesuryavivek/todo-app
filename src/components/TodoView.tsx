"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import TodoForm from "./TodoForm";

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

type TodoStatus = "none" | "Progress" | "Review" | "Completed";

interface Todo {
  todoId?: string;
  todoText: string;
  startDate: Date;
  endDate: Date;
  todoStatus: TodoStatus;
}

interface TodoViewProps {
  todo: {
    id: string;
    text: string;
    startDate: Date;
    endDate: Date;
    status: TodoStatus;
    projectId: string;
  };
  className: string;
}

const TodoView: FC<TodoViewProps> = ({ todo, className }) => {
  const [editedTodo, setEditedTodo] = useState<Todo>({
    todoId: todo.id,
    todoText: todo.text,
    startDate: todo.startDate,
    endDate: todo.endDate,
    todoStatus: todo.status,
  });
  // const { setStartDate, setEndDate } = useTodoStore();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="shadow-custom rounded-md w-full">
        <div className="p-4 space-y-4">
          <h4 className="text-left capitalize">{todo.text}</h4>
          <div className="text-xs flex justify-between w-full">
            <div className="space-y-2">
              <div className="whitespace-nowrap">Start date</div>
              <div className={`${className} px-2 py-1 rounded-md`}>
                {formatDate(todo.startDate)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="whitespace-nowrap">End date</div>
              <div className={`${className} px-2 py-1 rounded-md`}>
                {formatDate(todo.endDate)}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Edit Task</DialogHeader>
        <TodoForm
          projectId={todo.projectId}
          setOpen={setOpen}
          todo={editedTodo}
          setTodo={setEditedTodo}
          endPoint="editTodo"
        />
      </DialogContent>
    </Dialog>
  );
};

export default TodoView;
