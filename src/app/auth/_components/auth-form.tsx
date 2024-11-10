"use client";
import { FcGoogle } from "react-icons/fc";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import SubmitButton from "@/_components/shared/submit-btn";
import { Separator } from "@/components/ui/separator";
import { authAction } from "../actions";
import { useServerAction } from "zsa-react";
import {
	type AuthSchema,
	authSchema,
	signInSchema,
	signUpSchema,
} from "../schema";
import { HTTP_STATUS } from "@/lib/constants";
import { saveUserTokens } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AuthForm({ signUp }: { signUp: boolean }) {
	const router = useRouter();
	const { isPending, execute } = useServerAction(authAction, {
		onSuccess: async ({ data }) => {
			console.log(data);
			if (
				data.status === HTTP_STATUS.OK ||
				data.status === HTTP_STATUS.CREATED
			) {
				await saveUserTokens({
					accessToken: data?.data.accessToken as string,
					refreshToken: data?.data.refreshToken as string,
					id: data?.data.user.id as string,
				});

				toast.success(`Sign ${signUp ? "Up" : "In"} success`);
				router.push("/anime");
				router.refresh();
			} else {
				if (data.status === HTTP_STATUS.CONFLICT && signUp)
					toast.error(
						`User with this ${data.message.includes("username") ? "username" : "email"} Already Exists`,
					);
				if (data.status === HTTP_STATUS.UNAUTHORIZED)
					toast.error("Invalid email or password");
			}
		},
	});
	const form = useForm<AuthSchema>({
		resolver: zodResolver(signUp ? signUpSchema : signInSchema),
		defaultValues: {
			email: "",
			password: "",
			...(signUp && { username: "" }),
		},
	});

	async function onSubmit(values: AuthSchema) {
		try {
			await execute({
				...values,
				signUp,
			});
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	}

	return (
		<div className="max-w-md mx-auto py-10 space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="you@example.com"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormDescription>Enter your email address.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{signUp && (
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Luffy2618" {...field} />
									</FormControl>
									<FormDescription>Enter your Username.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput placeholder="Enter your password" {...field} />
								</FormControl>
								<FormDescription>Enter your password.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<SubmitButton isLoading={isPending} className="w-full">
						Sign {signUp ? "Up" : "In"}
					</SubmitButton>
				</form>
			</Form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<Separator className="w-full" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>

			<Button className="w-full gap-5" variant={"secondary"}>
				<FcGoogle /> Google
			</Button>
			<div className="text-center">
				<Button
					variant="link"
					onClick={() =>
						router.push(signUp ? "/auth/sign-in" : "/auth/sign-up")
					}
					className="text-primary"
				>
					{signUp
						? "Already have an account? Sign In"
						: "Don't have an account? Sign Up"}
				</Button>
			</div>
		</div>
	);
}
