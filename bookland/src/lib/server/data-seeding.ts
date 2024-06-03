import { prisma } from "./prisma";

export async function registerDefaultSettings() {

    const defaultSettings = await prisma.appSettings.findFirst();

    if (defaultSettings) {
        console.log("Settings already exists")
        return;
    }
    else {
        console.log("No default settings");

        const settings = await prisma.appSettings.create({
            data: {
                kkiapaySettings: {
                    create: {
                        privateKey: "priate_key",
                        publicKey: "public_key",
                        secretKey: "secret_key"
                    },
                },
            },
        });

        if (settings) {
            console.log("Created Default Settings succesfully")
        }
    }
}