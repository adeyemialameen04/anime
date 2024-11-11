export type AuthSuccess = {
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		id: string;
		profileId: string;
	};
};
