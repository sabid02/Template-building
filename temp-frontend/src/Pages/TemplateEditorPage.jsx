import { useEffect, useState, useRef } from "react";
import axios from "axios";
import TemplateEditor from "../template/TemplateEditor";
import TemplatePreview from "../template/TemplatePreview";
import TemplateGallery from "../template/TemplateGallery";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";
import { downloadHTML } from "../utils/exportUtils";

export default function TemplateEditorPage() {
  const [template, setTemplate] = useState(null);
  const [customization, setCustomization] = useState({
    headerText: "",
    mainHeading: "",
    subheading: "",
    footerText: "",
    bgColor: "#ffffff",
    textColor: "#000000",
    image: "",
    logoUrl: "",
    fontFamily: "Inter",
    fontSize: 16,
    headerSize: 24,
    mainHeadingSize: 32,
    subheadingSize: 18,
    footerHeight: 50,
    headerHeight: 100,
    footerBg: "transparent",
  });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  const [showGallery, setShowGallery] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/templates/");
        if (res.data.length > 0) {
          const defaultTemplate = res.data[0];
          setTemplate(defaultTemplate);
          setCustomization({
            ...defaultTemplate.settings.content,
            bgColor: defaultTemplate.settings.colors.background,
            textColor: defaultTemplate.settings.colors.text || "#000000",
            image: defaultTemplate.settings.images.background_image_url,
            logoUrl: defaultTemplate.settings.images.logo_url || "",
            fontFamily: "Inter",
            fontSize: 16,
            headerSize: 24,
            mainHeadingSize: 32,
            subheadingSize: 18,
            footerHeight: 50,
            headerHeight: 100,
            footerBg: "transparent",
          });
        }
      } catch (err) {
        console.error("Error fetching template:", err);
        setSaveStatus({ type: "error", message: "Failed to load template" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, []);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target)
      ) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = async () => {
    if (!customization || !email) {
      setSaveStatus({
        type: "error",
        message: "Please enter your email first!",
      });
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const newTemplate = {
        tenant: template.tenant,
        template_name: `Customized Template by ${email}`,
        settings: {
          ...template.settings,
          images: {
            ...template.settings.images,
            background_image_url: customization.image,
            logo_url: customization.logoUrl,
          },
          content: {
            headerText: customization.headerText,
            mainHeading: customization.mainHeading,
            subheading: customization.subheading,
            footerText: customization.footerText,
          },
          colors: {
            ...template.settings.colors,
            background: customization.bgColor,
            text: customization.textColor,
          },
        },
      };

      await axios.post("http://127.0.0.1:8000/api/templates/", newTemplate);
      setSaveStatus({
        type: "success",
        message: "Template saved successfully!",
      });
    } catch (err) {
      console.error("Save error:", err);
      setSaveStatus({ type: "error", message: "Failed to save template" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (!customization) {
      setSaveStatus({ type: "error", message: "No template to export!" });
      return;
    }

    try {
      downloadHTML(customization);
      setSaveStatus({
        type: "success",
        message: "HTML file downloaded successfully!",
      });
    } catch (error) {
      console.error("Export error:", error);
      setSaveStatus({ type: "error", message: "Failed to export template" });
    }
  };

  const handleSelectTemplate = (templatePreview) => {
    setCustomization({
      ...customization,
      ...templatePreview,
      fontFamily: templatePreview.fontFamily || "Inter",
      fontSize: 16,
      headerSize: 24,
      mainHeadingSize: 32,
      subheadingSize: 18,
      footerHeight: 50,
      headerHeight: 100,
      footerBg: "transparent",
    });
    setSaveStatus({
      type: "success",
      message: "Template applied successfully!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Template Editor
          </h2>
          <p className="text-gray-600">Preparing your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* <Navbar /> */}

      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Template Editor
              </h1>
              <p className="text-gray-600 mt-1">
                Customize your website template with ease
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Auto-save enabled</span>
              </div>
              <button
                onClick={() => setShowGallery(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Choose Template
              </button>

              {/* Export Dropdown */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  Export
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => {
                        handleExport();
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download HTML
                    </button>
                    <button
                      onClick={() => {
                        setSaveStatus({
                          type: "info",
                          message: "PDF export coming soon!",
                        });
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      Export PDF
                    </button>
                    <button
                      onClick={() => {
                        setSaveStatus({
                          type: "info",
                          message: "Code export coming soon!",
                        });
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      Export Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar Editor */}
          <aside className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: "content", label: "Content", icon: "📝" },
                    { id: "design", label: "Design", icon: "🎨" },
                    { id: "media", label: "Media", icon: "🖼️" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Email Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Save Status */}
                {saveStatus && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm ${
                      saveStatus.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : saveStatus.type === "error"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {saveStatus.message}
                  </div>
                )}

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={isSaving || !email}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save Template"
                  )}
                </button>

                {/* Editor Component */}
                <div className="mt-6">
                  <TemplateEditor
                    customization={customization}
                    setCustomization={setCustomization}
                    activeTab={activeTab}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Preview */}
          <main className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Preview Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Live Preview
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Desktop</span>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <span>Mobile</span>
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-4">
                <TemplatePreview customization={customization} />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Template Gallery Modal */}
      <TemplateGallery
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
