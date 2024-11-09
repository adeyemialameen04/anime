export type SuccessResponse<T> = {
	data: T;
	errors: any;
	message: string;
	status: string;
};

export type ErrorResponse = {
	status: number;
	error: string;
	detail: string;
};
