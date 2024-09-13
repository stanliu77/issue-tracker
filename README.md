# Issue Tracker

## Introduction
This is a comprehensive issue tracking system built with **Next.js** as the framework for seamless server-side rendering, **Tailwind CSS** for styling, **Radix UI** for accessible UI components, 
and **Prisma** for database management. Authentication and authorization are handled by **Clerk**, offering integrations with OAuth providers like GitHub and Google.

**Key technologies used:**
-**Next.js** for server-side rendering and API routes
-**Tailwind CSS** for utility-first styling
-**Radix UI** for accessible, customizable UI components
-**Prisma** for managing MySQL database interactions
-**Clerk** for authentication and user management
Below are screenshots that showcase the key features of this application:


### Prerequisites
Ensure you have the following installed in your development environment:
- Node.js
- MySQL

### Setup Instructions
1. **Clone the repository**
   ```
   git clone https://github.com/stanliu77/issue-tracker.git
   cd issue-tracker
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Configure Environment Variables**
Create `.env` and `.env.local` files in the root directory and fill them with the following information:

   **.env file:**
   ```
   DATABASE_URL="mysql://root:your_password@localhost:3306/issue-tracker"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   ```

   **.env.local file:**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_publishable_key"
   CLERK_SECRET_KEY="sk_test_your_secret_key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   ```

4. **Run the Application**
   Start the development server by running:
   ```
   npm run dev
   ```

This command will launch the application on http://localhost:3000
