import { prisma } from '$lib/server/prisma';
import { taskDelay } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    
    const categories = prisma.filiere.findMany()
    const books = prisma.book.findMany({
        take: 25
    });
        
    return {
        categories,
        books
    };
}) satisfies PageServerLoad;