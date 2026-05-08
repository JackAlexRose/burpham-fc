import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface TableEntry {
	position: number;
	team: string;
	played: number;
	points: number;
	goalDifference: number;
}

interface TeamData {
	table: TableEntry[];
}

interface ClubData {
	teams: Record<string, TeamData>;
}

interface LeagueTableProps {
	teamKey: string;
}

const API_URL = "https://thefa-fulltime-api.jackalexanderrose.workers.dev";

const fetchClubData = async (): Promise<ClubData> => {
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch league table");
	}
	return response.json();
};

export function LeagueTable({ teamKey }: LeagueTableProps) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["club-data"],
		queryFn: fetchClubData,
	});

	if (isLoading) {
		return (
			<table className="w-full">
				<thead>
					<tr className="border-b border-zinc-800">
						<th className="p-2 text-left text-sm text-zinc-400">Pos</th>
						<th className="p-2 text-left text-sm text-zinc-400">Team</th>
						<th className="p-2 text-left text-sm text-zinc-400">P</th>
						<th className="p-2 text-left text-sm text-zinc-400">Pts</th>
						<th className="p-2 text-left text-sm text-zinc-400">GD</th>
					</tr>
				</thead>
				<tbody>
					{[1, 2, 3, 4, 5].map((index) => (
						<tr key={index} className="border-b border-zinc-800">
							<td className="p-2 text-sm text-zinc-300">
								<Skeleton className="w-[25px] h-[16px] rounded-full bg-burpham-green" />
							</td>
							<td className="p-2 text-sm text-zinc-300">Loading...</td>
							<td className="p-2 text-sm text-zinc-300">
								<Skeleton className="w-[25px] h-[16px] rounded-full bg-burpham-green" />
							</td>
							<td className="p-2 text-sm text-zinc-300">
								<Skeleton className="w-[25px] h-[16px] rounded-full bg-burpham-green" />
							</td>
							<td className="p-2 text-sm text-zinc-300">
								<Skeleton className="w-[25px] h-[16px] rounded-full bg-burpham-green" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	if (isError || !data?.teams?.[teamKey]) {
		return <p className="text-white">League table currently unavailable</p>;
	}

	const table = data.teams[teamKey].table || [];

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-zinc-800">
						<th className="p-2 text-left text-sm text-zinc-400">Pos</th>
						<th className="p-2 text-left text-sm text-zinc-400">Team</th>
						<th className="p-2 text-left text-sm text-zinc-400">P</th>
						<th className="p-2 text-left text-sm text-zinc-400">Pts</th>
						<th className="p-2 text-left text-sm text-zinc-400">GD</th>
					</tr>
				</thead>
				<tbody>
					{table.map((entry: TableEntry) => (
						<tr key={entry.position} className="border-b border-zinc-800">
							<td className="p-2 text-sm text-zinc-300">{entry.position}</td>
							{entry.team.includes("Burpham") ? (
								<td className="p-2 text-sm text-burpham-yellow">
									{entry.team}
								</td>
							) : (
								<td className="p-2 text-sm text-zinc-300">{entry.team}</td>
							)}
							<td className="p-2 text-sm text-zinc-300">{entry.played}</td>
							<td className="p-2 text-sm text-zinc-300">{entry.points}</td>
							<td className="p-2 text-sm text-zinc-300">
								{entry.goalDifference}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
