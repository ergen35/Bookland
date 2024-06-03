import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {

    const { publicKey, secretKey, privateKey }: { publicKey: string, secretKey: string, privateKey: string } = await request.json();

    //make validation
    const existingSettings = await prisma.appSettings.findFirst({
        include: {
            kkiapaySettings: true
        }
    });

    if (!existingSettings) {

        const kkiapaySettings = await prisma.appSettings.create({
            data: {
                kkiapaySettings: {
                    create: {
                        publicKey,
                        privateKey,
                        secretKey
                    }
                }
            }
        });

        if (kkiapaySettings) {
            return new Response("Ok", { status: 201 })
        }
    }
    else {
        const updatedSettingds = await prisma.appSettings.update({
            where: { id: existingSettings.id },
            data: {
                kkiapaySettings: {
                    upsert: {
                        create: {
                            publicKey,
                            privateKey,
                            secretKey
                        },
                        update: {
                            publicKey,
                            privateKey,
                            secretKey
                        },
                        where: {
                            id: existingSettings.kkiapaySettingsId
                        }
                    }
                }
            }
        })

        if(updatedSettingds){
            return new Response("Ok", { status: 200 })
        }
    }

    return new Response("Unknown error", { status: 500 });
};