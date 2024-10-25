import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
	onBottomReached: () => void;
	className?: string;
	isLoading?: boolean;
	hasNextPage?: boolean;
}

export default function InfiniteScrollContainer({
	children,
	onBottomReached,
	className,
	isLoading = false,
	hasNextPage = false,
}: InfiniteScrollContainerProps) {
	const { ref, inView } = useInView({
		threshold: 0,
		rootMargin: "200px",
	});

	useEffect(() => {
		if (inView && !isLoading && hasNextPage) {
			onBottomReached();
		}
	}, [inView, isLoading, hasNextPage, onBottomReached]);

	return (
		<div className={className}>
			{children}
			<div ref={ref} className="h-4 w-full" />
		</div>
	);
}
