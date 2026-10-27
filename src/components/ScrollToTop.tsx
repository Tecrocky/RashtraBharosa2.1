import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // 1. Handle Scroll Position
    try {
      if (!hash) {
        window.scrollTo(0, 0);
      } else {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      }
    } catch {
      window.scrollTo(0, 0);
    }

    // 2. Trigger Virtual Page View for Google Tag Manager & Google Analytics 4 on every SPA route transition
    try {
      if (typeof window !== "undefined") {
        // Google Tag Manager dataLayer event
        if ((window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "page_view",
            page_path: pathname + search + hash,
            page_location: window.location.href,
            page_title: document.title,
          });
        }
        // Google Analytics 4 direct event
        if (typeof (window as any).gtag === "function") {
          (window as any).gtag("config", "G-XCZ3Y44WKN", {
            page_path: pathname + search + hash,
            page_location: window.location.href,
            page_title: document.title,
          });
        }
      }
    } catch (e) {
      // ignore
    }
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
