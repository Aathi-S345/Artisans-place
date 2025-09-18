// In /app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would normally connect to your database to find a user.
        // For this example, we will use mock data.

        const adminEmail = "admin@example.com";
        const customerEmail = "customer@example.com";

        // Check if the logging-in user is the designated admin
        if (credentials?.email === adminEmail) {
          // If it is the admin, return a user object with the 'admin' role
          return { 
            id: "1", 
            name: "Admin User", 
            email: adminEmail, 
            role: "admin" 
          };
        }
        
        // Example for a regular customer
        if (credentials?.email === customerEmail) {
          return { 
            id: "2", 
            name: "Customer User", 
            email: customerEmail, 
            role: "customer" // Assign a different role
          };
        }

        // If the user is not found, return null to deny login
        return null;
      }
    })
  ],
  // ... your callbacks
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };