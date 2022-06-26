export interface BaseCustom {
    [key: string]: string;
}

export interface CustomRequest {
    current_user: {
        id: string;
        email: string;
    }
}

export interface CustomHeaders extends BaseCustom {
    authentication: string;
}

export interface CustomParams extends BaseCustom {
    id: string;
}

export type CustomQuery = BaseCustom;