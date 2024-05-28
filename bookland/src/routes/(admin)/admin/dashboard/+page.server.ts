import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const booksCount = await prisma.book.count();
    const cyclesCount = await prisma.cycle.count();
    const filieresCount = await prisma.filiere.count();
    const usersCount = await prisma.account.count({
        where: {
            role: 'basic'
        }
    });
    const universiteCount = await prisma.universite.count();

    return {
        booksCount: booksCount,
        cyclesCount: cyclesCount,
        filieresCount: filieresCount,
        usersCount: usersCount,
        universiteCount: universiteCount,
    };
}) satisfies PageServerLoad;