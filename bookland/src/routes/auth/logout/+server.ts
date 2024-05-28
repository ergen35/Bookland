import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, locals, request }) => {

    cookies.delete("bookland_auth", {
        path: "/"
    })

    locals.user = null;

    console.log("Loging out")

    return new Response();
};