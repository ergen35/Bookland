import bcryptjs from 'bcryptjs';
import { prisma } from './server/prisma';
import jsonwebtoken from 'jsonwebtoken';
import moment from 'moment';
import { env } from '$env/dynamic/private';


export const createAdmin = async function(fullname: string, email: string, password: string) {

    //check if email not used
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    if (existingUser) {
        return null;
    }

    // create user
    const user = await prisma.user.create({
        data: {
            email: email,
            fullname: fullname,
            image: '',
        }
    })

    //create account
    const passwordHash = await bcryptjs.hash(password, bcryptjs.genSaltSync(10))
    const account = await prisma.account.create({
        data: {
            userId: user.id,
            passwordHash: passwordHash,
            role: 'admin',
        }
    });

    if (!user || !account) {
        console.log("une erreur inconnue s'est produite")
        return null;
    }

    //create session token
    const sessionToken = jsonwebtoken.sign({ accountId: account?.id, userId: account?.userId }, env.AUTH_SECRET, {
        algorithm: 'HS256',
        issuer: 'bookland.srv',
        expiresIn: '1d',
        audience: 'bookland.app'
    });

    //create session
    const userSession = await prisma.session.create({
        data: {
            expires: moment(new Date()).add(1, 'day').toDate(),
            sessionToken: sessionToken,
            userId: account.userId,
        }
    });


    return user && account && userSession
}