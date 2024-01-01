import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  // console.log(req.body);
  const request = await req.json();

  const newTodo = await prisma.todo.create({
    data: {
      text: request.todoText,
      status: request.todoStatus,
      startDate: request.startDate,
      endDate: request.endDate,
      projectId: request.projectId,
    },
  });

  return Response.json(newTodo, {
    status: 200,
  });
}
