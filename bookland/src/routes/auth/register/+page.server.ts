import { error, fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import moment from 'moment';
import { env } from '$env/dynamic/private';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async function ({ request, cookies }) {

        const formData = await request.formData();
        const registrationDetails = { email: formData.get('email')?.toString(), password: formData.get('password')?.toString(), fullname: formData.get('fullname')?.toString() }

        if (!registrationDetails.email || !registrationDetails.fullname || !registrationDetails.password) {
            return fail(404, { error: "all fields are required" })
        }

        //check if email not used
        const existingUser = await prisma.user.findFirst({
            where: {
                email: registrationDetails.email
            }
        });

        if (existingUser) {
            return fail(404, { error: 'Email already used' })
        }

        // create user
        const user = await prisma.user.create({
            data: {
                email: registrationDetails.email,
                fullname: registrationDetails.fullname,
                image: '',
            }
        })

        //create account
        const passwordHash = await bcryptjs.hash(registrationDetails.password, bcryptjs.genSaltSync(10))
        const account = await prisma.account.create({
            data: {
                userId: user.id,
                passwordHash: passwordHash,
                role: 'basic',
            }
        });

        if (!user || !account) {
            console.log("une erreur inconnue s'est produite")
            return fail(500, { error: "Erreur inconnue" })
        }

        //create cookie payload
        const sessionToken = jsonwebtoken.sign({ accountId: account?.id, userId: account?.userId }, env.AUTH_SECRET, {
            algorithm: 'HS256',
            issuer: 'bookland.srv',
            expiresIn: '7d',
            audience: 'bookland.app'
        });

        //create session
        const userSession = await prisma.session.create({
            data: {
                expires: moment(new Date()).add(7, 'days').toDate(),
                sessionToken: sessionToken,
                userId: account.userId,
            }
        });

        //set session in cookie
        cookies.set('bookland_auth', userSession.sessionToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 72 // three days
        })

        return redirect(301, "/account")
    }
};