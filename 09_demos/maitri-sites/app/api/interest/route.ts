import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { waitlistEntries } from "../../../db/schema";

type InterestPayload = {
  name?: string;
  email?: string;
  childAge?: string;
  segment?: string;
  interests?: string[];
  storyPreference?: string;
  betaReaderInterest?: string;
  schoolInterest?: string;
  preorderSignal?: string;
  objection?: string;
};

function clean(value: unknown) {
  return String(value || "").trim();
}

function countBy<T extends Record<string, unknown>>(entries: T[], key: keyof T) {
  return entries.reduce<Record<string, number>>((counts, entry) => {
    const value = clean(entry[key]) || "Unspecified";
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function toRouteErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error ? error.cause.message : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table") || combined.includes("waitlist_entries")) {
    return "The waitlist_entries table is unavailable. Generate and deploy the D1 migration before using live capture.";
  }

  return message;
}

export async function GET() {
  try {
    const db = getDb();
    const entries = await db
      .select()
      .from(waitlistEntries)
      .orderBy(desc(waitlistEntries.createdAt), desc(waitlistEntries.id))
      .limit(500);

    return Response.json({
      total: entries.length,
      bySegment: countBy(entries, "segment"),
      byChildAge: countBy(entries, "childAge"),
      byStoryPreference: countBy(entries, "storyPreference"),
      betaReaderOptIns: entries.filter((entry) =>
        entry.betaReaderInterest.startsWith("Yes"),
      ).length,
      schoolInterest: entries.filter((entry) =>
        entry.schoolInterest.startsWith("Yes"),
      ).length,
      likelyPreorder: entries.filter((entry) =>
        entry.preorderSignal.includes("Likely"),
      ).length,
      latest: entries[0] ?? null,
    });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InterestPayload;
    const required = [
      "name",
      "email",
      "childAge",
      "segment",
      "storyPreference",
      "betaReaderInterest",
      "schoolInterest",
      "preorderSignal",
    ] as const;

    const missing = required.filter((key) => !clean(payload[key]));
    if (missing.length) {
      return Response.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const interests = Array.isArray(payload.interests)
      ? payload.interests.map(clean).filter(Boolean)
      : [];

    const db = getDb();
    const [entry] = await db
      .insert(waitlistEntries)
      .values({
        name: clean(payload.name),
        email: clean(payload.email),
        childAge: clean(payload.childAge),
        segment: clean(payload.segment),
        interests: JSON.stringify(interests),
        storyPreference: clean(payload.storyPreference),
        betaReaderInterest: clean(payload.betaReaderInterest),
        schoolInterest: clean(payload.schoolInterest),
        preorderSignal: clean(payload.preorderSignal),
        objection: clean(payload.objection),
        createdAt: new Date(),
      })
      .returning();

    return Response.json({ entry }, { status: 201 });
  } catch (error) {
    return Response.json({ error: toRouteErrorMessage(error) }, { status: 500 });
  }
}
