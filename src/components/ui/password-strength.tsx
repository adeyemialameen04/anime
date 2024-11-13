"use client";

import * as React from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordStrength = React.forwardRef<
	HTMLInputElement,
	PasswordStrengthProps
>(({ className, ...props }, ref) => {
	const { error } = useFormField();
	const [password, setPassword] = React.useState("");
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible((prev) => !prev);

	const checkStrength = (pass: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: "At least 8 characters" },
			{ regex: /[0-9]/, text: "At least 1 number" },
			{ regex: /[a-z]/, text: "At least 1 lowercase letter" },
			{ regex: /[A-Z]/, text: "At least 1 uppercase letter" },
		];

		return requirements.map((req) => ({
			met: req.regex.test(pass),
			text: req.text,
		}));
	};

	const strength = checkStrength(password);

	const strengthScore = React.useMemo(() => {
		return strength.filter((req) => req.met).length;
	}, [strength]);

	const getStrengthColor = (score: number) => {
		if (score === 0) return "bg-border";
		if (score <= 1) return "bg-destructive";
		if (score <= 2) return "bg-orange-500";
		if (score === 3) return "bg-amber-500";
		return "bg-emerald-500";
	};

	const getStrengthText = (score: number) => {
		if (score === 0) return "Enter a password";
		if (score <= 2) return "Weak password";
		if (score === 3) return "Medium password";
		return "Strong password";
	};

	return (
		<div className="space-y-2">
			<div className="relative">
				<Input
					type={isVisible ? "text" : "password"}
					className={cn("pr-10", className)}
					ref={ref}
					{...props}
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
						props.onChange?.(e);
					}}
					aria-invalid={error ? true : strengthScore < 4}
					aria-describedby="password-strength"
				/>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={toggleVisibility}
					aria-label={isVisible ? "Hide password" : "Show password"}
				>
					{isVisible ? (
						<EyeOff className="h-4 w-4" aria-hidden="true" />
					) : (
						<Eye className="h-4 w-4" aria-hidden="true" />
					)}
				</Button>
			</div>
			<div
				className="h-1 w-full overflow-hidden rounded-full bg-border"
				role="progressbar"
				aria-valuenow={strengthScore}
				aria-valuemin={0}
				aria-valuemax={4}
				aria-label="Password strength"
			>
				<div
					className={cn(
						"h-full transition-all duration-500 ease-out",
						getStrengthColor(strengthScore),
					)}
					style={{ width: `${(strengthScore / 4) * 100}%` }}
				/>
			</div>
			<p id="password-strength" className="text-sm text-muted-foreground">
				{getStrengthText(strengthScore)}. Must contain:
			</p>
			<ul className="space-y-1" aria-label="Password requirements">
				{strength.map((req, index) => (
					<li key={index} className="flex items-center space-x-2">
						{req.met ? (
							<Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
						) : (
							<X className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
						)}
						<span
							className={cn(
								"text-xs",
								req.met ? "text-emerald-600" : "text-muted-foreground",
							)}
						>
							{req.text}
							<span className="sr-only">
								{req.met ? " - Requirement met" : " - Requirement not met"}
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
});
PasswordStrength.displayName = "PasswordStrength";

export { PasswordStrength };
