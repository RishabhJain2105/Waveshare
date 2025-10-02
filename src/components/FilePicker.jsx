import React, { useState } from "react";
import axios from "axios";

export default function FilePicker({ setDownloadLink, darkMode, theme }) {
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // File browse function
  const handleBrowseFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // For web browsers, we can only get the filename for security reasons
        // In a real desktop app (with Electron), you'd get the full path
        setPath(file.name);
        console.log("Selected file:", file);
      }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  async function handleShare() {
    if (!path) return;
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/share", { filePath: path });
      const { token } = response.data;
      const ipResponse = await axios.get("http://localhost:8080/api/ip");
      const { ip } = ipResponse.data;
      const link = `http://${ip}:8080/download/${token}`;
      setDownloadLink(link);
    } catch (e) {
      console.error("Failed to share file:", e);
      alert("Failed to share file. Check the console for more info.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        background: theme.cardBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${theme.cardBorder}`,
        padding: "2rem",
        borderRadius: "24px",
        boxShadow: theme.shadow,
      }}
    >
      {/* File Input Section */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ 
          display: "block", 
          marginBottom: "0.5rem", 
          fontSize: "1.1rem", 
          fontWeight: "600",
          color: theme.text,
        }}>
          📁 Select File
        </label>
        
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Enter file path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            readOnly={!isEditable}
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "12px 16px",
              backgroundColor: theme.inputBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: "12px",
              color: theme.text,
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
            }}
          />
          
          {/* Browse Button */}
          {/* <button
            onClick={handleBrowseFile}
            style={{
              padding: "12px 16px",
              background: theme.primaryButton,
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            📂 Browse
          </button> */}
          
          {/* Edit Toggle */}
          <button
            onClick={() => setIsEditable(!isEditable)}
            style={{
              padding: "12px 16px",
              backgroundColor: isEditable ? "#e74c3c" : "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "16px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            {isEditable ? "🔒" : "✏️"}
          </button>
        </div>

        {/* Helper text */}
        <p style={{ 
          fontSize: "0.9rem", 
          opacity: 0.7, 
          margin: 0,
          fontStyle: "italic" 
        }}>
          {/* 💡 Tip: Use Browse for file selection or manually enter the full file path */}
        </p>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        disabled={isLoading || !path}
        style={{
          width: "100%",
          padding: "16px",
          background: isLoading || !path ? theme.inputBg : theme.primaryButton,
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: isLoading || !path ? "not-allowed" : "pointer",
          fontSize: "18px",
          fontWeight: "700",
          transition: "all 0.3s ease",
          opacity: isLoading || !path ? 0.5 : 1,
          transform: "translateY(0)",
        }}
        onMouseEnter={(e) => {
          if (!isLoading && path) {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        {isLoading ? "🌊 Sharing..." : "🚀 Share File"}
      </button>
    </div>
  );
}
