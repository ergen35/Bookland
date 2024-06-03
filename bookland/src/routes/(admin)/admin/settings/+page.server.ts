import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const appSettings = await prisma.appSettings.findFirst({
        include: {
            kkiapaySettings: true
        }
    });

    return {
        appSettings: appSettings
    };
}) satisfies PageServerLoad;