"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClipboardList, FormInput, LineChart, UserCog, LogOut} from "lucide-react";
import { USER_TYPE } from "@/constants/USER_TYPE";
import { useGlobalState } from '@/lib/userContext';
import { useRouter } from 'next/navigation';


export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, user } = useGlobalState();

  const handleLogout = () => {
    router.push('/login')
    setUser(null)
  }
  const navigation = [
    {
      name: "Form Designer",
      href: "/reqlicit",
      icon: FormInput,
      current: pathname === "/reqlicit",
      permission: [USER_TYPE.MEDICAL_PRACTITIONER]
    },
    {
      name: "Requirements Form",
      href: "/reqlicit/review",
      icon: ClipboardList,
      current: pathname === "/reqlicit/review",
      permission: [USER_TYPE.MEDICAL_PRACTITIONER, USER_TYPE.PATIENT]
    },
    {
      name: "Analysis",
      href: "/reqlicit/analysis",
      icon: LineChart,
      current: pathname === "/reqlicit/analysis",
      permission: [USER_TYPE.MEDICAL_PRACTITIONER]
    },
    {
      name: "User Management",
      href: "/reqlicit/user",
      icon: UserCog,
      current: pathname === "/reqlicit/user",
      permission: [USER_TYPE.ADMIN]
    }
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">Requirements Tool - Reqlicit</span>
          </div>
          <div className="flex space-x-8">
            {navigation.map((item) => user && item.permission.indexOf(user.type) != -1 && (
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
            <button
              onClick={handleLogout} 
              className={cn(
                  "flex items-center space-x-2 text-sm font-normal transition-colors hover:text-primary"
              )}
          >
              <LogOut className="h-4 w-4" />
              <span className="text-gray-600">Logout</span>
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
}