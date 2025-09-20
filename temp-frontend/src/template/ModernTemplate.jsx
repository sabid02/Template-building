import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Palette,
  Smartphone,
  Rocket,
  Gem,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ModernTemplate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      alert(`Thank you ${formData.name}! We'll get back to you soon.`);
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Experience blazing fast performance with our optimized solutions that deliver results in milliseconds.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description:
        "Your data is protected with enterprise-grade security measures and end-to-end encryption.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Beautiful Design",
      description:
        "Stunning interfaces that captivate users and provide an exceptional user experience.",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Ready",
      description:
        "Fully responsive design that works perfectly on all devices and screen sizes.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Scalable",
      description:
        "Built to grow with your business, from startup to enterprise level solutions.",
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Premium Quality",
      description:
        "Crafted with attention to detail and the highest standards of quality and excellence.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ModernBiz
              </h1>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {["Home", "Features", "About", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Home", "Features", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Welcome to the
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Future
            </span>
          </h1>
          <p
            className="text-xl sm:text-2xl text-white/90 mb-8 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Transform your business with cutting-edge solutions and innovative
            technology
          </p>
          <button
            onClick={() => scrollToSection("features")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Amazing Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make our platform the perfect
              choice for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Our Vision</h2>
              <p className="text-lg mb-6 text-white/90 leading-relaxed">
                We believe in creating solutions that not only meet today's
                needs but anticipate tomorrow's challenges. Our team of experts
                works tirelessly to deliver innovative products that transform
                businesses and empower growth.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                With years of experience and a passion for excellence, we're
                committed to helping you achieve your goals through cutting-edge
                technology and exceptional service.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-white/80">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99%</div>
                  <div className="text-white/80">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-8xl animate-bounce">🚀</div>
                </div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute bottom-20 left-10 w-16 h-16 bg-orange-400/20 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">
              Ready to start your project? Let's discuss how we can help you
              succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-300">hello@modernbiz.com</p>
                  <p className="text-gray-300">support@modernbiz.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-300">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-300">123 Business Street</p>
                  <p className="text-gray-300">Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
                ModernBiz
              </h3>
              <p className="text-gray-400">
                Transforming businesses with innovative solutions and
                cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["Home", "Features", "About", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-gray-400">
                <p>Web Development</p>
                <p>Mobile Apps</p>
                <p>Cloud Solutions</p>
                <p>Consulting</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {["📘", "🐦", "📷", "💼"].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 ModernBiz. All rights reserved. Built with passion and
              innovation.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ModernTemplate;
