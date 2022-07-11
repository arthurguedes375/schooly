import {Factory, Schema} from 'fields-validator-repo';
import {User} from '@prisma/client';
import { validate_id, generate_id } from './id';
import isEmail from 'validator/lib/isEmail';

import {hash} from 'bcrypt';
import { UserSigninData } from '../controllers/User';

export const SignUp = (data: User) => {
    const schema: Schema = {
        id: {
            required: false,
            filters: [
                generate_id,
            ],
        },
        email: {
            required: true,
            maxLength: 100,
            filters: [
                {
                    type: 'validate',
                    filter: isEmail,
                    failMessage: 'You need to pass a valid email',
                },
            ],
        },
        first_name: {
            required: true,
            maxLength: 30,
        },
        last_name: {
            required: true,
            maxLength: 70,
        },
        password: {
            required: true,
            maxLength: 70,
            filters: [
                {
                    type: 'sanitize',
                    filter: async (password) => {
                        return await hash(password, Number(process.env.PASSWORD_SALT));
                    },
                },
            ],
        },
        profile_picture: {
            required: false,
            filters: [
                validate_id,
            ],
        },
    };

    return Factory(schema, data).runFields();
};

export const SignIn = (data: UserSigninData) => {
    const schema: Schema = {
        email: {
            maxLength: 100,
            filters: [
                {
                    type: 'validate',
                    filter: isEmail,
                },
            ],
        },
        password: {
            maxLength: 70,
        },
    };

    return Factory(schema, data).runFields();
};