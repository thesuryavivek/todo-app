import prisma from "@/utils/prisma";
import { Status } from "@prisma/client";
import { type FC } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex w-full justify-between gap-2">
      {/* My Post: {params.id} */}

      <Column projectId={params.id} status="none" />
      <Column projectId={params.id} status="Progress" />
      <Column projectId={params.id} status="Review" />
      <Column projectId={params.id} status="Completed" />
    </div>
  );
};

interface ColumnProps {
  status: Status;
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
      statusView.style = "bg-indigo-300 text-indigo-900";
      break;
    case "Progress":
      statusView.text = "In Progress";
      statusView.style = "bg-pink-300 text-pink-900";
      break;
    case "Review":
      statusView.text = "In Review";
      statusView.style = "bg-sky-300 text-sky-900";
      break;
    case "Completed":
      statusView.text = "Completed";
      statusView.style = "bg-green-300 text-green-900";
      break;
  }

  const todos = await prisma.todo.findMany({
    where: {
      AND: [{ status }, { projectId }],
    },
  });

  console.log({ statusView });

  return (
    <div className="w-1/4 py-6 space-y-2 px-4">
      <span
        className={`${statusView.style} text-xs flex items-center w-max rounded-full px-4 py-2`}
      >
        <span className="mr-1">•</span>
        {statusView.text}
      </span>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
};

export default Page;
