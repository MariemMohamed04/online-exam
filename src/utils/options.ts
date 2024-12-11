/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

import axios from "axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin", 
  },
  session: {
    strategy: "jwt"
  },
  debug: true,
  providers: [

    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: "2.0",
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
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
      async profile(profile: any, tokens: any) {
        console.log("Google profile:", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          token: tokens?.access_token || null, 
        };
      },
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials!;
        try {
          const { data } = await axios.post("https://exam.elevateegy.com/api/v1/auth/signin", {
            email,
            password,
          });

          if (data.message === "success") {
            console.log('Data: ',data);
            return data;
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
    async jwt({ token, user }) {
      // console.log('all user data' , user );
      return { ...token , ...user };
    },

    async session({ session, token }) {
      // console.log('all user session' , session );
      return { ...session , ...token };
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};