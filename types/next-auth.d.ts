import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     id_token?: string;
//     provider?: string;
//     accessToken?: string;
//   }
// }
