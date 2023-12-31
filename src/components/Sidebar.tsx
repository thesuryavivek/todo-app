import prisma from "@/utils/prisma";
import Link from "next/link";
import type { FC } from "react";

interface SidebarProps {
  projectId: string;
}

const Sidebar: FC<SidebarProps> = async ({ projectId }) => {
  const projects = await prisma.project.findMany();
  console.log({ projectId });

  return (
    <div className="w-1/5 p-4 divide-y space-y-8">
      <div className="space-y-4 px-2">
        {projects.map((p) => (
          <Link
            href={p.id}
            key={p.id}
            className={`${
              projectId === p.id ? "bg-blue-100" : ""
            } text-lg capitalize block px-6 py-2 rounded-md`}
          >
            {p.name}
          </Link>
        ))}
      </div>
      <button className="py-2 text-sm bg-blue-200 rounded-md text-blue-800 px-4 flex items-center justify-center">
        + Add New Project
      </button>
      {/* <ProjectInput /> */}
    </div>
  );
};

const ProjectInput = () => {
  return (
    <form action="">
      <input type="text" name="project-input" id="project-input" />
    </form>
  );
};

export default Sidebar;
