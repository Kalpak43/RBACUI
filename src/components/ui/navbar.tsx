"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Users, Shield, Menu, Eye } from "lucide-react";
import { useAuth } from "@/hooks/AuthProvider";
import { usePathname } from "next/navigation";

interface NavbarProps {
  userRole: string;
  userName: string;
  userAvatar?: string;
}

export function Navbar({ userRole, userName, userAvatar }: NavbarProps) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const NavItems = () => (
    <>
      <>
        <Button asChild variant="ghost">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors max-md:justify-start ${
              pathname === "/dashboard"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Eye className="mr-2 h-4 w-4" />
            Overview
          </Link>
        </Button>
        {/* Users button visible to admin and editor */}
        {(userRole === "admin" || userRole === "editor") && (
          <Button asChild variant="ghost">
            <Link
              href="/dashboard/users"
              className={`text-sm font-medium transition-colors max-md:justify-start ${
                pathname === "/dashboard/users"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </Button>
        )}
        {userRole === "admin" && (
          <Button asChild variant="ghost">
            <Link
              href="/dashboard/permissions"
              className={`text-sm font-medium transition-colors max-md:justify-start ${
                pathname === "/dashboard/permissions"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Shield className="mr-2 h-4 w-4" />
              Permissions
            </Link>
          </Button>
        )}
      </>
    </>
  );

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetTitle>RBACUI</SheetTitle>
            <nav className="flex flex-col space-y-4 py-10">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <NavItems />
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userRole}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="ghost" onClick={logout} className="w-full">
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
