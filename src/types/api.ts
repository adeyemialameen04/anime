export type SuccessResponse<T> = {
	success: boolean;
	data: T;
};

export type ErrorResponse = {
	status: number;
	error: string;
	detail: string;
};
