import {Factory, Schema} from 'fields-validator-repo';
import {User} from '@prisma/client';
import { validate_id, generate_id } from './id';
import isEmail from 'validator/lib/isEmail';

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
        profile_picture: {
            required: false,
            filters: [
                validate_id,
            ],
        },
    };

    return Factory(schema, data).runFields();
};