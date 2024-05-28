import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import bcryptjs from 'bcryptjs';
import moment from 'moment';
import jsonwebtoken from 'jsonwebtoken'
import { env } from '$env/dynamic/private';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {

        const formData = await event.request.formData();
        const { email, password } = { email: formData.get('email')?.toString(), password: formData.get('password')?.toString() }

        if (!email || !password) {
            return fail(400, { error: "Email & Password are required" })
        }

        const userAccount = await prisma.account.findFirst({
            where: {
                user: {
                    email: email
                }
            }
        });

        if (!userAccount) {

            console.log("User account not found")

            return fail(404, { error: "Informations de connexion invalides" })
        }

        //existing session
        const userSession = await prisma.session.findFirst({
            where: {
                userId: userAccount?.id,
                expires: {
                    gte: new Date()
                }
            }
        });

        if (userSession) {

            console.log("Existing session found")

            //extends session
            await prisma.session.update({
                where: {
                    id: userSession.id
                },
                data: {
                    expires: moment(userSession.expires).add(7, 'days').toDate(),
                    updatedAt: new Date(),
                }
            });

            event.cookies.set('bookland_auth', userSession.sessionToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 72 // three days
            })

            //get user's type
            console.log("user role is: ", userAccount?.role)

            if (userAccount?.role == 'admin') {
                return redirect(301, '/admin-dashboard')
            }

            return redirect(301, '/account')
        }
        else {
            //no existing session found

            //compared passwords hashes
            if (await bcryptjs.compare(password, userAccount?.passwordHash!)) {

                //create session
                const sessionToken = jsonwebtoken.sign({ accountId: userAccount?.id, userId: userAccount?.userId }, env.AUTH_SECRET, {
                    algorithm: 'HS256',
                    issuer: 'bookland.srv',
                    expiresIn: '7d',
                    audience: 'bookland.app'
                });

                const userSession = await prisma.session.create({
                    data: {
                        expires: moment(new Date()).add(7, 'days').toDate(),
                        sessionToken: sessionToken,
                        userId: userAccount?.userId!,
                    }
                });

                event.cookies.set('bookland_auth', userSession.sessionToken, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 72 // three days
                })

                //get user's type
                console.log("user role is: ", userAccount?.role)

                if (userAccount?.role == 'admin') {
                    return redirect(301, '/admin-dashboard')
                }

                return redirect(301, '/account')
            }
        }
    }
};