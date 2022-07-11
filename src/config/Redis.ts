import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const RedisConfig = {
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}?db=${process.env.REDIS_DB}`,     
};