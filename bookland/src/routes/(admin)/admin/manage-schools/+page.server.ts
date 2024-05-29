import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    
    const schools = prisma.universite.findMany({
        include: {
            _count: true
        }
    });
    
    return {
        schools
    };
}) satisfies PageServerLoad;