"use client";

interface WebhookPayload {
  event: "page_view" | "state_select" | "grade_filter" | "chart_interact" | "table_sort";
  state?: string;
  grade?: string;
  locale?: string;
  page?: string;
  timestamp: string;
}

export async function sendWebhookEvent(payload: Omit<WebhookPayload, "timestamp">): Promise<void> {
  const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent fail — analytics should not break UX
  }
}
