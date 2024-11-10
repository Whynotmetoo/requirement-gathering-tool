"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClipboardList, FormInput, LineChart } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Form Designer",
      href: "/",
      icon: FormInput,
      current: pathname === "/"
    },
    {
      name: "Requirements Form",
      href: "/form",
      icon: ClipboardList,
      current: pathname === "/form"
    },
    {
      name: "Analysis",
      href: "/analysis",
      icon: LineChart,
      current: pathname === "/analysis"
    }
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Requirements Tool - HealthConnect Insights</span>
          </div>
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  item.current
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}