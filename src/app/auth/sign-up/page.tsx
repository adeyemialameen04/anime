import AuthForm from "../_components/auth-form";

export default async function SignUpPage() {
	return (
		<main className="">
			<AuthForm signUp={true} />
		</main>
	);
}
