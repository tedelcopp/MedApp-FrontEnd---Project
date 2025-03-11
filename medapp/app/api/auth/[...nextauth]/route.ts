import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const MASTER_USER = process.env.MASTER_USER || "medapp@gmail.com";
        const MASTER_PASS = process.env.MASTER_PASS || "admin1234";

        if (credentials.email === MASTER_USER && credentials.password === MASTER_PASS) {
          return {
            id: "admin",
            name: "Usuario Maestro",
            email: MASTER_USER,
            role: "admin",
          };
        }

        return null; 
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub || "";
        (session.user as any).image = token.picture || session.user.image || null; 
        (session.user as any).role = token.role || "user"; 
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.picture = (user as any).image || (user as any).picture || null;
        token.role = (user as any).role || "user"; 
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
});

export { handler as GET, handler as POST };
