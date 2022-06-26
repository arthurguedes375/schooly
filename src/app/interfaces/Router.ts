import { CustomRequest, CustomHeaders, CustomParams, CustomQuery } from '@app/Router/Custom';

export type Headers = CustomHeaders
export type Params = CustomParams
export type Query = CustomQuery

export interface Request<B = object, H = Headers, P = Params, Q = Query> extends CustomRequest {
    body: B;
    headers: H;
    params: P;
    query: Q;
}

export type NextFunction = () => any;
export type SetReqFunction = (key: string, value: any) => any;

export interface Response {
    status: (status: number) => Response;
    json: (res: object | string | number) => Response;
}

export type RouterFunction<B = object, H = Headers, P = Params, Q = Query> = (req: Request<B, H, P, Q>, res: Response, next?: NextFunction) => Promise<Response> | Response;