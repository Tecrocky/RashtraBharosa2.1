import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Minus,
  AlertCircle,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Video,
  Table as TableIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Pilcrow,
  Check,
  X,
  Plus,
  Trash2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  onOpenMediaLibrary?: (onSelect: (url: string, alt?: string) => void) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write comprehensive content here...",
  minHeight = "360px",
  onOpenMediaLibrary,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  // Sync value from props to editor content if not focused
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (editorRef.current && (editorRef.current === range.commonAncestorContainer || editorRef.current.contains(range.commonAncestorContainer))) {
        setSavedSelection(range.cloneRange());
      }
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection);
      }
    }
  };

  const exec = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSelection();
    try {
      if (command === "formatBlock" && value) {
        const formattedTag = value.startsWith("<") ? value : `<${value}>`;
        document.execCommand("formatBlock", false, formattedTag);
      } else {
        document.execCommand(command, false, value);
      }
    } catch (e) {
      console.warn("Formatting command error:", e);
    }
    if (editorRef.current) {
      editorRef.current.focus();
      saveSelection();
      handleInput();
    }
  };

  const insertHtml = (html: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSelection();
    try {
      document.execCommand("insertHTML", false, html);
    } catch (e) {
      console.warn("Insert HTML error:", e);
    }
    if (editorRef.current) {
      editorRef.current.focus();
      saveSelection();
      handleInput();
    }
  };

  const handleFormatHeading = (tag: "h1" | "h2" | "h3" | "h4" | "p") => {
    exec("formatBlock", tag);
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim()) {
      restoreSelection();
      exec("createLink", linkUrl.trim());
    }
    setShowLinkModal(false);
    setLinkUrl("");
  };

  const handleInsertVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      let embedHtml = "";
      const ytMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (ytMatch) {
        embedHtml = `
          <div class="my-6 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm aspect-video">
            <iframe src="https://www.youtube.com/embed/${ytMatch[1]}" class="w-full h-full border-0" allowfullscreen></iframe>
          </div>
        `;
      } else {
        embedHtml = `
          <div class="my-6 rounded-2xl overflow-hidden border border-neutral-200 bg-black aspect-video">
            <video src="${videoUrl}" controls class="w-full h-full object-cover"></video>
          </div>
        `;
      }
      insertHtml(embedHtml);
    }
    setShowVideoModal(false);
    setVideoUrl("");
  };

  const handleInsertImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      const imgHtml = `
        <figure class="my-6 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2">
          <img src="${imageUrl.trim()}" alt="${imageAlt || ""}" class="w-full h-auto rounded-xl object-cover" />
          ${imageCaption ? `<figcaption class="mt-2 text-center text-xs text-neutral-500 font-sans italic">${imageCaption}</figcaption>` : ""}
        </figure>
      `;
      insertHtml(imgHtml);
    }
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
  };

  const handleInsertCallout = () => {
    const calloutHtml = `
      <div class="my-6 p-5 rounded-2xl bg-neutral-100 border border-neutral-300 text-neutral-800 text-sm leading-relaxed">
        <strong>Strategic Key Point:</strong> Enter key corporate takeaway or highlight statement here.
      </div>
    `;
    insertHtml(calloutHtml);
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <div class="my-6 overflow-x-auto">
        <table class="w-full text-left text-sm border-collapse border border-neutral-200 rounded-xl overflow-hidden">
          <thead>
            <tr class="bg-neutral-100 border-b border-neutral-200 font-semibold text-neutral-800">
              <th class="p-3 border border-neutral-200">Specification Item</th>
              <th class="p-3 border border-neutral-200">Standard / Scope</th>
              <th class="p-3 border border-neutral-200">Compliance Benchmark</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-neutral-100">
              <td class="p-3 border border-neutral-200">Technical Metric 01</td>
              <td class="p-3 border border-neutral-200">Specification Details</td>
              <td class="p-3 border border-neutral-200">100% Verified</td>
            </tr>
            <tr class="border-b border-neutral-100 bg-neutral-50/50">
              <td class="p-3 border border-neutral-200">Execution Phase</td>
              <td class="p-3 border border-neutral-200">Commercial Standard</td>
              <td class="p-3 border border-neutral-200">ISO 9001 / BIS</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    insertHtml(tableHtml);
  };

  return (
    <div className="border border-neutral-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all focus-within:border-neutral-800 focus-within:shadow-md">
      {/* Liquid Class Monochrome Toolbar */}
      <div
        onMouseDown={(e) => {
          // If clicking a toolbar button, prevent losing focus and save current selection
          if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).closest("button")) {
            saveSelection();
            e.preventDefault();
          }
        }}
        className="bg-neutral-50/90 border-b border-neutral-200 p-2 flex flex-wrap items-center gap-1 text-neutral-700 select-none"
      >
        {/* Undo / Redo */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 mr-1">
          <button
            type="button"
            onClick={() => exec("undo")}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Headings & Paragraph */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 mr-1">
          <button
            type="button"
            onClick={() => handleFormatHeading("p")}
            title="Paragraph"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black text-xs font-semibold"
          >
            <Pilcrow className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleFormatHeading("h1")}
            title="Heading 1"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black text-xs font-bold"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => handleFormatHeading("h2")}
            title="Heading 2"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black text-xs font-bold"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => handleFormatHeading("h3")}
            title="Heading 3"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black text-xs font-bold"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => handleFormatHeading("h4")}
            title="Heading 4"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black text-xs font-bold"
          >
            H4
          </button>
        </div>

        {/* Text Formats */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 mr-1">
          <button
            type="button"
            onClick={() => exec("bold")}
            title="Bold"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors font-bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            title="Italic"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            title="Underline"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors underline"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            title="Strikethrough"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors line-through"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("code")}
            title="Inline Code"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 mr-1">
          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            title="Align Left"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            title="Align Center"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            title="Align Right"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyFull")}
            title="Justify"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 mr-1">
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            title="Bullet List"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            title="Numbered List"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Structure & Embeds */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 mr-1">
          <button
            type="button"
            onClick={() => handleFormatHeading("blockquote")}
            title="Blockquote"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            title="Horizontal Divider"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleInsertCallout}
            title="Insert Highlight Callout"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleInsertTable}
            title="Insert Specification Table"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links & Media */}
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => {
              saveSelection();
              setShowLinkModal(true);
            }}
            title="Insert Link"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("unlink")}
            title="Remove Link"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors"
          >
            <Unlink className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              saveSelection();
              if (onOpenMediaLibrary) {
                onOpenMediaLibrary((selectedUrl, alt) => {
                  setImageUrl(selectedUrl);
                  if (alt) setImageAlt(alt);
                  setShowImageModal(true);
                });
              } else {
                setShowImageModal(true);
              }
            }}
            title="Insert Image"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors flex items-center gap-1 text-xs font-semibold px-2"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Image</span>
          </button>
          <button
            type="button"
            onClick={() => {
              saveSelection();
              setShowVideoModal(true);
            }}
            title="Insert Video Embed"
            className="p-1.5 rounded hover:bg-neutral-100 hover:text-black transition-colors flex items-center gap-1 text-xs font-semibold px-2"
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Video</span>
          </button>
        </div>
      </div>

      {/* Editable Canvas */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={() => {
          saveSelection();
          handleInput();
        }}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onSelect={saveSelection}
        style={{ minHeight }}
        className="p-6 text-neutral-900 leading-relaxed font-sans focus:outline-none rbg-rich-editor-content prose prose-neutral max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-black prose-a:underline prose-img:rounded-2xl"
        data-placeholder={placeholder}
      />

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white border border-neutral-300 rounded-2xl shadow-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-black">Insert Hyperlink</h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleInsertLink} className="space-y-3">
              <input
                type="url"
                required
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-black focus:outline-none focus:border-black"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3 py-1.5 text-xs text-neutral-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-neutral-300 rounded-2xl shadow-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-black">Insert Video Embed</h4>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleInsertVideo} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  YouTube or Direct MP4 Video URL
                </label>
                <input
                  type="url"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://cdn.example.com/video.mp4"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-black focus:outline-none focus:border-black"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-3 py-1.5 text-xs text-neutral-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold"
                >
                  Embed Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-neutral-300 rounded-2xl shadow-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-black">Insert Article Image</h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleInsertImage} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-black focus:outline-none focus:border-black"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Alt Text (Accessibility & SEO)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image content..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-black focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Image Caption (Optional)</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Official site excavation in progress..."
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs text-black focus:outline-none focus:border-black"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-3 py-1.5 text-xs text-neutral-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold"
                >
                  Insert Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
