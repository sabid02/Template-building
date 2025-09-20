export const exportToHTML = (customization) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${customization.headerText || "Your Website"}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: '${customization.fontFamily || "Inter"}', sans-serif;
            font-size: ${customization.fontSize || 16}px;
            background-color: ${customization.bgColor || "#ffffff"};
            color: ${customization.textColor || "#000000"};
            line-height: 1.6;
        }
        
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            border-bottom: 1px solid ${
              customization.textColor
                ? `${customization.textColor}20`
                : "#e5e7eb"
            };
            min-height: ${customization.headerHeight || 100}px;
        }
        
        .logo {
            height: 3rem;
            width: auto;
            object-fit: contain;
        }
        
        .header-text {
            font-weight: bold;
            font-size: ${customization.headerSize || 24}px;
        }
        
        .main-content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            text-align: center;
            min-height: 400px;
            background-image: ${
              customization.image ? `url('${customization.image}')` : "none"
            };
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
        }
        
        .main-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${
              customization.image ? "rgba(0, 0, 0, 0.2)" : "transparent"
            };
            z-index: 1;
        }
        
        .main-content > * {
            position: relative;
            z-index: 2;
        }
        
        .main-heading {
            font-weight: bold;
            margin-bottom: 1rem;
            font-size: ${customization.mainHeadingSize || 32}px;
            text-shadow: ${
              customization.image ? "0 2px 4px rgba(0,0,0,0.5)" : "none"
            };
        }
        
        .subheading {
            font-size: ${customization.subheadingSize || 18}px;
            max-width: 600px;
            text-shadow: ${
              customization.image ? "0 1px 2px rgba(0,0,0,0.5)" : "none"
            };
        }
        
        .cta-button {
            margin-top: 2rem;
            padding: 0.75rem 2rem;
            background-color: ${
              customization.textColor === "#000000"
                ? "#3b82f6"
                : customization.textColor
            };
            color: white;
            font-weight: 600;
            border-radius: 0.5rem;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
        }
        
        .cta-button:hover {
            background-color: ${
              customization.textColor === "#000000"
                ? "#2563eb"
                : "rgba(0,0,0,0.8)"
            };
        }
        
        .footer {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 1px solid ${
              customization.textColor
                ? `${customization.textColor}20`
                : "#e5e7eb"
            };
            padding: 1.5rem;
            min-height: ${customization.footerHeight || 60}px;
            background-color: ${customization.footerBg || "transparent"};
            color: ${customization.textColor || "#6b7280"};
        }
        
        .footer-text {
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.025em;
        }
        
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
            
            .main-content {
                padding: 1rem;
            }
            
            .main-heading {
                font-size: ${(customization.mainHeadingSize || 32) * 0.8}px;
            }
            
            .subheading {
                font-size: ${(customization.subheadingSize || 18) * 0.9}px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            ${
              customization.logoUrl
                ? `<img src="${customization.logoUrl}" alt="Logo" class="logo">`
                : ""
            }
            <h1 class="header-text">${
              customization.headerText || "Your Company"
            }</h1>
        </header>
        
        <main class="main-content">
            <h2 class="main-heading">${
              customization.mainHeading || "Welcome to Our Website"
            }</h2>
            <p class="subheading">${
              customization.subheading ||
              "Discover amazing products and services that will transform your business."
            }</p>
            <a href="#" class="cta-button">Get Started</a>
        </main>
        
        <footer class="footer">
            <p class="footer-text">${
              customization.footerText ||
              "© 2024 Your Company. All rights reserved."
            }</p>
        </footer>
    </div>
</body>
</html>`;

  return html;
};

export const downloadHTML = (customization) => {
  const html = exportToHTML(customization);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${customization.headerText || "website"}-template.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
