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


    // const universites = prisma.universite.findMany();
    // const filieres = prisma.filiere.findMany();
    // const cycles = prisma.cycle.findMany();

    const allData = Promise.all([prisma.universite.findMany(), prisma.filiere.findMany(), prisma.cycle.findMany()])


    console.log("fetching page ", page)

    return {
        books,
        allData
    };
}) satisfies PageServerLoad;