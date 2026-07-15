const MAX_FIELD_LENGTH = 500;
const WEBHOOK_TIMEOUT_MS = 10000;

function cleanString(value, maxLength = MAX_FIELD_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const payload = request.body && typeof request.body === "object" ? request.body : {};
  const honeypot = cleanString(payload.website, 200);

  if (honeypot) {
    return response.status(200).json({ ok: true });
  }

  const name = cleanString(payload.name, 120);
  const email = cleanString(payload.email, 200).toLowerCase();
  const source = cleanString(payload.source, 300) || "/";

  if (!name || !isValidEmail(email)) {
    return response.status(400).json({ ok: false, error: "Please enter a valid name and email." });
  }

  const webhookUrl = process.env.MAITRI_WAITLIST_WEBHOOK_URL;
  const webhookSecret = process.env.MAITRI_WAITLIST_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    return response.status(503).json({ ok: false, error: "Waitlist storage is not configured." });
  }

  try {
    const targetUrl = new URL(webhookUrl);
    targetUrl.searchParams.set("secret", webhookSecret);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    const webhookResponse = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        name,
        email,
        source,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const responseText = await webhookResponse.text();
    let responseBody = null;

    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = null;
    }

    if (!webhookResponse.ok || responseBody?.ok !== true) {
      return response.status(502).json({ ok: false, error: "Unable to save this signup right now." });
    }

    return response.status(200).json({ ok: true, duplicate: responseBody.duplicate === true });
  } catch {
    return response.status(502).json({ ok: false, error: "Unable to save this signup right now." });
  }
}
