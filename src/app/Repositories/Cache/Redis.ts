import { createClient, RedisClientOptions, RedisClientType } from 'redis';
import { Cache } from '@app/interfaces/Cache';
import {RedisConfig} from '@src/config/Redis';

class Redis implements Cache {
    private readonly client: RedisClientType;
    constructor(
        private readonly options?: Omit<RedisClientOptions<never, Record<string, never>>, 'modules'>,
    ) {        
        this.client = <RedisClientType>createClient(options);
        this.initEvents();

        this.connect = this.connect.bind(this);
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
    }

    private initEvents() {
        this.client.on('error', (err: any) => {
            console.log('Redis error when trying to connect');
            throw new Error(err);
        });
        this.client.on('connect', () => {
            console.log('Connecting to Redis...');
        });
        this.client.on('ready', () => {
            console.log('Connected to Redis,', this.options);
        });
    }

    async connect() {
        await this.client.connect();
    }

    async get(key: string): Promise<string | null> {
        try {
            const result = await this.client.get(key);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    // @expiring Expiring time in seconds
    async set(key: string, value: string, expiring: number) {
        try {
            await this.client.set(key, value, {
                EX: expiring,
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async delete(key: string) {
        try {
            await this.client.del(key);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export const RedisClient = new Redis({
    url: RedisConfig.url,
});