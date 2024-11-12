import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import type React from "react";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	children?: React.ReactNode;
	isLoading: boolean;
}

export default function SubmitButton({
	children,
	className,
	isLoading,
	...props
}: ButtonProps) {
	return (
		<Button
			{...props}
			disabled={isLoading || props.disabled}
			className={cn("items-center gap-3", className)}
		>
			<Loader className={cn("animate-spin", !isLoading && "hidden")} />
			{children}
		</Button>
	);
}
