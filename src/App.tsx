import React, { useState, useEffect } from "react";
import { logos } from "./assets/assets";
import {
  Clipboard,
  Loader,
  CheckCircle,
  AlertCircle,
  Languages,
} from "lucide-react";
import Select from "./components/Select";

interface AuditLog {
  timestamp: string;
  industry: string;
  textType: string;
  technicalType: string;
  country: string;
  format: string;
}

const palette = {
  primary: "#2D2D2D",
  secondary: "#5A5A5A",
  surface: "#FFFFFF",
  background: "#F8F8F8",
  divider: "#000000",
  elevation1: "0 2px 8px rgba(45,45,45,0.1)",
  elevation2: "0 4px 12px rgba(45,45,45,0.15)",
};

export default function App() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [currentLog, setCurrentLog] = useState({
    textType: "empty",
    industry: "empty",
    segment: "empty",
    country: "empty",
    technicalType: "empty",
  });
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const industries = {
    empty: "",
    realEstate: "Real Estate",
    telecom: "Telecom",
    publicSector: "Public Sector",
    energy: "Energy",
    healthcare: "Healthcare",
    social: "Social",
  };

  const technicalTypes = {
    empty: "",
    "general-content": "General",
    "marketing-content": "Marketing",
    "cv-content": "CV",
  };

  const textTypes = {
    empty: "",
    body: "Body",
    paragraphHeader: "Paragraph Header",
    pageTitle: "Page Title",
    formals: "Formals",
    table: "Table",
    shape: "Shape",
    structure: "Structure",
    timeline: "Timeline",
  };

  const countries = {
    empty: "",
    uae: "UAE",
    ksa: "KSA",
    bahrain: "Bahrain",
    qatar: "Qatar",
    kuwait: "Kuwait",
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError("Please enter text to translate");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTranslatedText(
        "نص مترجم مثال. هذا مثال على النص المترجم إلى العربية."
      );

      const newLog = {
        timestamp: new Date().toISOString(),
        industry: industries[currentLog.industry as keyof typeof industries],
        textType: textTypes[currentLog.textType as keyof typeof textTypes],
        technicalType:
          technicalTypes[
            currentLog.technicalType as keyof typeof technicalTypes
          ],
        country: countries[currentLog.country as keyof typeof countries],
        format: "PDF",
      };

      setAuditLogs([newLog, ...auditLogs]);
    } catch (err) {
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: palette.background }}
    >
      <header
        className="shadow-lg"
        style={{
          backgroundColor: palette.surface,
          boxShadow: palette.elevation2,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center">
          <div
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mr-2 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${logos.SnBlogo})` }}
          ></div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: palette.primary }}
          >
            &nbsp;S&B AI Translation Agent
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="md:grid md:grid-cols-[1fr_auto_1fr] gap-8">
          {/* Input Section */}
          <section
            className="p-6 rounded-xl"
            style={{
              backgroundColor: palette.surface,
              boxShadow: palette.elevation1,
            }}
          >
            <h2 className="text-xl font-semibold flex items-center whitespace-nowrap gap-2 mb-4">
              <div className="bg-gray-200 rounded-lg p-2 w-8 h-8 flex items-center justify-center">
                <span className="text-sm">EN</span>
              </div>
              <div> Source Text</div>
            </h2>
            <div className="mb-6 relative">
              <textarea
                value={sourceText}
                onChange={(e) => {
                  if (e.target.value.length <= 10000)
                    setSourceText(e.target.value);
                }}
                className="w-full h-48 p-4 rounded-xl focus:outline-none transition-all"
                style={{
                  border: `2px solid ${palette.divider}`,
                  backgroundColor: palette.background,
                }}
                placeholder="Enter text to translate..."
                aria-label="Source text input"
              />
              <div
                className="text-sm mt-2 absolute right-4 bottom-4 px-2 rounded"
                style={{ color: palette.secondary }}
              >
                {sourceText.length}/10,000
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* First Row: Text Type and Industry */}
              <Select
                label="Text Type"
                options={textTypes}
                value={currentLog.textType}
                onChange={(v) => setCurrentLog({ ...currentLog, textType: v })}
              />
              <Select
                label="Industry"
                options={industries}
                value={currentLog.industry}
                onChange={(v) => setCurrentLog({ ...currentLog, industry: v })}
              />

              {/* Second Row: Technical Type and Country */}
              <Select
                label="Technical Type"
                options={technicalTypes}
                value={currentLog.technicalType}
                onChange={(v) =>
                  setCurrentLog({ ...currentLog, technicalType: v })
                }
              />
              <Select
                label="Country"
                options={countries}
                value={currentLog.country}
                onChange={(v) => setCurrentLog({ ...currentLog, country: v })}
              />
            </div>

            <button
              onClick={handleTranslate}
              disabled={
                loading ||
                !sourceText.trim() ||
                currentLog.textType === "empty" ||
                currentLog.industry === "empty" ||
                currentLog.technicalType === "empty" ||
                currentLog.country === "empty"
              }
              className="w-full font-semibold py-3 px-6 rounded-xl transition-all 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2"
              style={{
                backgroundColor: palette.primary,
                color: palette.surface,
                boxShadow: palette.elevation1,
              }}
            >
              {loading ? (
                // loading spinner with bar
                //   <>
                //     <Loader className="w-5 h-5 animate-spin" />
                //     <div className="ml-2 h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                //       <div
                //         className="h-full bg-gray-600 transition-all duration-1500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                //         style={{ width: loading ? "100%" : "0%" }}
                //       />
                //     </div>
                //   </>
                // ) : (
                //   <>
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Languages className="w-5 h-5" />
                  <span>Translate Now</span>
                </>
              )}
            </button>
          </section>

          {/* Divider */}
          <div className="my-8 md:hidden">
            <hr className="w-full h-1 bg-black" />
          </div>
          <div className="hidden md:block my-8">
            <hr className="h-full w-1 bg-black" />
          </div>

          {/* Output Section */}
          <section className="space-y-6 mt-8 md:mt-0">
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: palette.surface,
                boxShadow: palette.elevation1,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center whitespace-nowrap gap-2">
                  <div className="bg-gray-200 rounded-lg p-2 w-8 h-8 flex items-center justify-center">
                    <span className="text-sm">AR</span>
                  </div>
                  Translated Text
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center transition-colors"
                  style={{ color: palette.primary }}
                  aria-label="Copy translated text"
                >
                  {copiedFeedback ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <Clipboard className="w-5 h-5 mr-2" />
                  )}
                  <span className="font-medium">
                    {copiedFeedback ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>
              <div
                className="h-48 p-4 rounded-xl overflow-y-auto text-right text-lg leading-relaxed rtl"
                dir="rtl"
                style={{
                  border: `2px solid ${palette.divider}`,
                  backgroundColor: palette.background,
                }}
              >
                {translatedText || (
                  <span style={{ color: palette.secondary }}>
                    سيظهر النص المترجم هنا...
                  </span>
                )}
              </div>
            </div>

            {/* Audit Trail */}
            <div
              className="p-6 rounded-xl"
              style={{
                backgroundColor: palette.surface,
                boxShadow: palette.elevation1,
              }}
            >
              <h3 className="font-semibold text-lg mb-4">
                Activity Log
                <span
                  className="text-sm ml-2"
                  style={{ color: palette.secondary }}
                >
                  {auditLogs.length} entries
                </span>
              </h3>
              <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin">
                {auditLogs.map((log, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: palette.background,
                      border: `1px solid ${palette.divider}`,
                    }}
                  >
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span style={{ color: palette.secondary }}>
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center">
                        <span
                          className="mr-2"
                          style={{ color: palette.secondary }}
                        >
                          Industry:
                        </span>
                        <span style={{ color: palette.primary }}>
                          {log.industry}
                        </span>
                      </div>
                      <span
                        className="hidden md:inline"
                        style={{ color: palette.secondary }}
                      >
                        {" "}
                        |{" "}
                      </span>
                      <div className="flex items-center">
                        <span
                          className="mr-2"
                          style={{ color: palette.secondary }}
                        >
                          Text Type:
                        </span>
                        <span style={{ color: palette.primary }}>
                          {log.textType}
                        </span>
                      </div>
                      <span
                        className="hidden md:inline"
                        style={{ color: palette.secondary }}
                      >
                        {" "}
                        |{" "}
                      </span>
                      <div className="flex items-center">
                        <span
                          className="mr-2"
                          style={{ color: palette.secondary }}
                        >
                          Technical Type:
                        </span>
                        <span style={{ color: palette.primary }}>
                          {log.technicalType}
                        </span>
                      </div>
                      <span
                        className="hidden md:inline"
                        style={{ color: palette.secondary }}
                      >
                        {" "}
                        |{" "}
                      </span>
                      <div className="flex items-center">
                        <span
                          className="mr-2"
                          style={{ color: palette.secondary }}
                        >
                          Country:
                        </span>
                        <span style={{ color: palette.primary }}>
                          {log.country}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {auditLogs.length === 0 && (
                  <div
                    className="text-center py-4"
                    style={{ color: palette.secondary }}
                  >
                    No translation history yet
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {error && (
          <div
            className="fixed bottom-4 right-4 p-4 rounded-xl flex items-center animate-fade-in-up"
            style={{
              backgroundColor: palette.surface,
              boxShadow: palette.elevation2,
              color: palette.primary,
            }}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
