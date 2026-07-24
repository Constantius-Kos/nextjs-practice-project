
export type BaseActionResponse<T = void> = {
    success: boolean;
    message?: string;
    error?: string;
    data?: T
};