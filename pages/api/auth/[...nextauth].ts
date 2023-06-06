import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
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
    // ...add more providers here
  ],
  secret: "mc2MpwHT15fGRsoPVrMl6BGF1BEkU3EoxjsXsEec+E8=",
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // https://stackoverflow.com/questions/74785412/nextauth-type-error-property-accesstoken-does-not-exist-on-type-session
      session.accessToken = token.accessToken;

      if (session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
