import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

import { BASE_URL } from "../constants";

const fetchLeagueTable = async (table: string) => {
  try {
    const response = await fetch(`${BASE_URL}?cs=${table}`);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Select the first table
    const tableElement = $("table").first();

    const headers: string[] = [];
    const data: { [key: string]: string }[] = [];

    // Extract table headers from the first row of td elements
    tableElement
      .find("tr")
      .first()
      .find("td")
      .each((index, element) => {
        if (index === 1) {
          headers.push("Team");
          return;
        }
        headers.push($(element).text().trim());
      });

    // Extract table rows
    tableElement
      .find("tbody tr")
      .slice(1)
      .each((_, row) => {
        const rowData: { [key: string]: string } = {};
        $(row)
          .find("td")
          .each((index, cell) => {
            if (!headers[index]) return;
            rowData[headers[index]] = $(cell).text().trim();
          });
        data.push(rowData);
      });

    data.pop();
    data.pop();

    return data;
  } catch (error) {
    console.error("Error processing table:", error);
    throw new Error("Failed to fetch or parse table.");
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
    const data = await fetchLeagueTable(table);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching league table:", error);
    return new Response("Failed to fetch league table", {
      status: 500,
    });
  }
}
