import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UpcomingFixtures } from "./UpcomingFixtures";

const queryClient = new QueryClient();

export function UpcomingFixturesIsland({ teamKey }: { teamKey: string }) {
	return (
		<QueryClientProvider client={queryClient}>
			<UpcomingFixtures teamKey={teamKey} />
		</QueryClientProvider>
	);
}
