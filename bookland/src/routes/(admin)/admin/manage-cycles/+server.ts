import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    
    const { name } = await request.json();

    if(name){

        const cycle = await prisma.cycle.create({
            data: {
                name: name
            }
        });

        if(cycle){
            return new Response(JSON.stringify(cycle), { status: 201 })
        }
    }
    
    throw error(400, { message: "Cycle name required" })
};