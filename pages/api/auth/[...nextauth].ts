import NextAuth, { EventCallbacks } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { error } from "console";

type IUserData = {
  name: string;
  email: string;
  location: string;
  gender: string;
};

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 1 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      async authorize(credentials, req) {
        let user: Partial<IUserData> = {};

        if (credentials) {
          if (
            credentials.email === "johndoe@gmail.com" &&
            credentials.password === "test1234"
          ) {
            user = {
              name: "John Doe",
              email: credentials?.email,
              location: "leyte",
              gender: "Male",
            };
            return user;
          }
          return null;
        }
        return null;
      },
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
