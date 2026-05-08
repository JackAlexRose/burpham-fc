import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Fixture {
	date: string;
	home: string;
	away: string;
	competition: string;
	venue: string | null;
}

interface TeamData {
	fixtures: Fixture[];
}

interface ClubData {
	teams: Record<string, TeamData>;
}

interface UpcomingFixturesProps {
	teamKey: string;
}

const API_URL = "https://thefa-fulltime-api.jackalexanderrose.workers.dev";

const fetchClubData = async (): Promise<ClubData> => {
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch fixtures");
	}
	return response.json();
};

export function UpcomingFixtures({ teamKey }: UpcomingFixturesProps) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["club-data"],
		queryFn: fetchClubData,
	});

	if (isLoading) {
		return (
			<div className="space-y-10">
				{[1, 2, 3].map((index) => (
					<div key={index} className="space-y-4">
						<Skeleton className="w-[300px] h-[16px] rounded-full bg-burpham-green" />
						<Skeleton className="w-[200px] h-[16px] rounded-full bg-burpham-green" />
					</div>
				))}
			</div>
		);
	}

	if (isError || !data?.teams?.[teamKey]) {
		return <div className="text-white">No upcoming matches</div>;
	}

	const fixtures = data.teams[teamKey].fixtures || [];

	if (fixtures.length === 0) {
		return <div className="text-white">No upcoming matches</div>;
	}

	return (
		<div className="space-y-4">
			{fixtures.map((fixture: Fixture, index: number) => (
				<div key={index} className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="text-xl font-semibold text-white">
							{fixture.home} vs {fixture.away}
						</div>
						<div className="text-sm text-zinc-400">{fixture.competition}</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center gap-2 text-zinc-400">
							<CalendarDays className="h-4 w-4" />
							<span className="text-sm">
								{new Date(fixture.date).toLocaleDateString("en-GB", {
									weekday: "short",
									day: "numeric",
									month: "short",
								})}
							</span>
						</div>
						{fixture.venue && (
							<div className="flex items-center gap-2 text-zinc-400">
								<MapPin className="h-4 w-4" />
								<span className="text-sm">{fixture.venue}</span>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
