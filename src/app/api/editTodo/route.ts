import prisma from "@/utils/prisma";

export async function POST(request: Request) {
  const req = await request.json();

  const editedTodo = await prisma.todo.update({
    data: {
      text: req.todoText,
      status: req.todoStatus,
      startDate: req.startDate,
      endDate: req.endDate,
      projectId: req.projectId,
    },
    where: {
      id: req.todoId,
    },
  });

  return Response.json(editedTodo, {
    status: 200,
  });
}
