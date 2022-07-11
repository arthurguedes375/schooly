import { SessionManager } from '@src/app/interfaces/Session';
import { Token } from '@src/app/interfaces/Token';

import {JwtToken} from '@src/app/Repositories/Token/Jwt';
import { Cache } from '@src/app/interfaces/Cache';
import {v4 as uuid} from 'uuid'; 
import { RedisClient } from '../Cache/Redis';

export interface SessionTokenPayload {
    token_id: string,
    user_id: string,
    is_otp: boolean,
    usage_limit: number,
}
export type SessionsState = 'tokenHasBeenExploited' | 'doesNotMatchOtp' | 'valid' | 'needsToBeUpdated' | 'invalidToken';

class TokenSessionManager implements SessionManager {
    constructor (
        protected readonly TokenInstance: Token<SessionTokenPayload>,
        protected readonly CacheInstance: Cache,
    ) {}
    async create_session(user_id: string, is_otp: boolean): Promise<string> {
        const usage_limit = Number(process.env.TOKEN_USAGE_LIMIT);
        const expiresIn = Number(process.env.TOKEN_EXPIRATION_TIME);
        const payload = {
            token_id: uuid(),
            user_id,
            is_otp,
            usage_limit,
        };
        await this.CacheInstance.set(`${payload.user_id}:${payload.token_id}`, '' + payload.usage_limit, expiresIn);
        return this.TokenInstance.sign(payload, {
            expiresIn,
        });
    }
    // async validate_session(token: string, is_otp: boolean): Promise<SessionsState> {
    //     const payload = this.TokenInstance.verify<SessionTokenPayload>(token);
    //     if (payload === false) {
    //         return 'invalidToken';
    //     }
    //     console.log(payload.is_otp);
        
    //     // if (is_otp !== payload.is_otp) {

    //     // }
    // }
}

export default new TokenSessionManager(new JwtToken(), RedisClient);