import { create } from "zustand";

type Status = "none" | "progress" | "review" | "completed";

interface State {
  todoText: string;
  todoStatus: string;
  startDate: Date;
  endDate: Date;
}

interface Action {
  setStartDate: (startDate: State["startDate"] | undefined) => void;
  setEndDate: (endDate: State["endDate"] | undefined) => void;
  setTodoText: (todoText: State["todoText"]) => void;
  setTodoStatus: (todoStatus: State["todoStatus"]) => void;
}

export const useTodoStore = create<State & Action>((set) => ({
  todoText: "",
  todoStatus: "none",
  startDate: new Date(),
  endDate: new Date(),

  setStartDate: (startDate: Date | undefined) =>
    set(() => ({ startDate: startDate })),
  setEndDate: (endDate: Date | undefined) => set(() => ({ endDate: endDate })),
  setTodoText: (todoText: string) => set(() => ({ todoText: todoText })),
  setTodoStatus: (todoStatus: string) =>
    set(() => ({ todoStatus: todoStatus })),
}));
