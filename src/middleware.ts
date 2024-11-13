import { type NextRequest, NextResponse } from "next/server";
import { withRefreshToken } from "./lib/auth/middleware";
import { decodeJwt } from "./lib/auth/jwt";
import { assertUserAuthenticated } from "./lib/auth/auth";
import { REFRESH_JWT_KEY } from "./lib/constants";

const protectedRoutes = ["/user/profile", "/user", "/user/settings"];

async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	try {
		const user = await assertUserAuthenticated();

		if (protectedRoutes.includes(pathname)) {
			if (
				!user ||
				!(await decodeJwt(user?.refreshToken as string, REFRESH_JWT_KEY))
			) {
				console.log("Unauthorized access attempt");
				return NextResponse.redirect(new URL("/auth/sign-in", req.url));
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			if (err.message.includes("User not authenticated")) {
				console.error(err);
			}
		}
	}

	return NextResponse.next();
}

export default withRefreshToken(middleware);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
