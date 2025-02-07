"use client";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";

interface LeagueTableProps {
  team: string;
}

const fetchLeagueTable = async (table: string) => {
  const response = await fetch(`/api/league-table?table=${table}`);
  if (!response.ok) {
    throw new Error("Failed to fetch league table");
  }
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LeagueTable({ team }: LeagueTableProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["league-table", team],
    queryFn: () => fetchLeagueTable(team),
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
                <Skeleton className="w-[25px] h-[16px] rounded-full" />
              </td>
              <td className="p-2 text-sm text-zinc-300">Loading...</td>
              <td className="p-2 text-sm text-zinc-300">
                <Skeleton className="w-[25px] h-[16px] rounded-full" />
              </td>
              <td className="p-2 text-sm text-zinc-300">
                <Skeleton className="w-[25px] h-[16px] rounded-full" />
              </td>
              <td className="p-2 text-sm text-zinc-300">
                <Skeleton className="w-[25px] h-[16px] rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (isError) {
    return <p className="text-white">League table currently unavailable</p>;
  }

  const teams = data as {
    POS: string;
    Team: string;
    P: string;
    PTS: string;
    GD: string;
  }[];

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
          {teams.map((team) => (
            <tr key={team.POS} className="border-b border-zinc-800">
              <td className="p-2 text-sm text-zinc-300">{team.POS}</td>
              {team.Team.includes("Burpham") ? (
                <td className="p-2 text-sm text-burpham-yellow">{team.Team}</td>
              ) : (
                <td className="p-2 text-sm text-zinc-300">{team.Team}</td>
              )}
              <td className="p-2 text-sm text-zinc-300">{team.P}</td>
              <td className="p-2 text-sm text-zinc-300">{team.PTS}</td>
              <td className="p-2 text-sm text-zinc-300">{team.GD}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
