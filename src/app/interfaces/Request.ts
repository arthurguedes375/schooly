export interface IRequestAuthenticated {
    current_user: {
        id: number;
        email: string;
    }
}