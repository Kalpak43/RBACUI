# RBACUI

This is a simple UI for managing user roles and permissions in a system. It is built using React and shadcn. 

## Installation

1. Clone the repository
2. Run `npm install --legacy-peer-deps` (used --legacy-peer-deps because shadcn does not support latest versions of Nextjs and React) to install the dependencies.
3. Run `npm run dev` to start the development server.

## Features
1. **Home Page**: Simple landing page with a login option.
2. **Login Page**: Login page with a form to enter email and password.
3. **Dashboard Page**: The main dashboard page which shows the overview of the roles and users in the system.
4. **Users Page**: A page to manage users in the system. You can add, edit and delete users. Has options to add users from a CSV file. Also, lets you filter users based on roles and status.(Accessible to only admin and editor role)
5. **Permissions Page**: Lets you manage permissions. You can add permissions based on roles or assign permissions to users directly. (Accessible to only admin role)

## Tech Stack
1. **React**: Frontend library for building user interfaces.
2. **Nextjs**: React framework for building server-side rendered applications.
3. **Shadcn**: A simple UI library for React.
4. **Next Serverless Functions**: Used for creatign mock API requests.


