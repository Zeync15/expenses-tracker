export { default } from "next-auth/middleware";

export const config = { matcher: ["/expenses/:path*", "/income/:path*"] };
