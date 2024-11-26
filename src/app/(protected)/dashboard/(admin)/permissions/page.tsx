"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: string;
  status: "active" | "inactive";
  allow?: string[];
}

interface ApiResponse {
  users: User[];
  permissions: string[];
  roleBasedPermissions: Record<string, string[]>;
}

export default function PermissionEditor() {
  const [users, setUsers] = useState<User[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, string[]>
  >({});
  const [userPermissions, setUserPermissions] = useState<
    Record<number, string[]>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/permissions");
        if (!response.ok) {
          throw new Error("Failed to fetch permissions");
        }
        const data: ApiResponse = await response.json();
        setUsers(data.users);
        setPermissions(data.permissions);
        setRolePermissions(data.roleBasedPermissions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRolePermissionChange = (role: string, permission: string) => {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: prev[role].includes(permission)
        ? prev[role].filter((p) => p !== permission)
        : [...prev[role], permission],
    }));
  };

  const handleUserPermissionChange = (userId: number, permission: string) => {
    setUserPermissions((prev) => ({
      ...prev,
      [userId]: prev[userId]?.includes(permission)
        ? prev[userId].filter((p) => p !== permission)
        : [...(prev[userId] || []), permission],
    }));
  };

  const searchUser = () => {
    const user = users.find(
      (u) => u.id.toString() === searchTerm || u.email === searchTerm
    );
    setSelectedUser(user || null);
  };

  const getUserPermissions = (user: User) => {
    const rolePerms = rolePermissions[user.role] || [];
    const userPerms = userPermissions[user.id] || [];
    return [...new Set([...rolePerms, ...userPerms])];
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Role-based Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(rolePermissions).map(([role, rolePerms]) => (
            <div key={role} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{role}</h3>
              <div className="flex flex-wrap gap-4">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${role}-${permission}`}
                      checked={rolePerms.includes(permission)}
                      onCheckedChange={() =>
                        handleRolePermissionChange(role, permission)
                      }
                    />
                    <Label htmlFor={`${role}-${permission}`}>
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User-specific Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search user by ID or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={searchUser}>Search</Button>
          </div>
          {selectedUser && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {selectedUser.username} ({selectedUser.role})
              </h3>
              <div className="flex flex-wrap gap-4">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`user-${selectedUser.id}-${permission}`}
                      checked={getUserPermissions(selectedUser).includes(
                        permission
                      )}
                      onCheckedChange={() =>
                        handleUserPermissionChange(selectedUser.id, permission)
                      }
                      disabled={rolePermissions[selectedUser.role].includes(
                        permission
                      )}
                    />
                    <Label htmlFor={`user-${selectedUser.id}-${permission}`}>
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Permissions Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{getUserPermissions(user).join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
