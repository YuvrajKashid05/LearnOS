import type { ReactNode } from "react";
import { useState } from "react";

import ManagerHeader from "@/components/manager/manager-header";
import ManagerSidebar from "@/components/manager/manager-sidebar";

type ManagerLayoutProps = {
  children: ReactNode;
};

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => !current);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="h-svh w-full overflow-hidden bg-background text-foreground">
      <div className="flex h-full w-full">
        <ManagerSidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onToggle={toggleSidebar}
          onCloseMobile={closeMobileSidebar}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ManagerHeader
            sidebarCollapsed={sidebarCollapsed}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          <main className="dashboard-scroll min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
