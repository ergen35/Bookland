import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {
    
    const bookId = new URL(request.url).searchParams.get('book');
    
    if(Number(bookId)) {

        const book = await prisma.book.findFirst({
            where: {
                id: Number(bookId)
            }
        })

        return {
            book
        }

    }

    return {
        book: null
    };
}) satisfies PageServerLoad;