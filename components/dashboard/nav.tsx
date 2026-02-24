"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PackagePlus, ListOrdered } from "lucide-react";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/nomenclature", label: "Nomenclature", icon: ListOrdered },
  { href: "/nomenclature/new", label: "Create product", icon: PackagePlus },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1 px-2">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition",
              active && "bg-muted text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
