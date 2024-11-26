export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: string;
  status: "active" | "inactive";
  allow?: string[];
}

export const users: User[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@email.com",
    password: "admin",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    username: "editor1",
    email: "editor1@email.com",
    password: "editor1",
    role: "editor",
    status: "active",
  },
  {
    id: 3,
    username: "editor2",
    email: "editor2@email.com",
    password: "editor2",
    role: "editor",
    status: "active",
  },
  {
    id: 4,
    username: "editor3",
    email: "editor3@email.com",
    password: "editor3",
    role: "editor",
    status: "inactive",
  },
  {
    id: 5,
    username: "editor4",
    email: "editor4@email.com",
    password: "editor4",
    role: "editor",
    status: "active",
  },
  {
    id: 6,
    username: "editor5",
    email: "editor5@email.com",
    password: "editor5",
    role: "editor",
    status: "active",
  },
  {
    id: 7,
    username: "user1",
    email: "user1@email.com",
    password: "user1",
    role: "user",
    status: "active",
  },
  {
    id: 8,
    username: "user2",
    email: "user2@email.com",
    password: "user2",
    role: "user",
    status: "active",
  },
  {
    id: 9,
    username: "user3",
    email: "user3@email.com",
    password: "user3",
    role: "user",
    status: "active",
  },
  {
    id: 10,
    username: "user4",
    email: "user4@email.com",
    password: "user4",
    role: "user",
    status: "active",
  },
  {
    id: 11,
    username: "user5",
    email: "user5@email.com",
    password: "user5",
    role: "user",
    status: "active",
  },
];

export const permissions: string[] = ["create", "read", "update", "delete"];

export const roleBasedPermissions: Record<string, string[]> = {
  admin: permissions,
  editor: ["read", "update"],
  user: [""],
};
