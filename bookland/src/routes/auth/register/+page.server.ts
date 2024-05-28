import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async function({ request, cookies}) {
        
        const formData = await request.formData();
        const registrationDetails = { email: formData.get('email')?.toString(), password: formData.get('password')?.toString(), name: formData.get('name')?.toString() }

        console.log('Registration Details', registrationDetails)
        
        return {
            success: true
        }
    }
};