"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SubmitButton from "@/_components/shared/submit-btn";
import Image from "next/image";
import { useServerAction } from "zsa-react";
import { editProfileAction } from "../../actions";
import { HTTP_STATUS } from "@/lib/constants";
import { toast } from "sonner";
import { type EditProfile, editProfileSchema } from "../../schema";
import { defaultCovers } from "@/data/cover";
import type { Profile } from "@/types/unwind/user";
import type { TimeStamp } from "@/types/unwind";
import { revalidateTagServer } from "@/app/actions";

const getDefaultImageIndex = (seed: number) => {
	return seed % defaultCovers.length;
};

const defaultCoverIndex = getDefaultImageIndex(0);
const defaultProfileIndex = getDefaultImageIndex(1);

export default function ProfileForm({
	profileData,
}: { profileData: Profile & TimeStamp }) {
	const { isPending, execute } = useServerAction(editProfileAction, {
		onSuccess: async ({ data: res }) => {
			console.log(res);
			if (res.status === HTTP_STATUS.OK || res.status === HTTP_STATUS.CREATED) {
				await revalidateTagServer(`profile-${profileData.id}`);
				toast.success("Profile Edited Successfully");
			} else {
				if (res.status === HTTP_STATUS.CONFLICT)
					toast.error("User with this username already Exists");
				else if (res.status === HTTP_STATUS.UNAUTHORIZED)
					toast.error("Invalid email or password");
				else toast.error("An unexpected error occurred");
			}
		},
	});

	const [coverPreview, setCoverPreview] = useState<string>(
		profileData.coverPic || defaultCovers[defaultCoverIndex],
	);
	const [profilePreview, setProfilePreview] = useState<string>(
		profileData.profilePic || defaultCovers[defaultProfileIndex],
	);

	const form = useForm<EditProfile>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			name: profileData.name || "",
			username: profileData.username || "",
			coverPic: profileData.coverPic || defaultCovers[defaultCoverIndex],
			profilePic: profileData.profilePic || defaultCovers[defaultProfileIndex],
		},
	});

	async function onSubmit(values: z.infer<typeof editProfileSchema>) {
		await execute({ ...values });
	}

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setPreview: (url: string) => void,
		field: any,
		fieldName: string,
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				setPreview(base64String);
				field.onChange(base64String);
				console.log(`${fieldName} changed:`, `${base64String.slice(0, 50)}...`);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Card className="w-full max-w-2xl mt-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<CardContent className="space-y-6 p-6">
						<FormField
							control={form.control}
							name="coverPic"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cover Image</FormLabel>
									<FormControl>
										<div className="relative w-full h-[200px] overflow-hidden rounded-lg bg-muted">
											<Image
												src={coverPreview}
												alt="Cover image"
												className="object-cover"
												fill
												priority
											/>
											<Button
												type="button"
												size="icon"
												variant="secondary"
												className="absolute bottom-4 right-4"
												onClick={() =>
													document.getElementById("cover-upload")?.click()
												}
											>
												<ImagePlus className="h-4 w-4" />
											</Button>
											<input
												id="cover-upload"
												type="file"
												className="hidden"
												accept="image/*"
												onChange={(e) =>
													handleImageChange(
														e,
														setCoverPreview,
														field,
														"coverPic",
													)
												}
											/>
										</div>
									</FormControl>
									<FormDescription>
										Choose a cover image for your profile.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="profilePic"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Profile Picture</FormLabel>
									<FormControl>
										<div className="flex items-center justify-center">
											<Avatar className="w-24 h-24 relative">
												<AvatarImage
													src={profilePreview}
													alt="Profile picture"
													className="object-cover"
												/>
												<AvatarFallback>PP</AvatarFallback>
												<Button
													type="button"
													size="icon"
													className="absolute bottom-0 right-1"
													onClick={() =>
														document.getElementById("profile-upload")?.click()
													}
												>
													<ImagePlus className="h-4 w-4" />
												</Button>
											</Avatar>
											<input
												id="profile-upload"
												type="file"
												className="hidden"
												accept="image/*"
												onChange={(e) =>
													handleImageChange(
														e,
														setProfilePreview,
														field,
														"profilePic",
													)
												}
											/>
										</div>
									</FormControl>
									<FormDescription>Choose a profile picture.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your name" {...field} />
									</FormControl>
									<FormDescription>This won't be public.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Enter your username" {...field} />
									</FormControl>
									<FormDescription>
										This is your public username.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<SubmitButton
							isLoading={isPending}
							type="submit"
							className="ml-auto"
						>
							Save changes
						</SubmitButton>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
