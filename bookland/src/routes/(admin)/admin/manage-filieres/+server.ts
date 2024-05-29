import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
   
    const { name } = await request.json();

    if(name){

        const filiere = await prisma.filiere.create({
            data: {
                name: name
            }
        });

        if(filiere){
            return new Response(JSON.stringify(filiere), { status: 201 })
        }
    }
    
    throw error(400, { message: "Filiere name required" })

};