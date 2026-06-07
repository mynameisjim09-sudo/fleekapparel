import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1jJZVWKXZwdiMrC2UPxNMm4FH1F-fqdaB5t3WTGpAuv4";
const RANGE = "Consensus!A:G";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const Input = z.object({
  event: z.enum(["VOTE", "FEEDBACK"]),
  registryStage: z.string().min(1).max(8),
  winner: z.string().min(1).max(200),
  loser: z.string().min(1).max(200),
  feedback: z.string().max(280).optional().default(""),
  user: z.string().max(120).optional().default(""),
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
        values: [
          [
            new Date().toISOString(),
            data.event,
            data.registryStage,
            data.winner,
            data.loser,
            data.feedback,
            data.user,
          ],
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Sheets append failed (${res.status}): ${body.slice(0, 300)}`);
    }
    return { ok: true };
  });
