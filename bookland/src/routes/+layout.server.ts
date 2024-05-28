import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {

    const sessionInfos = await event.locals.user

    console.log("session infos:", sessionInfos)

    return {
        session: sessionInfos
    };
}) satisfies LayoutServerLoad;