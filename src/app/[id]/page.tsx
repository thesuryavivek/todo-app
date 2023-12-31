import prisma from "@/utils/prisma";
import type { Status } from "@prisma/client";
import { type FC } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex w-full justify-between gap-2">
      {/* My Post: {params.id} */}

      <Column status="none" />
      <Column status="Progress" />
      <Column status="Review" />
      <Column status="Completed" />
    </div>
  );
};

interface ColumnProps {
  status: Status;
}

const Column: FC<ColumnProps> = async ({ status }) => {
  let statusView = {
    text: "",
    color: "",
  };

  switch (status) {
    case "none":
      statusView.text = "To Do";
      statusView.color = "indigo";
      break;
    case "Progress":
      statusView.text = "In Progress";
      statusView.color = "pink";
      break;
    case "Review":
      statusView.text = "In Review";
      statusView.color = "sky";
      break;
    case "Completed":
      statusView.text = "Completed";
      statusView.color = "green";
      break;
  }

  const todos = await prisma.todo.findMany({
    where: {
      status: status,
    },
  });

  console.log({ statusView });

  return (
    <div className="w-1/4 py-6 space-y-2 px-4">
      <span
        className={`bg-${statusView.color}-300 text-${statusView.color}-900 text-xs rounded-full px-4 py-2`}
      >
        • {statusView.text}
      </span>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
};

export default Page;
