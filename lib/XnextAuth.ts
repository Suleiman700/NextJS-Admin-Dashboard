import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/lib/users";
import bcrypt from "bcryptjs";

const debug = true;

function log(...args: any[]) {
    if (debug) console.log("[Auth Debug]:", ...args);
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
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
                // console.log(user);

                if (!user) return null;

                const ok = await bcrypt.compare(credentials.password, user.password);
                if (!ok) return null;

                return {
                    id: user.id.toString(), // Ensure id is string
                    name: user.name,
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
                token.email = user.email;
                token.name = user.name;
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
};