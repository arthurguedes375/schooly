import {RouterFunction, Request, Response} from '@app/interfaces/Router';
import { User } from '@prisma/client';
import { SignUp } from '../filters/User';
import { prisma } from '../Repositories/DB/client';

interface IUserController {
    signup: RouterFunction<User>,
}

export class UserController implements IUserController {
    constructor() {
        this.signup = this.signup.bind(this);
    }

    async signup(req: Request<User>, res: Response) {
        try {            
            const {sanitizedFields, ...validation} = await SignUp({
                ...req.body,
                id: 'n',
            });

            if (!validation.valid) {
                return res.status(400).json(validation.invalidFields);
            }

            const doesEmailExist = await prisma.user.findUnique({
                where: {
                    email: sanitizedFields.email,
                },
                select: {
                    id: true,
                },
            });

            if (doesEmailExist?.id) {
                return res.status(401).json({message: 'Email has already been registered.'});
            }

            const user = await prisma.user.create({
                data: sanitizedFields,
            });

            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }
}