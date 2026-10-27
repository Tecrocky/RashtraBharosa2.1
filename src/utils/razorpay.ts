// Razorpay Standard Checkout SDK Loader & Utility

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn("Failed to load official Razorpay SDK from checkout.razorpay.com");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface InitiateTenderFeeParams {
  amountInRupees?: number;
  tenderId: string;
  tenderTitle: string;
  applicationNo: string;
  supplierName: string;
  supplierEmail: string;
  supplierPhone: string;
  supplierId: string;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void;
  onError?: (error: any) => void;
  onDismiss?: () => void;
}

export const initiateRazorpayTenderFee = async ({
  amountInRupees = 199,
  tenderId,
  tenderTitle,
  applicationNo,
  supplierName,
  supplierEmail,
  supplierPhone,
  supplierId,
  onSuccess,
  onError,
  onDismiss,
}: InitiateTenderFeeParams) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Unable to load Razorpay payment gateway. Please check your internet connection or try again.");
    if (onError) onError(new Error("Razorpay SDK load failure"));
    return;
  }

  // Retrieve Razorpay Key from .env or fallback
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyIdHere";

  // Amount in Paise (e.g. 199 INR = 19900 paise)
  const amountInPaise = Math.round(amountInRupees * 100);

  const options = {
    key: razorpayKey,
    amount: amountInPaise,
    currency: "INR",
    name: "Rashtra Bharosa Group",
    description: `Tender Processing & Portal Verification Fee - ${tenderId}`,
    image: "https://cdn-icons-png.flaticon.com/512/924/924915.png",
    handler: function (response: RazorpayPaymentSuccessResponse) {
      onSuccess(response);
    },
    prefill: {
      name: supplierName || "Authorized Signatory",
      email: supplierEmail || "procurement@vendor.in",
      contact: supplierPhone || "+91 9876543210",
    },
    notes: {
      tender_id: tenderId,
      tender_title: tenderTitle.slice(0, 40),
      application_no: applicationNo,
      supplier_id: supplierId,
      purpose: "Non-refundable Tender Processing & Portal Verification Fee (₹199)",
    },
    theme: {
      color: "#0b376f",
      backdrop_color: "rgba(11, 55, 111, 0.6)",
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      },
      escape: true,
      animation: true,
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      console.error("Razorpay Payment Failed:", response.error);
      if (onError) onError(response.error);
      alert(`Payment failed: ${response.error?.description || "Transaction declined"}`);
    });
    rzp.open();
  } catch (err) {
    console.error("Error opening Razorpay checkout:", err);
    if (onError) onError(err);
    alert("Razorpay checkout initialization error. Please verify your Razorpay Key ID in .env.");
  }
};
