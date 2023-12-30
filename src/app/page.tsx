import prisma from "@/utils/prisma";
import { Suspense } from "react";

export default async function Home() {
  const data = await prisma.todo.findMany();
  console.log({ data });

  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <ul>
          {data.map((d) => (
            <li key={d.id}>{d.text}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
