import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

export default function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = grapesjs.init({
        container: "#gjs",
        height: "100vh",
        storageManager: false,
        canvas: {
          styles: [
            "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
          ],
        },
      });

      const html = `
        <div>
          <nav class="bg-white shadow p-4 text-center font-bold">
            My Modern Site
          </nav>

          <section class="text-center py-16 bg-gray-50">
            <h1 class="text-3xl font-bold mb-4">Welcome to the Future</h1>
            <p class="mb-6">Transform your business with cutting-edge solutions</p>
            <button class="px-6 py-2 bg-blue-500 text-white rounded">
              Get Started
            </button>
          </section>

          <section class="py-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div class="p-4 border rounded">🚀 Fast</div>
            <div class="p-4 border rounded">🔒 Secure</div>
            <div class="p-4 border rounded">📱 Mobile Ready</div>
          </section>

          <footer class="bg-black text-white p-4 text-center">
            © 2025 ModernBiz. All rights reserved.
          </footer>
        </div>
      `;

      editorRef.current.setComponents(html);
    }
  }, []);

  return <div id="gjs" />;
}
