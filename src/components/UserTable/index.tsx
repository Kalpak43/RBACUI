import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, Save, X, Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onUserUpdate: (updatedUser: User) => Promise<void>;
}

export function UserTable({ users, onUserUpdate }: UserTableProps) {
  console.log(users[0])
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editedUser, setEditedUser] = React.useState<User | null>(null);
  const [showPassword, setShowPassword] = React.useState<{
    [key: number]: boolean;
  }>({});
  const [loading, setLoading] = React.useState<{ [key: number]: boolean }>({});

  const handleEditClick = (user: User) => {
    if (editingId === user.id) {
      setEditingId(null);
      setEditedUser(null);
    } else {
      setEditingId(user.id);
      setEditedUser({ ...user });
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  const handleSave = async () => {
    if (editedUser) {
      setLoading((prev) => ({ ...prev, [editedUser.id]: true }));
      try {
        await onUserUpdate(editedUser);
      } finally {
        setLoading((prev) => ({ ...prev, [editedUser.id]: false }));
        setEditingId(null);
        setEditedUser(null);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedUser(null);
  };

  const togglePasswordVisibility = (userId: number) => {
    setShowPassword((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.id}</TableCell>
              <TableCell>
                {editingId === u.id ? (
                  <Input
                    value={editedUser?.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  />
                ) : (
                  u.username
                )}
              </TableCell>
              <TableCell>
                {editingId === u.id ? (
                  <Input
                    value={editedUser?.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  u.email
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {editingId === u.id ? (
                    <Input
                      type={showPassword[u.id] ? "text" : "password"}
                      value={editedUser?.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                    />
                  ) : (
                    <span className="font-mono bg-muted px-2 py-1 rounded text-sm">
                      {showPassword[u.id]
                        ? u.password || ""
                        : (u.password || "").replace(/./g, "•")}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePasswordVisibility(u.id)}
                    aria-label={
                      showPassword[u.id] ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword[u.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                {editingId === u.id ? (
                  <Select
                    value={editedUser?.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    variant={u.role === "admin" ? "default" : "secondary"}
                  >
                    {u.role}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {editingId === u.id ? (
                  <Select
                    value={editedUser?.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    variant={
                      u.status === "active" ? "active" : "destructive"
                    }
                  >
                    {u.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {editingId === u.id ? (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSave}
                      disabled={loading[u.id]}
                    >
                      {loading[u.id] ? (
                        <Spinner className="mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {/* {loading[user.id] ? "Saving" : "Save"} */}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      disabled={loading[u.id]}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(u)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
