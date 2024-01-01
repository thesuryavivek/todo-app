import Sidebar from "@/components/Sidebar";
import type { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const Layout: FC<LayoutProps> = ({ children, params }) => {
  return (
    <div className="flex">
      <Sidebar projectId={params.id} />
      {children}
    </div>
  );
};

export default Layout;
