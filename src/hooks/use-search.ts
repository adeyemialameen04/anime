import { ANIWATCH_API_BASE_URL } from "@/lib/constants";
import useSWR from "swr";
import { useDebounce } from "@/hooks/use-debounce";

const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json());

export function useSearch(query: string) {
	const debouncedQuery = useDebounce(query, 300);

	const { data, error, isLoading } = useSWR(
		debouncedQuery
			? `${ANIWATCH_API_BASE_URL}/hianime/browse/search/suggestions?q=${debouncedQuery}`
			: null,
		fetcher,
	);

	return {
		data,
		isLoading,
		isError: error,
	};
}
