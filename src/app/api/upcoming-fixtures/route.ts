import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

import { BASE_URL } from "../constants";
import type { Kickoff } from "../types";

const fetchAndParseFixtures = async (table: string) => {
  try {
    const response = await fetch(`${BASE_URL}?cs=${table}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    const fixtures: Kickoff[] = [];

    // Select the first table
    const tableElement = $("table").first();
    // console.log(tableElement.html());

    // Iterate through rows of fixtures
    tableElement.find("tr").each((_, row) => {
      const cells = $(row).find("td");

      // Identify date rows (colspan 7) and store the date
      if (cells.length === 1 && $(cells[0]).attr("colspan") === "7") {
        const dateTime = $(cells[0]).text().trim();
        fixtures.push({ dateTime, matches: [] });
      }

      // Extract fixture details (division, home, away, location)
      if (cells.length === 5) {
        const division = $(cells[0]).text().trim();
        const homeTeam = $(cells[1]).text().trim();
        const awayTeam = $(cells[3]).text().trim();
        const location = $(cells[4]).text().trim();

        // Append match to the latest date
        if (fixtures.length > 0) {
          const formattedLocation = location
            .split(" ")
            .map((word: string) => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");

          fixtures[fixtures.length - 1].matches.push({
            division,
            homeTeam,
            awayTeam,
            formattedLocation,
          });
        }
      }
    });

    return fixtures;
  } catch (error) {
    console.error("Error processing fixtures:", error);
    throw new Error("Failed to fetch or parse fixtures.");
  }
};

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get("table");

  if (!table) {
    return new Response("No table ID provided", {
      status: 400,
    });
  }

  try {
    const data = await fetchAndParseFixtures(table);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching league table:", error);
    return new Response("Failed to fetch league table", {
      status: 500,
    });
  }
}
