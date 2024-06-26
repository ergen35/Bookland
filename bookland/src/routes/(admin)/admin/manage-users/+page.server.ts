import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    
    const usersTask = prisma.user.findMany();

    return {
        usersTask
    };
}) satisfies PageServerLoad;