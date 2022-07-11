import { Keys } from '@src/app/interfaces/Keys';
import { SignTokenOptions, Token } from '@src/app/interfaces/Token';
import { Files } from '@src/app/utils/Files';

import {sign, verify} from 'jsonwebtoken';

export class JwtToken<DP = any> implements Token {
    constructor (
        protected readonly keys: Keys = {
            public: new Files().read(process.env.TOKENS_PUBLIC_KEY || ''),
            private: new Files().read(process.env.TOKENS_PRIVATE_KEY || ''),
            passphrase: process.env.TOKENS_KEY_PASSPHRASE || '',
        },
    ) {
        this.sign = this.sign.bind(this);
        this.verify = this.verify.bind(this);
    }

    sign<P = DP>(data: P, options?: SignTokenOptions | undefined): string {
        const opt: any = {
            algorithm: 'RS256',
            ...options,
        };
        return sign(<any>data, {
            key: this.keys.private,
            passphrase: this.keys.passphrase || '',
        }, opt);
    }

    verify<P = DP>(token: string): P | false {                
        try {
            return <any>verify(token, this.keys.public, {
                algorithms: ['RS256'],
            });
        } catch (err: any) {
            return false;
        }
    }
}

export const JwtTokenInstance = new JwtToken();