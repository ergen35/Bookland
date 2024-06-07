import { prisma } from '$lib/server/prisma';
import { writeFile } from 'fs/promises';
import type { RequestHandler } from './$types';
import { writeFileSync } from 'fs';

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
        createdAt: string,
        tags: Array<string>
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
                pdfFile: bookData.fileName,
                tags: bookData.tags.join("|"),
            }
        });

        return new Response(JSON.stringify(book), { status: 201 })

    } catch (error) {

        console.log(error);
        
        return new Response(JSON.stringify({ message: "An Error occured", error }), { status: 500 });
    }
};


export const DELETE: RequestHandler = async ({ request }) => { 

    const bookId = new URL(request.url).searchParams.get('id');
    console.log("book id", bookId)
    
    if(bookId && Number(bookId)){
        
        const result = await prisma.book.delete({
            where: {
                id: Number(bookId)
            }
        });
        
        console.log(result)

        if(result){
            return new Response();
        }
    }

    console.log("Book Id is invalid")

    return new Response(JSON.stringify({ message: "Bad Request" }), { status: 400 })
}


export const PUT: RequestHandler = async ({ request }) => { 

    const bookId = new URL(request.url).searchParams.get('id');
    console.log("book id", bookId)
    
    if(bookId && Number(bookId)){
        
        const book = await prisma.book.findFirst({
            where: {
                id: Number(bookId)
            }
        });

        const formData = await request.formData();
        const bookFile = formData.get('file') as File;
        
        console.log("Book size: ", bookFile.size)

        const buffer = Buffer.from(await bookFile.arrayBuffer())        
        await writeFile("static/" + book?.pdfFile, buffer);


        if(book){
            return new Response();
        }
    }

    return new Response(JSON.stringify({ message: "Bad Request" }), { status: 400 })
}