export interface Cache {
    connect: () => Promise<void>;
    get: (key: string) => Promise<string | null>;

    // @expiring Expiring time in seconds
    set: (key: string, value: string, expiring: number) => Promise<void>;
    delete: (key: string) => Promise<void>;
}