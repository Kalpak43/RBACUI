// lib/userResource.ts
export function createUserResource(fetcher: () => Promise<any[]>) {
  let status = "pending";
  let result: any;

  const suspender = fetcher().then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

// Fetch function
async function fetchUsers() {
  const response = await fetch("/api/all-users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: "admin", email: "admin@email.com" }),
  }); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// Create resource
export const userResource = createUserResource(fetchUsers);
