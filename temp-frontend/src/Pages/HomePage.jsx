import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const editors = [
    {
      title: "Template Editor",
      description:
        "Customize pre-built templates with an intuitive drag-and-drop interface",
      icon: "🎨",
      path: "/editor",
      gradient: "from-blue-600 to-indigo-600",
      hoverGradient: "from-blue-700 to-indigo-700",
    },
    {
      title: "GrapesJS Editor",
      description: "Advanced web page builder with extensive component library",
      icon: "🏗️",
      path: "/grapesjs",
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-700 to-pink-700",
    },
    {
      title: "Builder.io Editor",
      description:
        "Professional visual development platform for modern websites",
      icon: "⚡",
      path: "/builderio",
      gradient: "from-emerald-600 to-teal-600",
      hoverGradient: "from-emerald-700 to-teal-700",
    },
    {
      title: "React Page Editor",
      description: "Component-based page builder for React applications",
      icon: "⚛️",
      path: "/reactpage",
      gradient: "from-orange-600 to-red-600",
      hoverGradient: "from-orange-700 to-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            transform: `translate(${mousePosition.x * -0.01}px, ${
              mousePosition.y * -0.01
            }px)`,
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-4 px-6"></header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Now in Beta • Free to Use
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                Build Stunning
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Websites
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Choose from powerful editors to create professional websites
                without coding. From templates to custom builds, we've got you
                covered.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/editor"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <span>🚀</span>
                <span>Start Building Now</span>
              </Link>

              <button className="px-8 py-4 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-200 flex items-center space-x-2">
                <span>▶️</span>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Editor Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20 w-full">
            {editors.map((editor, index) => (
              <Link
                key={editor.path}
                to={editor.path}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${editor.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {editor.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {editor.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {editor.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-blue-400 text-sm font-medium pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                      <span>Get Started</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-400 text-sm">Templates Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-gray-400 text-sm">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 mt-20 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <div className="mb-4 md:mb-0">
              © 2024 Selso. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
