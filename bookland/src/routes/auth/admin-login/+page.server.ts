import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signIn } from '$lib/auth';

export const load = (async () => {
    return {

    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async (event) => {

        // const formData = await event.request.formData();
        // const { email, password } = { email: formData.get('email')?.toString(), password: formData.get('password')?.toString() }

        // console.log(email, password);

        // const signInResult = await signIn(event);

        // console.log(signInResult)
        // const signInResult = await signIn('credentials', { email, password })
        // signIn('credentials', { email, password })

        // return {
        //     success: true
        // }
    }
};