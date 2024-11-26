"use client";

import React, { useEffect, useState } from "react";
import { UserTable } from "@/components/UserTable";
import { useToast } from "@/hooks/use-toast";
import { CSVUpload } from "@/components/CSVUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { UserForm } from "@/components/UserForm";
import { FilterModal } from "@/components/FilterModal";
import { useAuth } from "@/hooks/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [users, setUsers] = useState<
    | {
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        status: string;
      }[]
    | null
  >(null);
  const [filteredUsers, setFilteredUsers] = useState<
    | {
        id: number;
        username: string;
        email: string;
        password: string;
        role: string;
        status: string;
      }[]
    | null
  >(users);
  const [error, setError] = useState<string | null>("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/all-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "admin", email: "admin@email.com" }),
      });
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setError("An error occurred while fetching users");
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });

      setError(null);
    }
  }, [error]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleUserUpdate = async (updatedUser: any) => {
    if (!users) return;

    const response = await fetch("/api/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: updatedUser.id, updatedData: updatedUser }),
    });

    const data = await response.json();

    if (!data.success) {
      setError("An error occurred while updating the user");
    }

    if (data.success) {
      setUsers(data.users);
    }

    isAddUserOpen && setIsAddUserOpen(false);
  };

  const handleCSVUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("CSV upload failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to process CSV");
      }
      setUsers(data.users);
      toast({
        title: "Success",
        description: "User data has been updated from the CSV file.",
      });
    } catch (error: unknown) {
      console.error("Error uploading CSV:", error);
      if (error instanceof Error) {
        setError(error.message || "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleFilter = ({ role, status }: { role: string; status: string }) => {
    if (!users) return;

    const filtered = users.filter((user) => {
      const roleMatch = role ? user.role === role : true;
      const statusMatch = status ? user.status === status : true;
      return roleMatch && statusMatch;
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="container mx-auto py-10 p-8">
      <div className="md:flex items-center justify-between space-y-8 my-2">
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          <FilterModal onFilter={handleFilter} />
        </div>
        {user?.role === "admin" && (
          <div className="flex gap-4">
            <CSVUpload onFileUpload={handleCSVUpload} />
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new user to the system.
                  </DialogDescription>
                </DialogHeader>
                <UserForm onUserAdd={handleUserUpdate} />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      {filteredUsers ? (
        <UserTable users={filteredUsers} onUserUpdate={handleUserUpdate} />
      ) : (
        <Card>
          <CardContent>
            <Skeleton className="h-[500px] w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
