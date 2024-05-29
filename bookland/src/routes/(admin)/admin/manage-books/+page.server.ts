import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ request }) => {

    const pageQuery = new URL(request.url).searchParams.get('page');
    let page = 1;

    if(pageQuery && Number.isInteger(pageQuery)){
        page = Number.parseInt(pageQuery);
    }


    const books = prisma.book.findMany({
        skip: page <= 1 ? 0 : (page - 1) * 20,
        take: 20
    });

    console.log("fetching page ", page)

    return {
        books
    };
}) satisfies PageServerLoad;