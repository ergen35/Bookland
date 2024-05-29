import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    
    const filieres = prisma.filiere.findMany();
    
    return {
        filieres
    };
}) satisfies PageServerLoad;