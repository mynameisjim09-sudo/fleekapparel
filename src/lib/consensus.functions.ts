import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1jJZVWKXZwdiMrC2UPxNMm4FH1F-fqdaB5t3WTGpAuv4";
const RANGE = "Sheet1!A:D";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const Input = z.object({
  winner: z.string().min(1).max(200),
  loser: z.string().min(1).max(200),
  feedback: z.string().min(1).max(280),
});

export const logConsensusFeedback = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !connKey) {
      throw new Error("Sheets connector not configured");
    }

    const url = `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[new Date().toISOString(), data.winner, data.loser, data.feedback]],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Sheets append failed (${res.status}): ${body.slice(0, 300)}`);
    }
    return { ok: true };
  });
