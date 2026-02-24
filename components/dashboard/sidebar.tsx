import { DashboardNav } from "./nav";

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      <div className="p-6">
        <div className="text-sm font-semibold">TableCRM</div>
        <div className="text-xs text-muted-foreground">Панель продавца</div>
      </div>

      <div className="flex-1">
        <DashboardNav />
      </div>

      <div className="p-6 text-xs text-muted-foreground">
        Тестовое задание • TableCRM
      </div>
    </aside>
  );
}
