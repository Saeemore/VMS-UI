// FILE: src/pages/ScanPass.jsx
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { CheckCircle, XCircle } from "lucide-react";
import "../styles/dashboard.css"; 

const ScanPass = () => {
  const [mode, setMode] = useState("scan"); // scan | success | fail

  const verifyPass = async (passCode) => {
    setMode("verifying");

    try {
      const res = await fetch("http://localhost:5000/api/security/check-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pass_code: passCode }),
      });

      if (!res.ok) throw new Error();
      setMode("success");
    } catch {
      setMode("fail");
    }
  };

  const initScanner = () => {
    setMode("scan");

    const scanner = new Html5QrcodeScanner("qr-box", {
      fps: 10,
      qrbox: { width: 260, height: 260 }, // matches your UI frame size
    });

    scanner.render(
      (decodedText) => {
        scanner.clear().catch(() => {});
        verifyPass(decodedText);
      },
      () => {}
    );
  };

  useEffect(() => {
    initScanner();
    return () => Html5QrcodeScanner.clear?.();
  }, []);

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "#f1f2f4"
    }}>
      
      {/* Scanner UI */}
      {mode === "scan" && (
        <div style={{
          background: "#fff", padding: "20px",
          borderRadius: "12px", boxShadow: "0 3px 12px rgba(0,0,0,0.08)"
        }}>
          <div id="qr-box" />
          <p style={{ marginTop: "10px", textAlign: "center", color: "#444" }}>
            Place the visitor's QR code in front of the camera.
          </p>
        </div>
      )}

      {/* Success */}
      {mode === "success" && (
        <div className="scan-status-card success">
          <CheckCircle size={90} className="status-icon" />
          <h2>Authorized ✅</h2>
          <button onClick={initScanner} className="action-button primary">
            Scan Next
          </button>
        </div>
      )}

      {/* Failure */}
      {mode === "fail" && (
        <div className="scan-status-card failure">
          <XCircle size={90} className="status-icon" />
          <h2>Not Authorized ❌</h2>
          <button onClick={initScanner} className="action-button primary">
            Scan Again
          </button>
        </div>
      )}

      {/* Verifying (just a text, no animation needed) */}
      {mode === "verifying" && (
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          Checking Pass...
        </div>
      )}
    </div>
  );
};

export default ScanPass;
