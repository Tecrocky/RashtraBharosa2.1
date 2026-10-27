import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Share2, Building2, Loader2 } from "lucide-react";
import { initialArticlesData, ArticleItem } from "@/pages/admin/ArticleEditor";
import { initialNewsData, NewsItem } from "@/pages/admin/NewsEditor";
import { supabase } from "@/lib/supabase";
import MetaTags from "@/components/MetaTags";

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Look in full articles or news locally first
  const [article, setArticle] = useState<ArticleItem | null>(() => {
    const storedArticles: ArticleItem[] = JSON.parse(
      localStorage.getItem("rbg_content_articles_full") || "null"
    ) || initialArticlesData;
    return storedArticles.find((a) => a.slug === slug || a.id === slug) || null;
  });

  const [news, setNews] = useState<NewsItem | null>(() => {
    const storedNews: NewsItem[] = JSON.parse(
      localStorage.getItem("rbg_news_posts") || "null"
    ) || initialNewsData;
    return storedNews.find((n) => n.slug === slug || n.id === slug) || null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(!article && !news);

  // If not found locally (e.g. on mobile), fetch directly from Supabase
  useEffect(() => {
    const fetchFromCloud = async () => {
      if (!slug) return;
      try {
        // Try fetching article from Supabase
        const { data: artData } = await supabase
          .from("articles")
          .select("*")
          .or(`slug.eq.${slug},id.eq.${slug}`)
          .maybeSingle();

        if (artData) {
          const item: ArticleItem = {
            id: artData.id,
            title: artData.title,
            slug: artData.slug,
            excerpt: artData.excerpt || "",
            author: artData.author || "Executive Secretariat",
            category: artData.category || "Corporate",
            featuredImage: artData.featured_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            featuredImageAlt: artData.featured_image_alt || "",
            publicationDate: artData.publication_date || artData.published_date || artData.created_at?.split("T")[0] || "2026-10-02",
            relatedBusiness: artData.related_business || "Rashtra Bharosa Group Limited",
            relatedProject: artData.related_project || "General Group Initiative",
            tags: Array.isArray(artData.tags) ? artData.tags : ["Corporate"],
            content: artData.content || artData.body_html || artData.body || "",
            seoTitle: artData.seo_title || artData.title,
            seoDescription: artData.seo_description || artData.excerpt || "",
            status: artData.status || "Published",
            views: artData.views || 0,
            createdAt: artData.created_at || new Date().toISOString(),
          };
          setArticle(item);
          setIsLoading(false);
          return;
        }

        // Try fetching news from Supabase
        const { data: newsData } = await supabase
          .from("news")
          .select("*")
          .or(`slug.eq.${slug},id.eq.${slug}`)
          .maybeSingle();

        if (newsData) {
          const item: NewsItem = {
            id: newsData.id,
            title: newsData.title,
            slug: newsData.slug,
            category: newsData.category || "Corporate",
            date: newsData.date || newsData.release_date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            excerpt: newsData.excerpt || "",
            content: newsData.content || newsData.body || "",
            featuredImage: newsData.featured_image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            author: newsData.author || "Corporate Secretariat",
            relatedBusiness: newsData.related_business || "Rashtra Bharosa Group",
            relatedProject: newsData.related_project || "Corporate Initiative",
            status: newsData.status || "Published",
          };
          setNews(item);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Cloud article lookup error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromCloud();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-800 mb-3" />
        <p className="text-xs text-neutral-500 font-mono">Retrieving sovereign publication from cloud archives...</p>
      </div>
    );
  }

  if (!article && !news) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested publication could not be located in the sovereign archives.</p>
        <Link
          to="/media"
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider"
        >
          Return to Media Centre
        </Link>
      </div>
    );
  }

  const title = article ? article.title : news?.title || "";
  const category = article ? article.category : news?.category || "";
  const date = article ? article.publicationDate : news?.date || "";
  const author = article ? article.author : "Corporate Secretariat";
  const relatedBusiness = article ? article.relatedBusiness : news?.relatedBusiness || "";
  const featuredImage = article ? article.featuredImage : news?.featuredImage || "";
  const excerpt = article ? article.excerpt : news?.excerpt || "";
  const content = article ? article.content : news?.content || "";
  const tags = article?.tags || [];
  const seoTitle = (article && article.seoTitle) ? article.seoTitle : `${title} | Rashtra Bharosa Group`;
  const seoDescription = (article && article.seoDescription) ? article.seoDescription : excerpt;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "image": [featuredImage],
    "datePublished": date,
    "dateModified": date,
    "author": [{
      "@type": "Person",
      "name": author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Rashtra Bharosa Group Limited",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.rashtrabharosagroup.com/colour-logo.png"
      }
    },
    "description": excerpt
  };

  return (
    <article className="min-h-screen bg-[#FBFBFC] text-slate-900 font-sans pb-24">
      {/* Dynamic SEO Meta Injection with Article Banner as OG Image */}
      <MetaTags
        title={seoTitle}
        description={seoDescription}
        image={featuredImage}
        type="article"
        articlePublishedTime={date}
        articleAuthor={author}
        articleSection={category}
        schema={articleSchema}
      />

      {/* Top Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-6">
        <Link
          to="/media"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Media & Publications
        </Link>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-4">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-bold uppercase tracking-wider text-[10px]">
            {category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            {relatedBusiness}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-950 leading-tight mb-6">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-lg text-slate-600 leading-relaxed font-sans border-l-2 border-slate-950 pl-5 mb-8">
            {excerpt}
          </p>
        )}
      </div>

      {/* Featured Image Banner */}
      {featuredImage && (
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-video max-h-[520px]">
            <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Author Line */}
        <div className="flex items-center justify-between border-y border-slate-200 py-4 mb-8 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-800 font-sans">
              {author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-slate-900 font-sans">{author}</div>
              <div className="text-[11px]">Rashtra Bharosa Group Directorate</div>
            </div>
          </div>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Article URL copied to clipboard!");
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Content Body */}
        <div
          className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-black prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="pt-8 mt-12 border-t border-slate-200 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleDetail;
