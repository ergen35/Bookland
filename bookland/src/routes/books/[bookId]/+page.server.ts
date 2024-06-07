import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ request, params }) => {
    
    const id = params.bookId;
    if(Number(id)){

        const book = await prisma.book.findFirst({
            where: {
                id: Number(id)
            }
        });
        
        if(book){
            return {
                book
            };
        }
    }

    throw error(404, "Livre introuvable")

}) satisfies PageServerLoad;