import {RouterFunction, Request, Response} from '@app/interfaces/Router';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { SignIn, SignUp } from '../filters/User';
import { SessionManager } from '../interfaces/Session';
import { prisma } from '../Repositories/DB/client';

export interface UserSigninData {
    email: string,
    password: string,
}

interface IUserController {
    signup: RouterFunction<User>,
    signin: RouterFunction<UserSigninData>,
}

export class UserController implements IUserController {
    constructor(
        protected readonly SessionManagerInstance: SessionManager,
    ) {
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
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

            const session_id = await this.SessionManagerInstance.create_session(user.id, false);            

            return res.status(201).json({
                ...user,
                session_id,
            });
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }

    async signin(req: Request<UserSigninData>, res: Response) {
        try {
            const {valid, sanitizedFields} = await SignIn(req.body);

            const invalid_message = (res: any) => {
                return res.status(401).json({ message: 'The e-mail or password is wrong.' });
            };

            if (!valid) {
                return invalid_message(res);
            }

            const user_data = await prisma.user.findFirst({
                where: {
                    email: sanitizedFields.email,
                },
                select: {
                    password: true,
                    id: true,
                },
            });

            if (!user_data) {
                return invalid_message(res);
            }

            const is_password_valid = await compare(sanitizedFields.password, user_data.password);

            if (!is_password_valid) {
                return invalid_message(res);
            }

            // The password and the email have been validated
            const session_id = await this.SessionManagerInstance.create_session(user_data.id, false);

            return res.status(201).json({session_id});     
        } catch (error) {
            console.error(error);
            throw new Error('Internal Server Error');
        }
    }
}