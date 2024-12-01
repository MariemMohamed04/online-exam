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
    signIn: "/signin", 
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

  //   // async jwt({ token, user, account }: any) {
  //   //   if (user) {
  //   //     token.token = (user as any).token;
  //   //     token.id = (user as any).id;
  //   //     token.email = (user as any).email;
  //   //     token.provider = user.provider;
  //   //   }
  //   //   return token;
  //   // },
  //   async jwt({ token, user, account }: any) {
  //     if (user && account) {
  //       token.provider = account.provider; 
  //       console.log('account.provider', account.provider)
  //       console.log('token.provider', token.provider)// Set the provider from account info
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: any) {
  //     if (token) {
  //       session.token = (token as any).token;
  //       session.provider = token.provider;
  //       // session.id = token.id;
  //       // session.email = token.email;
  //       console.log(session.token);
  //       console.log(session.provider);
        
        
  //     }
  //     return session;
  //   },
  // },
  
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account && account.provider) {
        token.provider = account.provider; 
        console.log("OAuth Login - Provider:", account.provider);
      } else if (user) {
        token.provider = "credentials";
        token.token = user.token;
        console.log("Credentials Login - Provider: credentials");
      }
      return token;
    },
    async session({ session, token }: any) {
      session.token = token.token;
      session.provider = token.provider;
      console.log("Session Data - Provider:", session.provider);
      console.log("Session Data - token:", session.token);
      return session;
    },
  },
  
  
};