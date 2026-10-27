import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  articlePublishedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

const defaultMeta = {
  title: "Rashtra Bharosa Group — Rooted in Trust, Rising with Bharat",
  description:
    "A diversified Indian industrial conglomerate operating across Mining, Infrastructure, Healthcare, Technology, Real Estate, Agriculture, and Strategic Capital.",
  keywords:
    "Rashtra Bharosa Group, Indian Conglomerate, Mining, Infrastructure EPC, Healthcare, Technology AI, Real Estate, Agriculture, Subransu Mohanty, Odisha Industry",
  image: "https://www.rashtrabharosagroup.com/rashtra-bharosa-group-og.png",
  url: "https://www.rashtrabharosagroup.com",
};

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  articlePublishedTime,
  articleAuthor,
  articleSection,
  schema,
}) => {
  const location = useLocation();

  const finalTitle = title
    ? title.includes("Rashtra Bharosa")
      ? title
      : `${title} | Rashtra Bharosa Group`
    : defaultMeta.title;

  const finalDescription = description || defaultMeta.description;
  const finalKeywords = keywords || defaultMeta.keywords;
  
  // Ensure image is a full absolute URL for Open Graph and Twitter crawlers
  const getAbsoluteImageUrl = (img?: string) => {
    if (!img) return defaultMeta.image;
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/")) return `https://www.rashtrabharosagroup.com${img}`;
    return `https://www.rashtrabharosagroup.com/${img}`;
  };

  const finalImage = getAbsoluteImageUrl(image || defaultMeta.image);
  const finalUrl = url || `https://www.rashtrabharosagroup.com${location.pathname}`;

  useEffect(() => {
    // 1. Update document title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const setMeta = (nameAttr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta
    setMeta("name", "description", finalDescription);
    setMeta("name", "keywords", finalKeywords);

    // OpenGraph
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:description", finalDescription);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", finalUrl);
    setMeta("property", "og:image", finalImage);
    setMeta("property", "og:site_name", "Rashtra Bharosa Group");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", "@rashtrabharosa");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:description", finalDescription);
    setMeta("name", "twitter:image", finalImage);

    // Article Specific Meta
    if (type === "article") {
      if (articlePublishedTime) setMeta("property", "article:published_time", articlePublishedTime);
      if (articleAuthor) setMeta("property", "article:author", articleAuthor);
      if (articleSection) setMeta("property", "article:section", articleSection);
    }

    // Canonical link tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", finalUrl);

    // Dynamic JSON-LD Schema
    const schemaScriptId = "dynamic-jsonld-schema";
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = schemaScriptId;
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.text = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [finalTitle, finalDescription, finalKeywords, finalImage, finalUrl, type, articlePublishedTime, articleAuthor, articleSection, schema]);

  return null;
};

export default MetaTags;
