export interface SessionManager {
    create_session(user_id: string, is_otp: boolean): Promise<string>;
}