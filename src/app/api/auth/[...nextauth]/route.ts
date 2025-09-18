import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add your authentication logic here
        const user = { id: "1", name: "John Doe", email: credentials?.email }
        
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)