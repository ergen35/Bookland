import { prisma } from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';
import type { SessionInfos } from './lib/models';




export const handle: Handle = async ({ event, resolve }) => {

    const authCookie = event.cookies.get('bookand_lauth' || '');

    if (authCookie) {
        const sessionHash = JSON.parse(authCookie);

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
                    name: session.user.name,
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