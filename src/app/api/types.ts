export interface Match {
  homeTeam: string;
  awayTeam: string;
  division: string;
  formattedLocation: string;
}

export interface Kickoff {
  dateTime: string;
  matches: Match[];
}
