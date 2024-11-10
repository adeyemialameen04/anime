import AuthForm from "../_components/auth-form";

export default async function SignInPage() {
	return (
		<main className="">
			<AuthForm signUp={false} />
		</main>
	);
}
