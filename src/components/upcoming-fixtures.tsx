"use client";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin } from "lucide-react";
import { Kickoff, Match } from "@/app/api/types";

interface UpcomingFixturesProps {
  table: string;
}

const fetchUpcomingFixtures = async (table: string) => {
  const response = await fetch(`/api/upcoming-fixtures?table=${table}`);
  if (!response.ok) {
    throw new Error("Failed to fetch upcoming fixtures");
  }
  return response.json();
};

export function UpcomingFixtures({ table }: UpcomingFixturesProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["upcoming-fixtures", table],
    queryFn: () => fetchUpcomingFixtures(table),
  });

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-white">No upcoming matches</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((kickoff: Kickoff, index: number) => (
        <div key={index} className="space-y-4">
          {kickoff.matches.map((fixture: Match, index: number) => (
            <>
              <div key={index} className="flex items-center justify-between">
                <div className="text-xl font-semibold text-white">
                  {fixture.homeTeam} vs {fixture.awayTeam}
                </div>
                <div className="text-sm text-zinc-400">{fixture.division}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm">{kickoff.dateTime}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{fixture.formattedLocation}</span>
                </div>
              </div>
            </>
          ))}
        </div>
      ))}
    </div>
  );
}
