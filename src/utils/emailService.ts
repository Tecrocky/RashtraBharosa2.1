// Resend Email Dispatch Utility for Rashtra Bharosa Group

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  reply_to?: string;
}

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || "";
const ADMIN_NOTIFICATION_EMAIL = "info@rashtrabharosagroup.com";

/**
 * Sends an email using the Resend REST API
 */
export async function sendEmailViaResend({
  to,
  subject,
  html,
  from = "Rashtra Bharosa Group <noreply@rashtrabharosagroup.com>",
  reply_to = "info@rashtrabharosagroup.com",
}: EmailPayload): Promise<{ success: boolean; data?: any; error?: string }> {
  const recipients = Array.isArray(to) ? to : [to];

  const payload = {
    from,
    to: recipients,
    subject,
    html,
    reply_to,
  };

  try {
    let response: Response;
    
    // 1. Try local dev proxy endpoint first (avoids browser CORS)
    try {
      response = await fetch("/api/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      // If endpoint not handled by server, it might return 404 HTML
      if (response.status === 404) {
        throw new Error("Local proxy not available");
      }
    } catch {
      // 2. Direct Resend REST API fallback
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    const data = await response.json();

    if (!response.ok) {
      console.warn("Resend API warning:", data);
      return { success: false, error: data?.message || "Email dispatch failed" };
    }

    console.log("Resend Email Dispatched Successfully! ID:", data?.id);
    return { success: true, data };
  } catch (error: any) {
    console.error("Resend Network Error:", error);
    return { success: false, error: error?.message || "Network error" };
  }
}
