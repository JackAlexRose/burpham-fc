interface LeagueTableProps {
  team: "first" | "reserves";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LeagueTable({ team }: LeagueTableProps) {
  // Sample data - replace with real data
  const teams = [
    { pos: 1, name: "Team A", played: 10, points: 25 },
    { pos: 2, name: "Team B", played: 10, points: 22 },
    { pos: 3, name: "Team C", played: 10, points: 19 },
    { pos: 4, name: "Team D", played: 10, points: 16 },
    { pos: 5, name: "Team E", played: 10, points: 13 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="p-2 text-left text-sm text-zinc-400">Pos</th>
            <th className="p-2 text-left text-sm text-zinc-400">Team</th>
            <th className="p-2 text-left text-sm text-zinc-400">P</th>
            <th className="p-2 text-left text-sm text-zinc-400">Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.pos} className="border-b border-zinc-800">
              <td className="p-2 text-sm text-zinc-300">{team.pos}</td>
              <td className="p-2 text-sm text-zinc-300">{team.name}</td>
              <td className="p-2 text-sm text-zinc-300">{team.played}</td>
              <td className="p-2 text-sm text-zinc-300">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
