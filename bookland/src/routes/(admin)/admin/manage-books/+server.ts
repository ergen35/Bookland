import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {

    const bookData: {
        title: string,
        author: string,
        universiteId: number,
        cycleId: number,
        filiereId: number,
        fileName: string,
        overseerName: string,
        pageCount: number,
        pricingModel: 'Free' | 'Paid',
        price: number,
        createdAt: string
    } = await request.json();

    console.log(bookData)

    try {

        const book = await prisma.book.create({
            data: {
                author: bookData.author,
                creationYear: bookData.createdAt,
                pageCount: Number(bookData.pageCount),
                price: Number(bookData.price),
                overseer: bookData.overseerName,
                title: bookData.title,
                cycleId: Number(bookData.cycleId),
                filiereId: Number(bookData.filiereId),
                universiteId: Number(bookData.universiteId),
                pricingModel: bookData.pricingModel,
                pdfFile: bookData.fileName
            }
        });

        return new Response(JSON.stringify(book), { status: 201 })

    } catch (error) {

        console.log(error);
        
        return new Response(JSON.stringify({ message: "An Error occured", error }), { status: 500 });
    }
};