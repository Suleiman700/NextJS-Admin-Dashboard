import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/users";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // GitHub,
    CredentialsProvider({
        // id: "credentials",
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            const user = await getUserByEmail(credentials.email);
            console.log('user here', user);
            if (!user) return null;

            const ok = await bcrypt.compare(credentials.password, user.password);
            if (!ok) return null;

            return {
                id: user.id.toString(), // Ensure id is string
                username: user.username,
                email: user.email
            };
        }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        // When the user logs in, add info to token
        if (user) {
            token.id = user.id;
            token.username = user.username;
            token.email = user.email;
        }
        return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/login', // Optional: customize sign-in page
    error: '/auth/error', // Optional: customize error page
  },
});
