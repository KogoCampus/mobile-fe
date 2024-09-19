export type BaseErrorResponse<TErrorInfo = object> = {
    data: null;
    error: {
        status: string;
        name: string;
        message: string;
        details: TErrorInfo;
    };
};
