import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter"
import credentials from "@auth/sveltekit/providers/credentials"
import { compare, hash } from 'bcrypt'
import { env } from "$env/dynamic/private"
import { prisma } from '$lib/server/prisma'
import type { UserInfos } from "./models"



export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        credentials({
            type: 'credentials',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials, request) => {

                let user: UserInfos | null = null

                const passwordHash = await hash(new String(credentials.password).toString(), env.AUTH_SECRET);

                const userAccount = await prisma.account.findFirst({
                    where: {
                        passwordHash: passwordHash,
                    },
                    include: {
                        user: {
                            where: {
                                email: new String(credentials.email).toString()
                            }
                        }
                    }
                });

                if (!userAccount) {
                    throw new Error("User not found");
                }

                user = {
                    accountId: userAccount.id,
                    userId: userAccount.user?.id,
                    email: userAccount.user?.email,
                    name: userAccount.user?.name,
                    role: userAccount.role
                }

                return user;
            },
        }),
    ],
})