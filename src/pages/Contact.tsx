import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
    Phone, Mail, ArrowUpRight, Globe, Ticket, Send, CheckCircle, 
    AlertCircle, Sparkles, X, Copy, Check, ExternalLink
} from 'lucide-react';
import officeHeroVideo from "@/assets/VIDEOS/office.mp4";
import contactBgVideo from "@/assets/VIDEOS/Contact page background video.mp4";
import { sendEmailViaResend } from "@/utils/emailService";
import { supabase } from "@/lib/supabase";
import { generateReferenceId, dispatchConfirmationNotification } from "@/lib/trackingService";
import MetaTags from "@/components/MetaTags";

const FORMSUBMIT_URL = "https://formspree.io/f/xqaopqdk";

interface UniversalFormData {
    fullName: string;
    companyName: string;
    designation: string;
    email: string;
    mobileNumber: string;
    country: string;
    state: string;
    cityDistrict: string;
    reasonForContact: string;
    selectedCompany: string;
    selectedProject: string;
    subject: string;
    message: string;
}

const REASON_OPTIONS = [
    "General Enquiry",
    "Business Partnership",
    "Investment",
    "Vendor / Supplier",
    "Tender / Procurement",
    "Careers",
    "Media / Press",
    "Governance",
    "Other"
];

const COMPANY_OPTIONS = [
    "-- Not Specified / General Group --",
    "Rashtra Bharosa Group",
    "RashBhar Mining",
    "RashBhar Technology",
    "RashBhar Real Estate",
    "RashBhar Health Care",
    "RashBhar Soil & Soul",
    "Innovex Construction",
    "Royal Birds Group"
];

const PROJECT_OPTIONS = [
    { label: "-- Select Associated Project (Optional) --", value: "", link: "" },
    { label: "Reyansh Elanza Luxury Residential Enclave (Bhubaneswar)", value: "Reyansh Elanza Luxury Residential Enclave", link: "/projects/reyansh-elanza" },
    { label: "Odisha Iron Ore Belt Extraction Project (Sundergarh)", value: "Odisha Iron Ore Belt Extraction Project", link: "/projects/odisha-iron-ore" },
    { label: "Jharkhand Integrated Coal & Rare Minerals Hub", value: "Jharkhand Integrated Coal & Rare Minerals Hub", link: "/projects/jharkhand-coal-minerals" },
    { label: "Bhubaneswar Flagship Medical Center & Heart Institute", value: "Bhubaneswar Flagship Medical Center", link: "/projects/bbsr-hospital" },
    { label: "Swasthya Saathi Digital Health Platform", value: "Swasthya Saathi Digital Health Platform", link: "/projects/swasthya-saathi" },
    { label: "Organic Farming Clusters — Jharkhand", value: "Organic Farming Clusters — Jharkhand", link: "/projects/organic-farming-jharkhand" },
    { label: "Post-Harvest Cold-Chain Logistics & Processing Hub", value: "Post-Harvest Cold-Chain Logistics Hub", link: "/projects/agri-processing-coldchain" },
    { label: "RashtrAI Enterprise Sovereign Intelligence Grid", value: "RashtrAI Enterprise Sovereign Intelligence", link: "/rd/rashtrai" },
    { label: "VED Ri Robotics & Autonomous Industrial Systems", value: "VED Ri Robotics Research Lab", link: "/rd/ved-ri" },
    { label: "AgriGel™ Biodegradable Hydrogel Soil Initiative", value: "AgriGel™ Soil Technology", link: "/rd/agrigel" }
];

export default function Contact() {
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const formSectionRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<UniversalFormData>({
        fullName: "",
        companyName: "",
        designation: "",
        email: "",
        mobileNumber: "",
        country: "India",
        state: "",
        cityDistrict: "",
        reasonForContact: "General Enquiry",
        selectedCompany: "",
        selectedProject: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedInqId, setSubmittedInqId] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState("");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEmail(text);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    const handleOpenForm = () => {
        setShowFormModal(true);
        setTimeout(() => {
            formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectReason = (reason: string) => {
        setFormData({ ...formData, reasonForContact: reason });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.country || !formData.state || !formData.cityDistrict || !formData.subject || !formData.message) {
            setErrorMsg("Please fill in all mandatory fields marked with an asterisk (*).");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMsg("Please provide a valid email address.");
            return;
        }

        setIsSubmitting(true);
        const generatedInqId = generateReferenceId("public_inquiry");
        setSubmittedInqId(generatedInqId);

        try {
            // 1. Dispatch via Formspree Endpoint
            const formspreePromise = fetch(FORMSUBMIT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ ...formData, referenceId: generatedInqId }),
            });

            // 2. Dispatch via Resend API (Transactional Backup)
            const emailHtml = `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #0f172a; max-width: 620px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <table style="width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 14px; margin-bottom: 20px; border-collapse: collapse;">
                        <tr>
                            <td style="width: 50px; vertical-align: middle;">
                                <img src="https://rashtrabharosagroup.com/colour-logo.png" alt="Rashtra Bharosa Group" width="44" height="44" style="width: 44px; height: 44px; object-fit: contain; display: block; border: 0;" />
                            </td>
                            <td style="vertical-align: middle; padding-left: 12px;">
                                <h2 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2;">Rashtra Bharosa Group</h2>
                                <p style="font-size: 11px; color: #64748b; margin: 3px 0 0 0; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Rashtra-Bharosa Group Management</p>
                            </td>
                        </tr>
                    </table>
                    <div style="font-size: 13.5px; color: #334155;">
                        <p style="margin-top: 0; font-weight: 700; color: #0f172a;">New Corporate Inquiry Received — ${generatedInqId}</p>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 12px 0;">
                            <tr><td style="padding: 5px 0; font-weight: bold; width: 140px; color: #64748b;">Reference ID:</td><td style="font-mono font-weight: 700;">${generatedInqId}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Full Name:</td><td style="font-weight: 600;">${formData.fullName}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Email:</td><td><a href="mailto:${formData.email}" style="color: #0284c7;">${formData.email}</a></td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Mobile:</td><td>${formData.mobileNumber}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Company / Org:</td><td>${formData.companyName || 'Not specified'}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Designation:</td><td>${formData.designation || 'Not specified'}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Location:</td><td>${formData.cityDistrict}, ${formData.state}, ${formData.country}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Associated Entity:</td><td>${formData.selectedCompany || 'Rashtra Bharosa Group'}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Associated Project:</td><td>${formData.selectedProject || 'General Inquiry'}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Reason:</td><td>${formData.reasonForContact}</td></tr>
                            <tr><td style="padding: 5px 0; font-weight: bold; color: #64748b;">Subject:</td><td><strong>${formData.subject}</strong></td></tr>
                        </table>
                        <div style="margin-top: 15px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #0f172a; border-radius: 6px;">
                            <strong style="color: #0f172a; font-size: 12px; text-transform: uppercase;">Message Content:</strong>
                            <p style="margin: 6px 0 0 0; white-space: pre-wrap; font-size: 13.5px; color: #334155;">${formData.message}</p>
                        </div>
                    </div>
                </div>
            `;

            sendEmailViaResend({
                to: "info@rashtrabharosagroup.com",
                subject: `[Website Inquiry: ${generatedInqId}] ${formData.subject} - ${formData.fullName}`,
                html: emailHtml,
                reply_to: formData.email,
            }).catch(e => console.warn("Resend backup dispatch notice:", e));

            // Automated Confirmation Email to Applicant
            await dispatchConfirmationNotification({
                to: formData.email,
                recipientName: formData.fullName,
                referenceId: generatedInqId,
                type: "public_inquiry",
                title: formData.subject || "General Corporate Inquiry",
                metaDetails: {
                    Subject: formData.subject,
                    Reason: formData.reasonForContact,
                    Company: formData.selectedCompany || "Rashtra Bharosa Group",
                },
            });

            // 3. Persist in LocalStorage
            try {
                const existingInquiries = JSON.parse(localStorage.getItem("rbg_inquiries_data") || "[]");
                existingInquiries.unshift({
                    id: generatedInqId,
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.mobileNumber,
                    companyName: formData.companyName || "",
                    designation: formData.designation || "",
                    location: `${formData.cityDistrict}, ${formData.state}, ${formData.country}`,
                    selectedCompany: formData.selectedCompany || "Rashtra Bharosa Group",
                    selectedProject: formData.selectedProject || "General Inquiry",
                    reason: formData.reasonForContact,
                    subject: formData.subject,
                    message: formData.message,
                    timestamp: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                    status: "New",
                    assignedOfficer: "Directorate General Secretariat",
                });
                localStorage.setItem("rbg_inquiries_data", JSON.stringify(existingInquiries.slice(0, 100)));
            } catch (e) {}

            // 4. Persist in Supabase Realtime Database
            supabase.from("inquiries").insert([
                {
                    id: generatedInqId,
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.mobileNumber,
                    company_name: formData.companyName || "",
                    designation: formData.designation || "",
                    location: `${formData.cityDistrict}, ${formData.state}, ${formData.country}`,
                    selected_company: formData.selectedCompany || "Rashtra Bharosa Group",
                    selected_project: formData.selectedProject || "General Inquiry",
                    reason: formData.reasonForContact,
                    subject: formData.subject,
                    message: formData.message,
                    status: "New",
                    assigned_officer: "Office of the Secretariat",
                },
            ]).then(({ error }) => {
                if (error) console.warn("Supabase inquiry insert note:", error.message);
            }).catch((err) => console.warn("Supabase network note:", err));

            await formspreePromise;
            setIsSubmitted(true);
        } catch (err: any) {
            console.error("Form Error:", err);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
            <MetaTags
              title="Contact Corporate Secretariat & Regional Offices | Rashtra Bharosa Group"
              description="Reach our Corporate Headquarters at Forest Park Bhubaneswar or regional offices in Jamshedpur, Balasore, Noida, and Amaravati."
              keywords="Contact Rashtra Bharosa Group, Headquarters Address Bhubaneswar, Mining Office Jamshedpur, Regional Corporate Offices"
              url="https://www.rashtrabharosagroup.com/contact"
              schema={{
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "mainEntity": {
                  "@type": "Organization",
                  "name": "Rashtra Bharosa Group",
                  "url": "https://www.rashtrabharosagroup.com/",
                  "telephone": "+91-11-6965-5291",
                  "email": "info@rashtrabharosagroup.com"
                }
              }}
            />
            
            {/* --- 1. CLEAN BREADCRUMB & TITLE (ADANI STYLE) --- */}
            <div className="pt-32 pb-8 sm:pt-40 sm:pb-12 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="text-xs text-slate-400 font-medium tracking-wide mb-4">
                        Home &nbsp;/&nbsp; <span className="text-slate-700">Contact Us</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 uppercase">
                        CONTACT US
                    </h1>
                </div>
            </div>

            {/* --- 2. ADANI-STYLE FEATURED CORPORATE HOUSE SECTION --- */}
            <section className="pb-24 lg:pb-32">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        
                        {/* Left: Office Video Card */}
                        <div className="lg:col-span-7 h-[360px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative bg-slate-950">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                src={officeHeroVideo}
                            />
                            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                                Principal Headquarters
                            </div>
                        </div>

                        {/* Right: Corporate House Style Details */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">
                                    Our Corporate Headquarters
                                </div>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                                    RASHTRA BHAROSA CORPORATE HOUSE
                                </h2>
                            </div>

                            <div className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                                B1/1-6, Bhimpur, Forest Park, Bhubaneswar, Odisha — 751009, India.
                            </div>

                            <div className="pt-6 border-t border-slate-200 space-y-4 text-sm">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Mail className="w-5 h-5 text-amber-700 shrink-0" />
                                    <button
                                        onClick={() => copyToClipboard("info@rashtrabharosagroup.com")}
                                        className="font-semibold text-slate-900 hover:text-amber-700 text-base flex items-center gap-2 group transition-colors"
                                        title="Copy Email Address"
                                    >
                                        <span>info@rashtrabharosagroup.com</span>
                                        {copiedEmail ? (
                                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                                <Check className="w-4 h-4" />
                                                <span>Copied</span>
                                            </span>
                                        ) : (
                                            <Copy className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Buttons: Get Directions + Open Contact Form */}
                            <div className="pt-4 flex flex-wrap items-center gap-4">
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Rashtra+Bharosa+Group+Limited+B1/1-6,+Bhimpur,+Forest+Park,+Bhubaneswar,+Odisha+751009"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                                >
                                    <span>Get Directions on Google Maps</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>

                                <button
                                    onClick={handleOpenForm}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20 active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Contact Form</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. FULL-SCREEN CINEMATIC VIDEO MODAL WITH COMPACT FROSTED GLASS TABLET --- */}
            {showFormModal && (
                <div 
                    className="fixed inset-0 z-[99999] overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 animate-in fade-in duration-150"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowFormModal(false);
                    }}
                >
                    {/* Full-Screen Background Cinematic Video (High Brightness & Vivid Clarity) */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="fixed inset-0 w-full h-full object-cover opacity-95 brightness-110 contrast-105 pointer-events-none"
                        src={contactBgVideo}
                    />
                    
                    {/* Subtle vignette backdrop */}
                    <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none"></div>

                    {/* Ultra-Compact Landscape-Optimized Glass Form Tablet */}
                    <div className="relative z-10 w-full max-w-3xl bg-white/70 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border border-white/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] my-auto max-h-[96vh] overflow-y-auto">
                        
                        {/* Compact Header */}
                        <div className="flex items-center justify-between border-b border-slate-900/15 pb-2 mb-3">
                            <div>
                                <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight leading-none">
                                    Contact Form
                                </h2>
                                <p className="text-slate-700 font-medium text-[10.5px] mt-0.5">
                                    Please share your inquiry details. Our corporate team will review and respond promptly.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowFormModal(false)}
                                className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 shadow-xs transition-all"
                                aria-label="Close Form"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {isSubmitted ? (
                            <div className="py-6 text-center space-y-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/80">
                                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-950">
                                        Thanks for Connecting with Rashtra Bharosa Group
                                    </h3>
                                    <p className="text-sm text-slate-700 leading-relaxed max-w-md mx-auto font-medium">
                                        Thanks for submitting your information. Our team has received your message and will connect with you shortly.
                                    </p>
                                    <p className="text-xs text-slate-500 font-mono">
                                        A confirmation email has been dispatched to <strong>{formData.email}</strong>.
                                    </p>
                                </div>

                                <div className="pt-3">
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setShowFormModal(false);
                                        }}
                                        className="px-8 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 shadow-md transition-all cursor-pointer"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-2.5">
                                {errorMsg && (
                                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 backdrop-blur-md flex items-center gap-2 text-red-900 text-[11px] font-semibold">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                {/* Row 1: Full Name, Company Name, Designation (3 Columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            1. Full Name <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Your full name"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            2. Company / Org <span className="text-slate-500 font-normal lowercase">(opt)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Company name"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            3. Designation <span className="text-slate-500 font-normal lowercase">(opt)</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="designation"
                                            placeholder="e.g. Director"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Email Address, Mobile Number, Select Company (3 Columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            4. Email Address <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="name@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            5. Mobile Number <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobileNumber"
                                            placeholder="+91 Mobile number"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            6. Select Company <span className="text-slate-500 font-normal lowercase">(optional)</span>
                                        </label>
                                        <select
                                            name="selectedCompany"
                                            value={formData.selectedCompany}
                                            onChange={handleChange}
                                            className="w-full h-8 px-2 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        >
                                            {COMPANY_OPTIONS.map((company) => (
                                                <option key={company} value={company}>
                                                    {company}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Row 3: Associated Project Selection & Live Link Generator (Interactive) */}
                                <div className="p-2 sm:p-2.5 rounded-lg bg-amber-500/10 border border-amber-600/20 backdrop-blur-md space-y-1.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-950">
                                            7. Associated Project <span className="text-amber-800 font-normal lowercase">(optional — select if inquiring about a specific project)</span>
                                        </label>
                                        {formData.selectedProject && (
                                            <span className="text-[10px] font-semibold text-amber-900 flex items-center gap-1">
                                                <span>Direct project routing active</span>
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                                        <div className={formData.selectedProject ? "sm:col-span-8" : "sm:col-span-12"}>
                                            <select
                                                name="selectedProject"
                                                value={formData.selectedProject}
                                                onChange={handleChange}
                                                className="w-full h-8 px-2.5 rounded-md bg-white/95 border border-amber-600/30 text-slate-950 font-medium text-xs focus:bg-white focus:outline-none focus:border-amber-700 shadow-2xs transition-all"
                                            >
                                                {PROJECT_OPTIONS.map((proj) => (
                                                    <option key={proj.label} value={proj.value}>
                                                        {proj.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Project Direct Link Generator Button */}
                                        {formData.selectedProject && (() => {
                                            const matchedProj = PROJECT_OPTIONS.find(p => p.value === formData.selectedProject);
                                            if (!matchedProj?.link) return null;
                                            return (
                                                <div className="sm:col-span-4 flex items-center">
                                                    <Link
                                                        to={matchedProj.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full h-8 px-2.5 rounded-md bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10.5px] flex items-center justify-center gap-1.5 transition-all shadow-xs"
                                                        title="Open dedicated project page"
                                                    >
                                                        <span>View Project Page</span>
                                                        <ExternalLink className="w-3 h-3 shrink-0" />
                                                    </Link>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>

                                {/* Row 4: Country, State, City / District (3 Columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            8. Country <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="e.g. India"
                                            value={formData.country}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            9. State <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="e.g. Odisha"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            10. City / District <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cityDistrict"
                                            placeholder="e.g. Bhubaneswar"
                                            value={formData.cityDistrict}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Reason for Contact (3x3 Compact Grid) */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-1">
                                        9. Reason for Contact <span className="text-red-600">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {REASON_OPTIONS.map((reason) => {
                                            const isSelected = formData.reasonForContact === reason;
                                            return (
                                                <button
                                                    type="button"
                                                    key={reason}
                                                    onClick={() => handleSelectReason(reason)}
                                                    className={`h-7 px-2 rounded-md text-[10.5px] font-semibold border transition-all text-left flex items-center justify-between gap-1 backdrop-blur-md ${
                                                        isSelected
                                                            ? "bg-amber-600 text-white border-amber-600 font-bold shadow-xs"
                                                            : "bg-white/80 border-white/90 text-slate-800 hover:bg-white"
                                                    }`}
                                                >
                                                    <span className="truncate">{reason}</span>
                                                    <span className={`w-3 h-3 rounded-full flex items-center justify-center border text-[8px] shrink-0 ${
                                                        isSelected ? "bg-white border-white text-amber-600 font-bold" : "border-slate-400 bg-white/90"
                                                    }`}>
                                                        {isSelected ? "✓" : ""}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Row 5: Subject & Message (2 Columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            11. Subject <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject / Summary"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-0.5">
                                            12. Message <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="message"
                                            placeholder="Brief message / requirement details..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-8 px-2.5 rounded-md bg-white/80 backdrop-blur-md border border-white/90 text-slate-950 font-medium placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-slate-900 shadow-2xs transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Row 6: Submit Button */}
                                <div className="pt-0.5">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <span>Submitting Inquiry...</span>
                                        ) : (
                                            <>
                                                <Send className="w-3 h-3 text-amber-400" />
                                                <span>Submit</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

