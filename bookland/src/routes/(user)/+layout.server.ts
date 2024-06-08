import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    
    const session = locals.user;
    if (session?.role != 'basic') {
        throw error(403, { message: "Vous n'êtes pas autorisé à accéder à cette ressource" })
    }

    return {

    };
}) satisfies LayoutServerLoad;