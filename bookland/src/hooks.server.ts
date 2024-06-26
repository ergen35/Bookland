import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';
import type { SessionInfos } from './lib/models';
import { taskDelay } from '$lib/utils';
import { createAdmin } from '$lib/auth';
import { registerDefaultSettings } from '$lib/server/data-seeding';


if (true) {
    //create default admin if no admin
    const adminsCount = await prisma.account.count({
        where: {
            role: 'admin'
        }
    });

    console.log("There is currently ", adminsCount, " Admins");

    if (adminsCount <= 0) {

        console.log("There is currently no admin | creating default admin...")
        await createAdmin("admin fritz", "admin@gmail.com", "admin");
    }
}

await registerDefaultSettings();


export const handle: Handle = async ({ event, resolve }) => {

    const authCookie = event.cookies.get('bookland_auth' || '');

    if (authCookie) {

        const sessionHash = authCookie;

        // console.log("Session Hash: ", sessionHash);

        if (sessionHash) {
            const session = await prisma.session.findFirst({
                where: {
                    sessionToken: sessionHash
                },
                include: {
                    user: {
                        include: {
                            Account: {
                                select: {
                                    role: true,
                                    id: true,
                                }
                            }
                        }
                    }
                }
            })


            if (session && session.user && session.user.Account) {
                //TODO: add some more cookies for accessibility
                // event.cookies.set('', '')

                const userInfos: SessionInfos = {
                    accountId: session.user.Account?.id,
                    email: session.user.email,
                    name: session.user.fullname,
                    role: session.user.Account?.role,
                    userId: session.userId,
                    sessionId: session.id,
                    sessionExpires: session.expires
                }

                event.locals.user = userInfos
            }
        }
    }

    if (!event.locals.user) {
        event.locals.user = null
    }

    return resolve(event);
};