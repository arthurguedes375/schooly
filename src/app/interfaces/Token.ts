export interface SignTokenOptions {
    /**
     * @default Never expires
     */
     expiresIn?: number,
    
}

export interface Token<DP = any> {
    verify<P = DP>(token: string): P | false,
    sign<P = DP>(data: P, options?: SignTokenOptions): string,
}