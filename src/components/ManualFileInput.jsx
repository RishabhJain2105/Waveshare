import React, { useState } from "react";
import axios from "axios";

export default function ManualFileInput({ setDownloadLink }) {
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

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

  async function handleShutdown() {
    try {
      await axios.post("http://localhost:8080/api/shutdown");
    } catch (e) {
      alert("Failed to shut down the server.");
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter file path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          disabled={!isEditable}
          style={{
            width: 'calc(100% - 50px)',
            padding: '10px',
            boxSizing: 'border-box'
          }}
        />
        <label>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
          Edit
        </label>
      </div>

      <button onClick={handleShare} disabled={isLoading}>
        {isLoading ? "Sharing..." : "Share File"}
      </button>

      <button onClick={handleShutdown}>
        Stop Server
      </button>
    </div>
  );
}
