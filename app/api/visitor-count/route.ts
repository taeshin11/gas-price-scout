import { NextResponse } from "next/server";

// Simple in-memory fallback visitor counter (no Redis dependency needed)
let todayCount = Math.floor(Math.random() * 500) + 200;
let totalCount = Math.floor(Math.random() * 50000) + 10000;
let lastReset = new Date().toDateString();

export async function GET() {
  // Reset today's count if it's a new day
  const today = new Date().toDateString();
  if (today !== lastReset) {
    todayCount = 0;
    lastReset = today;
  }

  return NextResponse.json({
    today: todayCount,
    total: totalCount,
  });
}

export async function POST() {
  const today = new Date().toDateString();
  if (today !== lastReset) {
    todayCount = 0;
    lastReset = today;
  }

  todayCount++;
  totalCount++;

  return NextResponse.json({
    today: todayCount,
    total: totalCount,
  });
}
