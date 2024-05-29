import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    
    const cycles = prisma.cycle.findMany();
    
    return {
        cycles
    };
}) satisfies PageServerLoad;