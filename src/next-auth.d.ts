/* eslint-disable @typescript-eslint/no-unused-vars */
// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    id: string;
    email: string;
    username?: string;
    
  }

  interface Session {
    token: string;
    provider?: string;
    user?: User;
  }
}

