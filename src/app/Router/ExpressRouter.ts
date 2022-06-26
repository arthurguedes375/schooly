import { NextFunction, Response as ResponseExpress } from 'express';
import { RouterFunction, Response } from '@app/interfaces/Router';

const ExpressRouter = (func: RouterFunction<any>) => {
    return async (req: any, res: ResponseExpress, next: NextFunction) => {
        class response implements Response {
            constructor() {
                this.status = this.status.bind(this);
            }
            status(code: number) {
                res.status(code);
                return this;
            }
            json(json: any) {
                res.json(json);
                return this;
            }
        }
        return await func(req, new response(), next);
    };
};

export default ExpressRouter;