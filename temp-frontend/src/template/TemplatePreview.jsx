import { useState } from "react";

export default function TemplatePreview({ customization }) {
  const [viewMode, setViewMode] = useState("desktop");

  if (!customization) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  const containerClass = viewMode === "mobile" ? "max-w-sm mx-auto" : "w-full";

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {/* View Mode Toggle */}
      <div className="flex justify-center mb-4">
        <div className="bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setViewMode("desktop")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "desktop"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "mobile"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div
        className={`${containerClass} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}
      >
        <div
          className="min-h-screen flex flex-col"
          style={{
            backgroundColor: customization.bgColor || "#FFFFFF",
            color: customization.textColor || "#000000",
            fontFamily: customization.fontFamily || "Inter",
            fontSize: customization.fontSize
              ? `${customization.fontSize}px`
              : "16px",
          }}
        >
          {/* Header */}
          <header
            className="flex items-center justify-between p-6 border-b border-gray-200"
            style={{
              minHeight: customization.headerHeight
                ? `${customization.headerHeight}px`
                : "100px",
              borderColor: customization.textColor
                ? `${customization.textColor}20`
                : "#e5e7eb",
            }}
          >
            <div className="flex items-center">
              {customization.logoUrl && (
                <img
                  src={customization.logoUrl}
                  alt="Logo"
                  className="h-12 w-auto object-contain mr-4"
                />
              )}
              <h1
                className="font-bold"
                style={{
                  fontSize: customization.headerSize
                    ? `${customization.headerSize}px`
                    : "24px",
                }}
              >
                {customization.headerText || "Your Company"}
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main
            className="flex-grow flex flex-col items-center justify-center p-8 text-center relative"
            style={{
              gap: "24px",
              minHeight: "400px",
              backgroundImage: customization.image
                ? `url(${customization.image})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay for better text readability */}
            {customization.image && (
              <div
                className="absolute inset-0 bg-black bg-opacity-20"
                style={{ zIndex: 1 }}
              ></div>
            )}

            <div className="relative z-10">
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: customization.mainHeadingSize
                    ? `${customization.mainHeadingSize}px`
                    : "32px",
                  textShadow: customization.image
                    ? "0 2px 4px rgba(0,0,0,0.5)"
                    : "none",
                }}
              >
                {customization.mainHeading || "Welcome to Our Website"}
              </h2>
              <p
                className="text-lg leading-relaxed max-w-2xl"
                style={{
                  fontSize: customization.subheadingSize
                    ? `${customization.subheadingSize}px`
                    : "18px",
                  textShadow: customization.image
                    ? "0 1px 2px rgba(0,0,0,0.5)"
                    : "none",
                }}
              >
                {customization.subheading ||
                  "Discover amazing products and services that will transform your business."}
              </p>

              {/* Call to Action Button */}
              <div className="mt-8">
                <button
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  style={{
                    backgroundColor:
                      customization.textColor === "#000000"
                        ? "#3b82f6"
                        : customization.textColor,
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer
            className="w-full flex items-center justify-center border-t border-gray-200 py-6"
            style={{
              minHeight: customization.footerHeight
                ? `${customization.footerHeight}px`
                : "60px",
              borderColor: customization.textColor
                ? `${customization.textColor}20`
                : "#e5e7eb",
              backgroundColor: customization.footerBg || "transparent",
            }}
          >
            <p
              className="text-sm font-medium tracking-wide"
              style={{
                color: customization.textColor || "#6b7280",
              }}
            >
              {customization.footerText ||
                "© 2024 Your Company. All rights reserved."}
            </p>
          </footer>
        </div>
      </div>

      {/* Preview Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {viewMode === "desktop" ? "Desktop Preview" : "Mobile Preview"} •
          Real-time updates as you edit
        </p>
      </div>
    </div>
  );
}
