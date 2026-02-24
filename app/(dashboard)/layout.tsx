import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
