"use client";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
	autoplay: z.boolean().optional(),
	autonext: z.boolean().optional(),
	auto_skip_intros: z.boolean().optional(),
});

export default function Settings() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			autonext: true,
			autoplay: true,
			auto_skip_intros: false,
		},
	});
	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="">
				<h3 className="text-xl font-medium mb-3">Settings</h3>
				<div className="flex flex-col gap-5 max-w-[550px]">
					<FormField
						control={form.control}
						name="autoplay"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">AutoPlay</FormLabel>
									<FormDescription>
										Autoplays video as soon as the page finish loading
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="autonext"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">AutoNext</FormLabel>
									<FormDescription>
										Automatically skip to the next video after the current one
										has ended.
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="auto_skip_intros"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">AutoSkip intros</FormLabel>
									<FormDescription>
										Automatically skip anime inro and outros
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="submit" className="self-end">
						Save Settings
					</Button>
				</div>
			</form>
		</Form>
	);
}
