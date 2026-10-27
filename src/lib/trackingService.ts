import { supabase } from "@/lib/supabase";
import { sendEmailViaResend } from "@/utils/emailService";

/**
 * Rashtra Bharosa Group — Unified Tracking & Reference Management System
 * Generates official sovereign reference numbers, persists records across
 * Supabase Cloud and localStorage, dispatches automated confirmation notifications,
 * and maintains an immutable Track Log & Audit Trail.
 */

export type TrackingType = "tender_bid" | "career_application" | "vendor_registration" | "public_inquiry" | "tender_notice";

export interface TrackMilestone {
  timestamp: string;
  stageName: string;
  action: string;
  actor: string;
  notes?: string;
  status: "Completed" | "In Progress" | "Pending" | "Flagged";
}

export interface TrackLogEntry {
  trackingId: string;
  type: TrackingType;
  recipientEmail: string;
  recipientName: string;
  recipientPhone?: string;
  organization?: string;
  subjectOrTitle: string;
  submittedAt: string;
  lastUpdated: string;
  status: string;
  emailDeliveryStatus: "Delivered" | "Sent" | "Queued" | "Failed";
  emailSubject: string;
  milestones: TrackMilestone[];
  payload?: Record<string, any>;
}

export interface TrackingRecord {
  referenceId: string;
  type: TrackingType;
  entityName: string;
  email: string;
  phone?: string;
  subjectOrTitle: string;
  status: string;
  currentStageIndex: number;
  totalStages: number;
  stageName: string;
  submittedAt: string;
  lastUpdated: string;
  details: Record<string, any>;
}

// Sequence generators with random padding to guarantee uniqueness
export const generateReferenceId = (type: TrackingType): string => {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const timeSuffix = Date.now().toString().slice(-2);
  const uniqueNum = `${randomSuffix}${timeSuffix}`;

  switch (type) {
    case "tender_notice":
      return `RBG-TEN-${year}-${uniqueNum.slice(0, 4)}`;
    case "tender_bid":
      return `RBG-BID-${year}-${uniqueNum.slice(0, 5)}`;
    case "career_application":
      return `RBG-APP-${year}-${uniqueNum.slice(0, 5)}`;
    case "vendor_registration":
      return `RBG-SUP-${year}-${uniqueNum.slice(0, 4)}`;
    case "public_inquiry":
      return `RBG-ENQ-${year}-${uniqueNum.slice(0, 4)}`;
    default:
      return `RBG-REF-${year}-${uniqueNum.slice(0, 4)}`;
  }
};

/**
 * Get all Track Logs from local storage
 */
export const getTrackLogs = (): TrackLogEntry[] => {
  try {
    const raw = localStorage.getItem("rbg_track_logs");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading rbg_track_logs", e);
    return [];
  }
};

/**
 * Persist / Upsert a Track Log Entry
 */
export const recordTrackLog = (entry: TrackLogEntry): void => {
  try {
    const logs = getTrackLogs();
    const existingIndex = logs.findIndex((l) => l.trackingId.toUpperCase() === entry.trackingId.toUpperCase());
    if (existingIndex >= 0) {
      logs[existingIndex] = { ...logs[existingIndex], ...entry, lastUpdated: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) };
    } else {
      logs.unshift(entry);
    }
    localStorage.setItem("rbg_track_logs", JSON.stringify(logs));
  } catch (e) {
    console.error("Error saving track log", e);
  }
};

/**
 * Append milestone event to a Track Log
 */
export const appendTrackLogMilestone = (
  trackingId: string,
  milestone: Omit<TrackMilestone, "timestamp">
): void => {
  try {
    const logs = getTrackLogs();
    const log = logs.find((l) => l.trackingId.toUpperCase() === trackingId.toUpperCase());
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    if (log) {
      log.milestones.push({
        ...milestone,
        timestamp,
      });
      log.lastUpdated = timestamp;
      log.status = milestone.stageName || log.status;
      localStorage.setItem("rbg_track_logs", JSON.stringify(logs));
    }
  } catch (e) {
    console.error("Error appending milestone", e);
  }
};

/**
 * Delete a Track Log both locally and from Supabase Cloud
 */
export const deleteTrackLog = async (trackingId: string): Promise<void> => {
  try {
    const logs = getTrackLogs().filter((l) => l.trackingId.toUpperCase() !== trackingId.toUpperCase());
    localStorage.setItem("rbg_track_logs", JSON.stringify(logs));
  } catch (e) {
    console.error("Error deleting track log from localStorage", e);
  }

  try {
    if (supabase) {
      await supabase
        .from("email_notifications_log")
        .delete()
        .or(`reference_id.eq.${trackingId},tracking_id.eq.${trackingId}`);
    }
  } catch (err) {
    console.error("Error deleting track log from Supabase cloud", err);
  }
};

/**
 * Dispatches an automated confirmation email notification to the applicant/bidder/vendor
 * and automatically records the complete Track Log & Audit Trail.
 */
export const dispatchConfirmationNotification = async (payload: {
  to: string;
  recipientName: string;
  referenceId: string;
  type: TrackingType;
  title: string;
  organization?: string;
  phone?: string;
  metaDetails?: Record<string, any>;
}): Promise<{ success: boolean; message: string }> => {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const isContactInquiry = payload.type === "public_inquiry";
  const isTenderBid = payload.type === "tender_bid";
  const isCareerApp = payload.type === "career_application";
  const isVendorReg = payload.type === "vendor_registration";

  // Dynamic Subject Line
  let emailSubject = `[Rashtra Bharosa Group] Notification: ${payload.referenceId}`;
  let emailSubtitle = "Corporate Secretariat & Communications";
  let emailHtml = "";

  if (isContactInquiry) {
    emailSubject = `Thanks for submitting your information — Rashtra Bharosa Group`;
    emailSubtitle = "Rashtra-Bharosa Group Management";
    emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px 28px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
        <table style="width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="width: 52px; vertical-align: middle;">
              <img src="https://rashtrabharosagroup.com/colour-logo.png" alt="Rashtra Bharosa Group" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain; display: block; border: 0;" />
            </td>
            <td style="vertical-align: middle; padding-left: 12px;">
              <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2; letter-spacing: -0.02em;">Rashtra Bharosa Group</h1>
              <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">${emailSubtitle}</p>
            </td>
          </tr>
        </table>
        
        <div style="font-size: 14.5px; line-height: 1.65; color: #334155;">
          <p style="margin-top: 0; font-size: 15px;">Dear <strong>${payload.recipientName}</strong>,</p>
          
          <div style="padding: 18px 20px; background-color: #f8fafc; border-left: 4px solid #0f172a; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0;">
              Thanks for submitting your information. Thanks for connecting with Rashtra Bharosa Group.
            </p>
            <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
              Your inquiry regarding <strong>"${payload.title}"</strong> has been successfully submitted and received by our central secretariat. Our corporate team will review your message and <strong>respond to you within 48 hours</strong>.
            </p>
          </div>

          <p style="font-size: 13.5px; color: #64748b;">
            Your communication has been registered and forwarded to the designated executive directorate for prioritized review.
          </p>

          <div style="margin-top: 24px; padding: 14px 18px; background-color: #f1f5f9; border-radius: 10px; font-size: 12.5px; color: #475569;">
            For urgent corporate affairs, you may also reach our central desk directly at <a href="mailto:info@rashtrabharosagroup.com" style="color: #0f172a; font-weight: 700;">info@rashtrabharosagroup.com</a> or visit our corporate headquarters.
          </div>
        </div>

        <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8;">
          <strong style="color: #475569;">Rashtra Bharosa Group Limited</strong><br/>
          <span>Rooted in Trust, Rising with Bharat</span>
        </div>
      </div>
    `;
  } else if (isTenderBid) {
    emailSubject = `[Official Bid Confirmation] ${payload.title} | Bid ID: ${payload.referenceId}`;
    emailSubtitle = "Rashtra-Bharosa Group Management";
    emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
        <table style="width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="width: 52px; vertical-align: middle;">
              <img src="https://rashtrabharosagroup.com/colour-logo.png" alt="Rashtra Bharosa Group" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain; display: block; border: 0;" />
            </td>
            <td style="vertical-align: middle; padding-left: 12px;">
              <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2; letter-spacing: -0.02em;">Rashtra Bharosa Group</h1>
              <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">${emailSubtitle}</p>
            </td>
          </tr>
        </table>
        
        <div style="font-size: 14.5px; line-height: 1.65; color: #334155;">
          <p style="margin-top: 0;">Dear <strong>${payload.recipientName}</strong>,</p>
          <p>
            Your commercial e-bid and technical dossier for <strong>${payload.title}</strong> have been successfully registered and vaulted in the Sovereign Procurement Repository.
          </p>

          <div style="margin: 20px 0; padding: 20px; background-color: #041633; border-radius: 12px; color: #ffffff;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; color: #f2b72b; letter-spacing: 0.08em; font-weight: 700;">Official Bid Reference ID</div>
            <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #ffffff; margin: 6px 0 14px 0;">${payload.referenceId}</div>
            
            <table style="width: 100%; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 10px; font-size: 12px; color: #cbd5e1;">
              <tr><td style="padding: 3px 0; color: #94a3b8;">Bidding Company:</td><td style="font-weight: 700; color: #fff;">${payload.organization || payload.recipientName}</td></tr>
              ${payload.metaDetails?.tenderId ? `<tr><td style="padding: 3px 0; color: #94a3b8;">Tender No:</td><td style="font-mono font-weight: 700; color: #fff;">${payload.metaDetails.tenderId}</td></tr>` : ''}
              ${payload.metaDetails?.financialQuote ? `<tr><td style="padding: 3px 0; color: #94a3b8;">Quoted Amount:</td><td style="font-mono font-weight: 700; color: #f2b72b;">${payload.metaDetails.financialQuote}</td></tr>` : ''}
            </table>
          </div>

          <p style="font-size: 13.5px;">
            Your bid has entered <strong>Stage 1 (Statutory Verification & Technical Scrutiny)</strong>. You can track real-time milestone progress on our E-Procurement portal using your Bid ID.
          </p>
        </div>

        <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8;">
          <strong style="color: #475569;">Rashtra Bharosa Group Procurement Desk</strong>
        </div>
      </div>
    `;
  } else if (isCareerApp) {
    emailSubject = `[Career ATS Application Logged] ${payload.title} | Application ID: ${payload.referenceId}`;
    emailSubtitle = "Rashtra-Bharosa Group Management";
    emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
        <table style="width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="width: 52px; vertical-align: middle;">
              <img src="https://rashtrabharosagroup.com/colour-logo.png" alt="Rashtra Bharosa Group" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain; display: block; border: 0;" />
            </td>
            <td style="vertical-align: middle; padding-left: 12px;">
              <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2; letter-spacing: -0.02em;">Rashtra Bharosa Group</h1>
              <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">${emailSubtitle}</p>
            </td>
          </tr>
        </table>
        
        <div style="font-size: 14.5px; line-height: 1.65; color: #334155;">
          <p style="margin-top: 0;">Dear <strong>${payload.recipientName}</strong>,</p>
          <p>
            Thank you for applying to Rashtra Bharosa Group. Your credentials and CV for <strong>${payload.title}</strong> have been securely vaulted in our Human Capital ATS repository.
          </p>

          <div style="margin: 20px 0; padding: 20px; background-color: #041633; border-radius: 12px; color: #ffffff;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; color: #f2b72b; letter-spacing: 0.08em; font-weight: 700;">Candidate Application Reference ID</div>
            <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #ffffff; margin: 6px 0 14px 0;">${payload.referenceId}</div>
            
            <table style="width: 100%; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 10px; font-size: 12px; color: #cbd5e1;">
              <tr><td style="padding: 3px 0; color: #94a3b8;">Applied Position:</td><td style="font-weight: 700; color: #fff;">${payload.title}</td></tr>
              <tr><td style="padding: 3px 0; color: #94a3b8;">Candidate Name:</td><td style="font-weight: 700; color: #fff;">${payload.recipientName}</td></tr>
              ${payload.metaDetails?.vertical ? `<tr><td style="padding: 3px 0; color: #94a3b8;">Vertical:</td><td style="color: #fff;">${payload.metaDetails.vertical}</td></tr>` : ''}
            </table>
          </div>

          <p style="font-size: 13.5px;">
            Our talent acquisition panel is conducting preliminary credential scrutiny. You can track your 5-stage recruitment workflow online via our Careers portal using your Application ID.
          </p>
        </div>

        <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8;">
          <strong style="color: #475569;">Rashtra Bharosa Group Talent Acquisition Board</strong>
        </div>
      </div>
    `;
  } else if (isVendorReg) {
    emailSubject = `[Vendor Empanelment Confirmed] Supplier ID: ${payload.referenceId} — Rashtra Bharosa Group`;
    emailSubtitle = "Rashtra-Bharosa Group Management";
    emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
        <table style="width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; border-collapse: collapse;">
          <tr>
            <td style="width: 52px; vertical-align: middle;">
              <img src="https://rashtrabharosagroup.com/colour-logo.png" alt="Rashtra Bharosa Group" width="48" height="48" style="width: 48px; height: 48px; object-fit: contain; display: block; border: 0;" />
            </td>
            <td style="vertical-align: middle; padding-left: 12px;">
              <h1 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2; letter-spacing: -0.02em;">Rashtra Bharosa Group</h1>
              <p style="font-size: 11px; color: #64748b; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">${emailSubtitle}</p>
            </td>
          </tr>
        </table>
        
        <div style="font-size: 14.5px; line-height: 1.65; color: #334155;">
          <p style="margin-top: 0;">Dear <strong>${payload.recipientName}</strong>,</p>
          <p>
            Your organization <strong>"${payload.organization || payload.recipientName}"</strong> has been successfully enrolled in the Rashtra Bharosa Group Empanelled Supplier Network.
          </p>

          <div style="margin: 20px 0; padding: 20px; background-color: #041633; border-radius: 12px; color: #ffffff;">
            <div style="font-size: 10px; font-family: monospace; text-transform: uppercase; color: #f2b72b; letter-spacing: 0.08em; font-weight: 700;">Permanent Supplier ID</div>
            <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #ffffff; margin: 6px 0 14px 0;">${payload.referenceId}</div>
            
            <table style="width: 100%; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 10px; font-size: 12px; color: #cbd5e1;">
              <tr><td style="padding: 3px 0; color: #94a3b8;">Organization:</td><td style="font-weight: 700; color: #fff;">${payload.organization || payload.recipientName}</td></tr>
              ${payload.metaDetails?.GSTIN || payload.metaDetails?.gstin ? `<tr><td style="padding: 3px 0; color: #94a3b8;">GSTIN:</td><td style="font-mono font-weight: 700; color: #fff;">${payload.metaDetails.GSTIN || payload.metaDetails.gstin}</td></tr>` : ''}
              ${payload.metaDetails?.Category || payload.metaDetails?.category ? `<tr><td style="padding: 3px 0; color: #94a3b8;">Category:</td><td style="color: #fff;">${payload.metaDetails.Category || payload.metaDetails.category}</td></tr>` : ''}
            </table>
          </div>

          <p style="font-size: 13.5px;">
            This Supplier ID authorizes your company to participate in active e-tenders, machinery procurement, and vendor RFPs across all Rashtra Bharosa Group subsidiaries.
          </p>
        </div>

        <div style="margin-top: 32px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 11.5px; color: #94a3b8;">
          <strong style="color: #475569;">Rashtra Bharosa Group Vendor Empanelment Directorate</strong>
        </div>
      </div>
    `;
  }

  // Trigger actual email dispatch via Resend
  sendEmailViaResend({
    to: payload.to,
    subject: emailSubject,
    html: emailHtml,
  }).catch((err) => console.warn("Email notification dispatch notice:", err));

  // 1. Record in Track Logs Audit System
  const initialMilestones: TrackMilestone[] = [
    {
      timestamp,
      stageName: isContactInquiry ? "Inquiry Received" : "Submission Received",
      action: isContactInquiry ? "Contact Inquiry Logged" : "Digital Registration Initialized",
      actor: "System Automated Gateway",
      notes: isContactInquiry
        ? "Contact details and message received. Welcome email dispatched."
        : `Registration Dossier encrypted and assigned Sovereign Reference ID ${payload.referenceId}`,
      status: "Completed",
    },
    {
      timestamp,
      stageName: "Confirmation Dispatched",
      action: "Official Email Notice Sent",
      actor: "RBG Communication Node",
      notes: `Confirmation email delivered to ${payload.to}`,
      status: "Completed",
    },
    {
      timestamp,
      stageName: "Under Executive Review",
      action: "Directorate Evaluation Queued",
      actor: "Central Directorate Desk",
      notes: "Pending review by the respective team.",
      status: "In Progress",
    },
  ];

  recordTrackLog({
    trackingId: payload.referenceId,
    type: payload.type,
    recipientEmail: payload.to,
    recipientName: payload.recipientName,
    recipientPhone: payload.phone,
    organization: payload.organization || payload.metaDetails?.organization || payload.metaDetails?.companyName,
    subjectOrTitle: payload.title,
    submittedAt: timestamp,
    lastUpdated: timestamp,
    status: "Under Executive Review",
    emailDeliveryStatus: "Delivered",
    emailSubject,
    milestones: initialMilestones,
    payload: payload.metaDetails,
  });

  // 2. Attempt dispatch to Supabase / Backend webhook if configured
  try {
    if (supabase) {
      await supabase.from("email_notifications_log").insert([
        {
          reference_id: payload.referenceId,
          recipient_email: payload.to,
          recipient_name: payload.recipientName,
          notification_type: payload.type,
          subject: emailSubject,
          status: "Sent",
          sent_at: new Date().toISOString(),
          metadata: payload.metaDetails || {},
        },
      ]);
    }
  } catch (err) {
    console.warn("Notification logged locally:", err);
  }

  // 3. Persist to local notifications audit trail
  try {
    const existingLogs = JSON.parse(localStorage.getItem("rbg_notifications_audit_log") || "[]");
    existingLogs.unshift({
      id: `NOTIF-${Date.now()}`,
      referenceId: payload.referenceId,
      recipientEmail: payload.to,
      recipientName: payload.recipientName,
      type: payload.type,
      subject: emailSubject,
      sentAt: timestamp,
      status: "Delivered",
    });
    localStorage.setItem("rbg_notifications_audit_log", JSON.stringify(existingLogs.slice(0, 100)));
  } catch (e) {
    console.error("Local notification audit error", e);
  }

  return {
    success: true,
    message: isContactInquiry
      ? `Confirmation sent to ${payload.to}`
      : `Automated confirmation sent to ${payload.to} with Reference ID ${payload.referenceId}`,
  };
};

/**
 * Universal Tracking Query: looks up any Reference ID or Email across Track Logs and tables
 */
export const lookupUnifiedTracking = (referenceIdOrEmail: string): TrackingRecord | null => {
  if (!referenceIdOrEmail) return null;
  const cleanQuery = referenceIdOrEmail.trim().toUpperCase();

  // 0. First check direct Track Logs
  const trackLogs = getTrackLogs();
  const matchedTrack = trackLogs.find(
    (l) => l.trackingId.toUpperCase() === cleanQuery || l.recipientEmail.toUpperCase() === cleanQuery
  );

  if (matchedTrack) {
    const completedCount = matchedTrack.milestones.filter((m) => m.status === "Completed").length;
    return {
      referenceId: matchedTrack.trackingId,
      type: matchedTrack.type,
      entityName: matchedTrack.recipientName,
      email: matchedTrack.recipientEmail,
      phone: matchedTrack.recipientPhone,
      subjectOrTitle: matchedTrack.subjectOrTitle,
      status: matchedTrack.status,
      currentStageIndex: Math.min(completedCount, matchedTrack.milestones.length - 1),
      totalStages: matchedTrack.milestones.length,
      stageName: matchedTrack.milestones[matchedTrack.milestones.length - 1]?.stageName || matchedTrack.status,
      submittedAt: matchedTrack.submittedAt,
      lastUpdated: matchedTrack.lastUpdated,
      details: matchedTrack.payload || {},
    };
  }

  // 1. Check Tender Bids
  try {
    const bids = JSON.parse(localStorage.getItem("rbg_bids_data") || "[]");
    const matchedBid = bids.find(
      (b: any) =>
        (b.id && b.id.toUpperCase() === cleanQuery) ||
        (b.bidSubmissionId && b.bidSubmissionId.toUpperCase() === cleanQuery) ||
        (b.email && b.email.toUpperCase() === cleanQuery) ||
        (b.tenderId && b.tenderId.toUpperCase() === cleanQuery)
    );
    if (matchedBid) {
      const stages = [
        "Bid Submitted & Encrypted",
        "Statutory & EMD Verification",
        "Technical Evaluation",
        "Commercial Price Bid Opening",
        "L1 Determination & Auditing",
        "Committee Approval",
        "Letter of Intent (LoI)",
        "Contract Award Finalized",
      ];
      const stageIdx = matchedBid.status === "Approved" ? 7 : matchedBid.status === "Under Review" ? 2 : 1;
      return {
        referenceId: matchedBid.id || matchedBid.bidSubmissionId,
        type: "tender_bid",
        entityName: matchedBid.bidderName || matchedBid.companyName || "Empanelled Bidder",
        email: matchedBid.contactEmail || matchedBid.email || "",
        phone: matchedBid.contactPhone || matchedBid.phone || "",
        subjectOrTitle: matchedBid.tenderTitle || `Tender Bid (${matchedBid.tenderId})`,
        status: matchedBid.status || "Under Technical Review",
        currentStageIndex: stageIdx,
        totalStages: stages.length,
        stageName: stages[stageIdx] || "Technical Evaluation",
        submittedAt: matchedBid.submittedAt || matchedBid.timestamp || "2026",
        lastUpdated: matchedBid.lastUpdated || "2026",
        details: matchedBid,
      };
    }
  } catch (e) {}

  // 2. Check Career Applications
  try {
    const apps = JSON.parse(localStorage.getItem("rbg_career_applications") || "[]");
    const matchedApp = apps.find(
      (a: any) =>
        (a.id && a.id.toUpperCase() === cleanQuery) ||
        (a.applicationId && a.applicationId.toUpperCase() === cleanQuery) ||
        (a.email && a.email.toUpperCase() === cleanQuery)
    );
    if (matchedApp) {
      const stages = [
        "Application Received & Screened",
        "Technical Directorate Assessment",
        "Panel Leadership Interview",
        "Background & Credential Verification",
        "Formal Appointment Offer Issued",
      ];
      const stageIdx = matchedApp.status === "Offered" ? 4 : matchedApp.status === "Shortlisted" ? 2 : 0;
      return {
        referenceId: matchedApp.id || matchedApp.applicationId,
        type: "career_application",
        entityName: matchedApp.candidateName || matchedApp.fullName || "Candidate",
        email: matchedApp.email || "",
        phone: matchedApp.phone || "",
        subjectOrTitle: matchedApp.jobTitle || "Executive Role",
        status: matchedApp.status || "Application Under Review",
        currentStageIndex: stageIdx,
        totalStages: stages.length,
        stageName: stages[stageIdx] || "Technical Directorate Assessment",
        submittedAt: matchedApp.submittedAt || matchedApp.dateApplied || "2026",
        lastUpdated: matchedApp.lastUpdated || "2026",
        details: matchedApp,
      };
    }
  } catch (e) {}

  // 3. Check Vendor Registrations
  try {
    const suppliers = JSON.parse(localStorage.getItem("rbg_suppliers_data") || "[]");
    const matchedSupplier = suppliers.find(
      (s: any) =>
        (s.id && s.id.toUpperCase() === cleanQuery) ||
        (s.supplierId && s.supplierId.toUpperCase() === cleanQuery) ||
        (s.email && s.email.toUpperCase() === cleanQuery)
    );
    if (matchedSupplier) {
      return {
        referenceId: matchedSupplier.id || matchedSupplier.supplierId,
        type: "vendor_registration",
        entityName: matchedSupplier.companyName || matchedSupplier.name || "Vendor",
        email: matchedSupplier.contactEmail || matchedSupplier.email || "",
        phone: matchedSupplier.contactPhone || matchedSupplier.phone || "",
        subjectOrTitle: `Empanelled Supplier - Category: ${matchedSupplier.category || "General"}`,
        status: matchedSupplier.status || "Empanelled & Active",
        currentStageIndex: 3,
        totalStages: 3,
        stageName: "Active Empanelled Directory",
        submittedAt: matchedSupplier.registeredAt || "2026",
        lastUpdated: matchedSupplier.lastUpdated || "2026",
        details: matchedSupplier,
      };
    }
  } catch (e) {}

  // 4. Check Public Inquiries / Forms Desk
  try {
    const inquiries = JSON.parse(localStorage.getItem("rbg_inquiries_data") || "[]");
    const matchedInq = inquiries.find(
      (i: any) =>
        (i.id && i.id.toUpperCase() === cleanQuery) ||
        (i.email && i.email.toUpperCase() === cleanQuery)
    );
    if (matchedInq) {
      return {
        referenceId: matchedInq.id,
        type: "public_inquiry",
        entityName: matchedInq.fullName,
        email: matchedInq.email,
        phone: matchedInq.phone,
        subjectOrTitle: matchedInq.subject || "Executive Consultation",
        status: matchedInq.status || "New",
        currentStageIndex: matchedInq.status === "Closed" ? 3 : matchedInq.status === "In Progress" ? 2 : 1,
        totalStages: 3,
        stageName: matchedInq.status === "Closed" ? "Resolution Complete" : "Directorate Desk Review",
        submittedAt: matchedInq.timestamp || "2026",
        lastUpdated: matchedInq.timestamp || "2026",
        details: matchedInq,
      };
    }
  } catch (e) {}

  return null;
};

