import { User } from "@prisma/client";

declare module "#auth-utils" {
  interface UserSession {
    user: Omit<User, "localAccount" | "accounts">;
    loggedInAt: number;
  }
}
export {};
