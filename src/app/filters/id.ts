import {validate, v4} from 'uuid';

export const validate_id: any = {
    type: 'validate',
    filter: validate,
    failMessage: 'You need to pass a valid id',
};

export const generate_id: any = {
    type: 'sanitize',
    filter: (__: string) => v4(),
};