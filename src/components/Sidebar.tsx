import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { Label } from "./ui/label";

interface SidebarProps {
  projectId: string;
}

const Sidebar: FC<SidebarProps> = async ({ projectId }) => {
  const projects = await prisma.project.findMany();

  async function createNewProject(formData: FormData) {
    "use server";

    const project = formData.get("new-project-name") as string;

    console.log("server actions: ", project);

    const data = await prisma.project.create({
      data: {
        name: project,
      },
    });

    revalidatePath(`/${data.id}`);
    redirect(`/${data.id}`);
  }

  return (
    <div className="w-1/5 py-4 px-6 divide-y space-y-8">
      <div className="space-y-4">
        {projects.map((p) => (
          <Link
            href={p.id}
            key={p.id}
            className={`${
              projectId === p.id ? "bg-blue-100" : ""
            } text-lg capitalize block px-6 py-2 rounded-md whitespace-nowrap`}
          >
            {p.name}
          </Link>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-indigo-900">
            + Add New Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a new project to track your progress.
            </DialogDescription>
          </DialogHeader>
          <form action={createNewProject} className="space-y-2">
            <Label htmlFor="new-project-name">Project Name</Label>
            <Input id="new-project-name" name="new-project-name" />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-blue-50 text-blue-700"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="default"
                className="bg-blue-600 text-zinc-50 hover:bg-blue-700"
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
