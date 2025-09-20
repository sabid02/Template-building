import { ChromePicker } from "react-color";
import { supabase } from "../supabaseClient";
import { useState } from "react";
import axios from "axios";

export default function TemplateEditor({
  customization,
  setCustomization,
  activeTab,
}) {
  const [uploading, setUploading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(null);

  // Upload file to Supabase and update state
  const handleFileUpload = async (file, type) => {
    if (!file) return alert("Select a file first!");
    setUploading(true);

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("template-building")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("template-building")
      .getPublicUrl(fileName);

    if (type === "logo") {
      setCustomization({ ...customization, logoUrl: publicUrlData.publicUrl });
    } else {
      setCustomization({ ...customization, image: publicUrlData.publicUrl });
    }

    setUploading(false);
    alert("File uploaded successfully!");
  };

  const fontOptions = [
    { value: "Inter", label: "Inter" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Poppins", label: "Poppins" },
    { value: "Arial", label: "Arial" },
    { value: "Helvetica", label: "Helvetica" },
  ];

  const renderContentTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Content Settings
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Header Text
          </label>
          <input
            type="text"
            placeholder="Enter header text"
            value={customization?.headerText || ""}
            onChange={(e) =>
              setCustomization({ ...customization, headerText: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Heading
          </label>
          <input
            type="text"
            placeholder="Enter main heading"
            value={customization?.mainHeading || ""}
            onChange={(e) =>
              setCustomization({
                ...customization,
                mainHeading: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subheading
          </label>
          <textarea
            placeholder="Enter subheading"
            value={customization?.subheading || ""}
            onChange={(e) =>
              setCustomization({ ...customization, subheading: e.target.value })
            }
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Footer Text
          </label>
          <input
            type="text"
            placeholder="Enter footer text"
            value={customization.footerText || ""}
            onChange={(e) =>
              setCustomization({ ...customization, footerText: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderDesignTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Design Settings
      </h3>

      <div className="space-y-6">
        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={customization.fontFamily || "Inter"}
            onChange={(e) =>
              setCustomization({ ...customization, fontFamily: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Font Size: {customization.fontSize || 16}px
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={customization.fontSize || 16}
            onChange={(e) =>
              setCustomization({
                ...customization,
                fontSize: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                style={{ backgroundColor: customization.bgColor || "#FFFFFF" }}
                onClick={() =>
                  setShowColorPicker(showColorPicker === "bg" ? null : "bg")
                }
              ></div>
              <input
                type="text"
                value={customization.bgColor || "#FFFFFF"}
                onChange={(e) =>
                  setCustomization({
                    ...customization,
                    bgColor: e.target.value,
                  })
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {showColorPicker === "bg" && (
              <div className="mt-2">
                <ChromePicker
                  color={customization.bgColor || "#FFFFFF"}
                  onChangeComplete={(color) =>
                    setCustomization({ ...customization, bgColor: color.hex })
                  }
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                style={{
                  backgroundColor: customization.textColor || "#000000",
                }}
                onClick={() =>
                  setShowColorPicker(showColorPicker === "text" ? null : "text")
                }
              ></div>
              <input
                type="text"
                value={customization.textColor || "#000000"}
                onChange={(e) =>
                  setCustomization({
                    ...customization,
                    textColor: e.target.value,
                  })
                }
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {showColorPicker === "text" && (
              <div className="mt-2">
                <ChromePicker
                  color={customization.textColor || "#000000"}
                  onChangeComplete={(color) =>
                    setCustomization({ ...customization, textColor: color.hex })
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Size Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Header Size: {customization.headerSize || 24}px
            </label>
            <input
              type="range"
              min="16"
              max="48"
              value={customization.headerSize || 24}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  headerSize: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Heading Size: {customization.mainHeadingSize || 32}px
            </label>
            <input
              type="range"
              min="20"
              max="64"
              value={customization.mainHeadingSize || 32}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  mainHeadingSize: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subheading Size: {customization.subheadingSize || 18}px
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={customization.subheadingSize || 18}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  subheadingSize: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Media Settings
      </h3>

      <div className="space-y-6">
        {/* Background Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all">
            <svg
              className="w-8 h-8 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0l-4 4m4-4l4 4m10 0v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <span className="text-sm text-gray-600">
              Upload Background Image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileUpload(e.target.files[0], "background")
              }
              className="hidden"
            />
          </label>
          {customization.image && (
            <div className="mt-2">
              <img
                src={customization.image}
                alt="Background preview"
                className="w-full h-20 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-all">
            <svg
              className="w-8 h-8 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0l-4 4m4-4l4 4m10 0v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <span className="text-sm text-gray-600">Upload Logo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0], "logo")}
              className="hidden"
            />
          </label>
          {customization.logoUrl && (
            <div className="mt-2">
              <img
                src={customization.logoUrl}
                alt="Logo preview"
                className="w-20 h-20 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>

        {uploading && (
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
            <span className="text-blue-600 font-medium">Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {activeTab === "content" && renderContentTab()}
      {activeTab === "design" && renderDesignTab()}
      {activeTab === "media" && renderMediaTab()}
    </div>
  );
}
