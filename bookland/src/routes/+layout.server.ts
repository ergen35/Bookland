import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {

    const session = await event.locals.auth()

    console.log(session)

    return {
        session
    };
}) satisfies LayoutServerLoad;