/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import axios from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin", 
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    //   async profile(profile) {
    //     console.log("Facebook profile:", profile); 
    //     return {
    //         id: profile.id,
    //         name: profile.name,
    //         email: profile.email,
    //         image: profile.avatar_url,
    //     };
    // },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // async profile(profile) {
      //   console.log("Google profile:", profile);
      //   return {
      //     id: profile.sub,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.picture,
      //   };
      // },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        try {
          const response = await axios.post("https://exam.elevateegy.com/api/v1/auth/signin", {
            email,
            password,
          });

          if (response.data.message === "success") {
            const { token, user } = response.data;
            return {
              id: user._id,
              username: user.username,
              email: user.email,
              token,
            };
          }
          return null;
        } catch (error) {
          console.error("Signin error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.token = (user as any).token;
        token.id = (user as any).id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.token = (token as any).token;
        // session.id = token.id;
        // session.email = token.email;
        console.log(session.token);
      }
      return session;
    },
  },
  
  
};