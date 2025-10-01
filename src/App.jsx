import React, { useState } from "react";
import FilePicker from "./components/FilePicker";
import QRCode from "react-qr-code";

export default function App() {
  const [downloadLink, setDownloadLink] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const theme = {
    background: darkMode 
      ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%)" 
      : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    text: darkMode ? "#ffffff" : "#2d3748",
    cardBg: darkMode 
      ? "rgba(255, 255, 255, 0.05)" 
      : "rgba(255, 255, 255, 0.9)",
    cardBorder: darkMode 
      ? "rgba(255, 255, 255, 0.1)" 
      : "rgba(0, 0, 0, 0.1)",
    inputBg: darkMode 
      ? "rgba(255, 255, 255, 0.08)" 
      : "rgba(255, 255, 255, 0.8)",
    primaryButton: darkMode 
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    secondaryButton: darkMode 
      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
      : "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    accent: darkMode ? "#64ffda" : "#0066cc",
    shadow: darkMode 
      ? "0 8px 32px rgba(0, 0, 0, 0.3)" 
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
  };

  const copyToClipboard = async () => {
    if (downloadLink) {
      try {
        await navigator.clipboard.writeText(downloadLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = downloadLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: theme.background,
        color: theme.text,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        transition: "all 0.4s ease",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <div
        className="float-animation"
        style={{
          position: "fixed",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: darkMode 
            ? "radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(79, 172, 254, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        className="float-reverse"
        style={{
          position: "fixed",
          bottom: "10%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: darkMode 
            ? "radial-gradient(circle, rgba(245, 87, 108, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(67, 233, 123, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {/* Left side - Title and description */}
          <div style={{ textAlign: "left", flex: 1, minWidth: "300px" }}>
            <h1 
              style={{ 
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
                marginBottom: "0.5rem",
                color: darkMode ? "#ffffff" : "#000000",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              🌊 Waveshare
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                opacity: 0.8,
                fontWeight: "300",
                margin: 0,
              }}
            >
              Share files instantly over your local network
            </p>
          </div>

          {/* Right side - Toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: theme.secondaryButton,
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: theme.shadow,
              transition: "all 0.3s ease",
              transform: "translateY(0)",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = theme.shadow;
            }}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* QR Code Card */}
        <div
          style={{
            background: theme.cardBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${theme.cardBorder}`,
            padding: "2.5rem",
            borderRadius: "24px",
            boxShadow: theme.shadow,
            marginBottom: "2rem",
            transition: "all 0.3s ease",
          }}
        >
          {downloadLink ? (
            <div style={{ textAlign: "center" }}>
              <div 
                className="fade-scale"
                style={{ 
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "1rem",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <QRCode
                    value={downloadLink}
                    size={200}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
              
              <div
                style={{
                  background: theme.inputBg,
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                  wordBreak: "break-all",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  border: `1px solid ${theme.cardBorder}`,
                }}
              >
                {downloadLink}
              </div>
              
              <button
                onClick={copyToClipboard}
                style={{
                  background: copied ? "#10b981" : theme.primaryButton,
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: theme.shadow,
                }}
              >
                {copied ? "✅ Copied!" : "📋 Copy Link"}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div
                style={{
                  fontSize: "4rem",
                  marginBottom: "1rem",
                  opacity: 0.5,
                }}
              >
                📁
              </div>
              <p style={{ fontSize: "1.2rem", opacity: 0.7, margin: 0 }}>
                Select a file to generate QR code
              </p>
            </div>
          )}
        </div>

        {/* File Picker */}
        <FilePicker 
          setDownloadLink={setDownloadLink} 
          darkMode={darkMode}
          theme={theme}
        />
      </div>
    </div>
  );
}
