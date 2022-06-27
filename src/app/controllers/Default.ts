import { RouterFunction, Request, Response } from '@app/interfaces/Router';

// Interfaces
interface IDefaultController {
    index: RouterFunction;
}


class DefaultController implements IDefaultController {
    constructor() {
        this.index = this.index.bind(this);
    }

    async index(__req: Request, res: Response) {
        return res.status(200).json({ message: process.env.HTTP_PORT });
    }
}

export default DefaultController;