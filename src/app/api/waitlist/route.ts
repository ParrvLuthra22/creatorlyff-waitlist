import { NextResponse } from "next/server";
import { z } from "zod";
import { appendToWaitlist } from "@/lib/sheets";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  linkedin: z.string().optional(),
  collabFrequency: z.number().optional(),
  platformNeed: z.number().optional(),
  brandName: z.string().optional(),
  role: z.enum(["creator", "brand", "investor"]),
});

// Simple in-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateLimitInfo = rateLimitMap.get(ip);

    if (rateLimitInfo && now < rateLimitInfo.resetAt) {
      if (rateLimitInfo.count >= 5) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
      rateLimitInfo.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 3600 * 1000 }); // 1 hour
    }

    const body = await request.json();
    const validatedData = schema.parse(body);

    const { position } = await appendToWaitlist(validatedData);

    return NextResponse.json({ success: true, position, message: "Added to waitlist" });
  } catch (err: any) {
    console.error("[waitlist error]", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data provided." }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
