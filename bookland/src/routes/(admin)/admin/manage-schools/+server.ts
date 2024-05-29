import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {

    const { name } = await request.json();

    if(name){

        const school = await prisma.universite.create({
            data: {
                name: name
            }
        });

        if(school){
            return new Response(JSON.stringify(school), { status: 201 })
        }
    }
    
    throw error(400, { message: "School name required" })
};