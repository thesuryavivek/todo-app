"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTodoStore } from "@/utils/zustand";
import type { Status } from "@prisma/client";
import { FC, useState } from "react";
import { DatePickerDemo } from "./Datepicker";
import { Label } from "./ui/label";

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

interface TodoViewProps {
  todo: {
    id: string;
    text: string;
    startDate: Date;
    endDate: Date;
    status: Status;
    projectId: string;
  };
  className: string;
}

const TodoView: FC<TodoViewProps> = ({ todo, className }) => {
  const [editedTodo, setEditedTodo] = useState(todo);
  const { setStartDate, setEndDate } = useTodoStore();

  return (
    <Dialog>
      <DialogTrigger className="shadow-custom rounded-md w-full">
        <div key={todo.id} className="p-4 space-y-4">
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

        <form>
          <Label htmlFor="task-name">Name of the Task</Label>
          <Input
            id="task-name"
            name="task-name"
            type="text"
            value={editedTodo.text}
            onChange={(e) =>
              setEditedTodo((prevTodo) => {
                return {
                  ...prevTodo,
                  text: e.target.value,
                };
              })
            }
          />
          <div className="flex gap-4">
            <div className="space-y-2 w-1/2">
              <Label>Start Date</Label>
              <DatePickerDemo
                date={editedTodo.startDate}
                setDate={setStartDate}
              />
            </div>
            <div className="space-y-2 w-1/2">
              <Label>End Date</Label>
              <DatePickerDemo date={editedTodo.endDate} setDate={setEndDate} />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoView;
