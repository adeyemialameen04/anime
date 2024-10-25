import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationEllipsis,
	PaginationNext,
} from "@/components/ui/pagination";

export default function EpisodesPagination({
	page,
	totalPages,
	id,
}: { page: number; totalPages: number; id: number }) {
	return (
		<Pagination>
			<PaginationContent>
				{page > 1 && (
					<>
						<PaginationItem>
							<PaginationPrevious href={`/anime/${id}?page=${page - 1}`} />
						</PaginationItem>

						{page > 2 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationLink
								isActive={false}
								href={`/anime/${id}?page=${page - 1}`}
							>
								{page - 1}
							</PaginationLink>
						</PaginationItem>
					</>
				)}

				<PaginationItem>
					<PaginationLink isActive={true} href={`/anime/${id}?page=${page}`}>
						{page}
					</PaginationLink>
				</PaginationItem>

				{page < totalPages && (
					<>
						<PaginationItem>
							<PaginationLink href={`/anime/${id}?page=${page + 1}`}>
								{page + 1}
							</PaginationLink>
						</PaginationItem>

						{page < totalPages - 1 && (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationNext href={`/anime/${id}?page=${page + 1}`} />
						</PaginationItem>
					</>
				)}
			</PaginationContent>
		</Pagination>
	);
}
