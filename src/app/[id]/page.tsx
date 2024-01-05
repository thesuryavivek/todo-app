// import NewTodoForm from "@/components/NewTodoForm";
import CreateTodo from "@/components/CreateTodo";
import TodoView from "@/components/TodoView";
import prisma from "@/utils/prisma";
import { type FC } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex w-full justify-between gap-2">
      {/* My Post: {params.id} */}

      <Column projectId={params.id} status="none" />
      <span className="w-px h-5/6 place-self-center bg-zinc-300/90 relative before:content-[''] before:absolute before:h-2 before:w-2 before:top-0 before:right-0 before:translate-x-1/2 before:rounded-full before:bg-zinc-300/90 after:content-[''] after:absolute after:h-2 after:w-2 after:bottom-0 after:right-0 after:translate-x-1/2 after:rounded-full after:bg-zinc-300/90" />
      <Column projectId={params.id} status="Progress" />
      <span className="w-px h-5/6 place-self-center bg-zinc-300/90 relative before:content-[''] before:absolute before:h-2 before:w-2 before:top-0 before:right-0 before:translate-x-1/2 before:rounded-full before:bg-zinc-300/90 after:content-[''] after:absolute after:h-2 after:w-2 after:bottom-0 after:right-0 after:translate-x-1/2 after:rounded-full after:bg-zinc-300/90" />
      <Column projectId={params.id} status="Review" />
      <span className="w-px h-5/6 place-self-center bg-zinc-300/90 relative before:content-[''] before:absolute before:h-2 before:w-2 before:top-0 before:right-0 before:translate-x-1/2 before:rounded-full before:bg-zinc-300/90 after:content-[''] after:absolute after:h-2 after:w-2 after:bottom-0 after:right-0 after:translate-x-1/2 after:rounded-full after:bg-zinc-300/90" />
      <Column projectId={params.id} status="Completed" />
    </div>
  );
};

interface ColumnProps {
  status: "none" | "Progress" | "Review" | "Completed";
  projectId: string;
}

const Column: FC<ColumnProps> = async ({ status, projectId }) => {
  let statusView = {
    text: "",
    style: "",
  };

  switch (status) {
    case "none":
      statusView.text = "To Do";
      statusView.style = "bg-indigo-200/50 text-indigo-900";
      break;
    case "Progress":
      statusView.text = "In Progress";
      statusView.style = "bg-pink-200/50 text-pink-900";
      break;
    case "Review":
      statusView.text = "In Review";
      statusView.style = "bg-sky-200/50 text-sky-900";
      break;
    case "Completed":
      statusView.text = "Completed";
      statusView.style = "bg-green-200/50 text-green-900";
      break;
  }

  const todos = await prisma.todo.findMany({
    where: {
      AND: [{ status }, { projectId }],
    },
  });

  return (
    <div className="w-1/4 py-6 space-y-4 px-4">
      <span
        className={`${statusView.style} text-xs flex items-center w-max rounded-full px-4 py-2`}
      >
        <span className="mr-1">•</span>
        {statusView.text}
      </span>
      {todos.map((todo) => (
        <TodoView key={todo.id} todo={todo} className={statusView.style} />
      ))}

      {/* <NewTodoForm className={statusView.style} projectId={projectId} /> */}
      <CreateTodo className={statusView.style} projectId={projectId} />
    </div>
  );
};

export default Page;
