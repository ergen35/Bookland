import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, locals, request }) => {

    cookies.delete("bookland_auth", {
        path: "/",
        expires: new Date(1980, 1, 1)
    })

    locals.user = null;

    console.log("Loging out")

    return new Response();
};