import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./prisma";
import Google from "next-auth/providers/google";

// 1. Оголошуємо зміни для типів (Module Augmentation)
declare module "next-auth" {
    // Розширюємо юзера для бази даних
    interface User {
        role?: string;
    }
    // Розширюємо сесію, яку бачить фронтенд
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}

// 2. Основний конфіг
export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true, // 👈 Дозволяє Auth.js довіряти заголовкам проксі Vercel
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.role = user.role || "user";
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const userRole = auth?.user?.role;
            const isOnAdminPage = nextUrl.pathname.startsWith("/admin");

            if (isOnAdminPage) {
                return userRole === "admin";
            }
            return true;
        },
    },
});
