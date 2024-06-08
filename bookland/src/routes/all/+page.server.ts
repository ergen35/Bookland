import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const categories = prisma.filiere.findMany()
    const cycles = prisma.cycle.findMany();

    const books = prisma.book.findMany({
        take: 100,
        include: {
            filiere: {
                select: {
                    name: true
                }
            },
            cycle: {
                select: {
                    name: true
                }
            },
            _count: {
                select: {
                    downloadUnits: true
                }
            }
        },
    });

    return {
        categories,
        books,
        cycles
    };

}) satisfies PageServerLoad;