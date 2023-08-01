import axios from "@/lib/axios";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", value: "zeyen15" },
        password: { label: "Password", type: "password", value: "asdqwe123" },
      },
      async authorize(credentials, req) {
        const res = await axios.post("/auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        });

        const user = await res.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log(token, 'line 47')
      session.user = token as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
