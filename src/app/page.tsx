import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

const Page = async () => {
  const firstProject = await prisma.project.findFirst();

  if (!firstProject) {
    return <div>The database is empty!</div>;
  }

  redirect(`/${firstProject.id}`);
};

export default Page;
