import { useState } from "react";

const templatePresets = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and simple design perfect for professional websites",
    preview: {
      bgColor: "#ffffff",
      textColor: "#1f2937",
      fontFamily: "Inter",
      headerText: "Your Company",
      mainHeading: "Welcome to the Future",
      subheading: "Transform your business with cutting-edge solutions",
      footerText: "© 2024 Your Company. All rights reserved.",
    },
    category: "Business",
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    description: "Vibrant colors and bold typography for creative agencies",
    preview: {
      bgColor: "#f8fafc",
      textColor: "#1e40af",
      fontFamily: "Poppins",
      headerText: "Creative Studio",
      mainHeading: "Bringing Ideas to Life",
      subheading:
        "We create stunning digital experiences that captivate and inspire",
      footerText: "Let's create something amazing together",
    },
    category: "Creative",
  },
  {
    id: "tech-dark",
    name: "Tech Dark",
    description: "Dark theme perfect for tech companies and startups",
    preview: {
      bgColor: "#0f172a",
      textColor: "#f1f5f9",
      fontFamily: "Roboto",
      headerText: "TechCorp",
      mainHeading: "Innovation at Scale",
      subheading: "Building the future with cutting-edge technology and AI",
      footerText: "© 2024 TechCorp. Pushing boundaries.",
    },
    category: "Technology",
  },
  {
    id: "elegant-luxury",
    name: "Elegant Luxury",
    description: "Sophisticated design for luxury brands and high-end services",
    preview: {
      bgColor: "#fefefe",
      textColor: "#374151",
      fontFamily: "Montserrat",
      headerText: "Luxury Brand",
      mainHeading: "Excellence Redefined",
      subheading: "Experience the pinnacle of luxury and sophistication",
      footerText: "Crafting exceptional experiences since 2024",
    },
    category: "Luxury",
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    description:
      "Calming colors and clean design for health and wellness businesses",
    preview: {
      bgColor: "#f0fdf4",
      textColor: "#166534",
      fontFamily: "Open Sans",
      headerText: "Wellness Center",
      mainHeading: "Your Health, Our Priority",
      subheading: "Comprehensive wellness solutions for a better tomorrow",
      footerText: "Taking care of you, naturally",
    },
    category: "Health",
  },
  {
    id: "food-restaurant",
    name: "Food & Restaurant",
    description:
      "Warm and inviting design perfect for restaurants and food businesses",
    preview: {
      bgColor: "#fff7ed",
      textColor: "#9a3412",
      fontFamily: "Lato",
      headerText: "Bella Vista",
      mainHeading: "Taste the Difference",
      subheading: "Authentic flavors crafted with love and passion",
      footerText: "Where every meal is a celebration",
    },
    category: "Food",
  },
];

export default function TemplateGallery({ onSelectTemplate, isOpen, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const categories = [
    "All",
    ...new Set(templatePresets.map((t) => t.category)),
  ];

  const filteredTemplates =
    selectedCategory === "All"
      ? templatePresets
      : templatePresets.filter((t) => t.category === selectedCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Choose a Template
              </h2>
              <p className="text-gray-600 mt-1">
                Select a pre-designed template to get started
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => {
                  onSelectTemplate(template.preview);
                  onClose();
                }}
              >
                {/* Template Preview */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundColor: template.preview.bgColor,
                      color: template.preview.textColor,
                      fontFamily: template.preview.fontFamily,
                    }}
                  >
                    <div className="p-4 h-full flex flex-col">
                      <div className="text-center mb-4">
                        <h3
                          className="font-bold text-sm mb-2"
                          style={{ fontSize: "14px" }}
                        >
                          {template.preview.headerText}
                        </h3>
                      </div>
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h2
                          className="font-bold mb-2"
                          style={{ fontSize: "16px" }}
                        >
                          {template.preview.mainHeading}
                        </h2>
                        <p className="text-xs" style={{ fontSize: "10px" }}>
                          {template.preview.subheading}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  {hoveredTemplate === template.id && (
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center">
                      <div className="text-white text-center">
                        <svg
                          className="w-8 h-8 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <p className="font-semibold">Preview Template</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredTemplates.length} template
              {filteredTemplates.length !== 1 ? "s" : ""} available
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
