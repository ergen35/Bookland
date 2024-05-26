import { prisma } from './server/prisma';
export interface UserInfos {
    accountId: string
    userId: string | null | undefined
    name: string | null | undefined
    email: string | null | undefined
    role: "admin" | "basic"
}