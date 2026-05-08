import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeagueTable } from "./LeagueTable";

const queryClient = new QueryClient();

export function LeagueTableIsland({ teamKey }: { teamKey: string }) {
	return (
		<QueryClientProvider client={queryClient}>
			<LeagueTable teamKey={teamKey} />
		</QueryClientProvider>
	);
}
