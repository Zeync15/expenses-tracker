// my-project/types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      id?: string | null | undefined;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
    accessToken?: string;
  }
}
