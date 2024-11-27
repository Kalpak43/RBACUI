# RBACUI

This is a simple UI for managing user roles and permissions in a system. It is built using React and shadcn. 

## Installation

1. Clone the repository
2. Run `npm install --legacy-peer-deps` (used --legacy-peer-deps as most libraries do not support React 19 as of yet) to install the dependencies.
3. Run `npm run dev` to start the development server.

## Features
1. **Home Page**: Simple landing page with a login option.
2. **Login Page**: Login page with a form to enter email and password.
3. **Dashboard Page**: The main dashboard page which shows the overview of the roles and users in the system.
4. **Users Page**: A page to manage users in the system. You can add, edit and delete users. Has options to add users from a CSV file. Also, lets you filter users based on roles and status.(Accessible to only admin and editor role)
5. **Permissions Page**: Lets you manage permissions. You can add permissions based on roles or assign permissions to users directly. (Accessible to only admin role)

## Mock API
1. **/api/login**: Mock API for login. Accepts email and password and returns user details.
2. **/api/all-users**: Mock API for getting list of all users.
3. **/api/update-user**: Mock API for updating user info. If user is not found, it creates a new user.
4. **/api/upload-csv**: Mock API for uploading a CSV file to add users.
5. **/api/permissions**: Mock API for getting permissions.
6. **/api/get-numbers**: Mock API for getting the number of users by roles, status and permissions in the system.

## Tech Stack
1. **React**: Frontend library for building user interfaces.
2. **Nextjs**: React framework for building server-side rendered applications.
3. **Shadcn**: A simple UI library for React.
4. **Next Serverless Functions**: Used for creatign mock API requests.

## Login Credentials (For testing)
1. **Admin**:
    - Email: admin@email.com
    - Password: admin
2. **Editor**:
    - Email: editor1@email.com
    - Password: editor1
3. **User**:
    - Email: user1@email.com
    - Password: user1


