import { CalendarDays, MapPin } from "lucide-react";

export function NextFixtures() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-white">
          Burpham FC vs Horsham
        </div>
        <div className="text-sm text-zinc-400">League</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">Saturday, 10th Feb 2024 - 15:00</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Sutherland Memorial Park, Burpham</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-white">
          Burpham Reserves vs Shalford
        </div>
        <div className="text-sm text-zinc-400">Cup</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <CalendarDays className="h-4 w-4" />
          <span className="text-sm">Saturday, 10th Feb 2024 - 15:00</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Sports Ground, Shalford</span>
        </div>
      </div>
    </div>
  );
}
