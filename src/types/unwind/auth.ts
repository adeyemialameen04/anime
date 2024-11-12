type EmailIDs = {
	email: string;
	id: string;
	profileId: string;
};
export type AuthSuccess = {
	accessToken: string;
	refreshToken: string;
	user: EmailIDs;
};

export type Payload = {
	data: EmailIDs;
	expires: number;
	jti: string;
	refresh: boolean;
};
