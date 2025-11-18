import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../../src/api/api";  // 👈 FIXED IMPORT

export default function ScanPass() {
  const [step, setStep] = useState("loading");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [visitData, setVisitData] = useState(null);

  // ---------------- VALIDATE PASS (QR + MANUAL) ----------------
  const validatePass = async (pass_code) => {
    try {
      const res = await api.post("/security/check-in", { pass_code });

      console.log("VALIDATION RESULT:", res.data);

      if ( res.status !== 200) {
        setStep("fail");
        return;
      }

      setVisitData(res.data.visit);
      setStep("success");

    } catch (err) {
      console.error(err);
      setStep("fail");
    }
  };

  // -------------- Handle Manual Code Confirm -------------------
  const handleConfirm = async () => {
    const finalCode = code.join("");
    console.log("Manual Code:", finalCode);

    await validatePass(finalCode);
  };

  // ----------------- QR Scanner Setup --------------------------
  useEffect(() => {
    if (step !== "scan") return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 300, height: 300 } },
      false
    );

    scanner.render(
      (decodedText) => {
        console.log("SCANNED:", decodedText);
        validatePass(decodedText);
      },
      (err) => console.log("Scanner error:", err)
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [step]);

  // ---------------- INPUT HANDLERS ----------------
  const handleCodeInput = (value, index) => {
    if (!/^[0-9A-Za-z]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  // ------------------- UI SCREENS --------------------

  if (step === "loading") {
    return (
      <div style={styles.centerScreen}>
        <img src="/loading-icon.svg" alt="loading" style={{ width: 80 }} />
        <button onClick={() => setStep("scan")} style={styles.startBtn}>
          Start Scanning
        </button>
      </div>
    );
  }
 
  if (step === "scan") {
    return (
      <div style={styles.scanPage}>
        <div style={styles.scanFrame}>
          <div id="qr-reader" style={styles.reader}></div>
        </div>
        <p style={styles.instruction}>
          Place the visitor's QR code in front of the camera.
        </p>
      </div>
    );
  }

  if (step === "fail") {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.failCircle}>
          <span style={styles.failX}>✕</span>
        </div>
        <h2 style={styles.failTitle}>Failed to scan pass_code</h2>
        <p style={styles.failDesc}>
          We do not have your details in the system. If this is a valid visit,
          kindly add the code manually.
        </p>

        <button style={styles.manualButton} onClick={() => setStep("manual")}>
          ➕ Enter code manually
        </button>
      </div>
    );
  }

  if (step === "manual") {
    return (
      <div style={styles.manualPage}>
        <h1>Enter Code</h1>
        <p style={{ color: "#777" }}>
          Enter Code Manually To Confirm Your Visit
        </p>

        <div style={styles.codeContainer}>
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`code-${idx}`}
              value={digit}
              maxLength={1}
              onChange={(e) => handleCodeInput(e.target.value, idx)}
              onKeyDown={(e) => handleBackspace(e, idx)}
              style={styles.codeBox}
            />
          ))}
        </div>

        <button style={styles.confirmButton} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    );
  }

  // === NEW: success screen ===
  // === NEW SUCCESS SCREEN (MATCH EXACT IMAGE) ===
if (step === "success") {
  return (
    <div style={styles.successMain}>
      <div style={styles.successIconCircle}>
        <span style={styles.successCheck}>✓</span>
      </div>

      <h2 style={styles.successHeading}>Checked In Successfully</h2>

      <p style={styles.successText}>
        You have successfully checked in. Kindly keep your visit pass with you at all times.
      </p>
    </div>
  );
}


  return null;
}

// ------------------- STYLES --------------------
const styles = {
  centerScreen: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  startBtn: {
    marginTop: 20,
    padding: "10px 25px",
    fontSize: 16,
  },
  scanPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  scanFrame: {
    width: "1039px",
    height: "337px",
    border: "1px dashed white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  reader: {
    width: "100%",
    height: "100%",
  },
  instruction: { marginTop: 10, color: "#ccc" },
  failCircle: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    background: "#FF4D6D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  failX: { color: "#fff", fontSize: 70 },
  failTitle: { marginTop: 20, fontSize: 22, fontWeight: 600 },
  failDesc: { width: 320, textAlign: "center", color: "#555" },
  manualButton: {
    marginTop: 20,
    background: "#2D5BFF",
    color: "white",
    padding: "12px 30px",
    borderRadius: 10,
    border: "none",
  },
  manualPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 60,
  },
  codeContainer: { display: "flex", gap: 12, margin: "30px 0" },
  codeBox: {
    width: 60,
    height: 60,
    textAlign: "center",
    fontSize: 24,
    borderRadius: 10,
    background: "#eee",
    border: "none",
  },
  confirmButton: {
    width: "80%",
    background: "#2D5BFF",
    color: "white",
    padding: "15px",
    borderRadius: 10,
    fontSize: 20,
    border: "none",
  },

  // === NEW: success styles ===
  successPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: "linear-gradient(180deg, rgba(50,92,243,0.04) 0%, transparent 40%)",
  },
  successCard: {
    width: "100%",
    maxWidth: 520,
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 8px 30px rgba(13, 38, 76, 0.08)",
    textAlign: "left",
  },
  successBadge: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "#10B981",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 12,
  },
  successTitle: { margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" },
  successSubtitle: { marginTop: 6, color: "#6b7280", marginBottom: 16 },

  visitorRow: { display: "flex", alignItems: "center", gap: 16, marginTop: 12 },
  visitorAvatar: { width: 64, height: 64, borderRadius: 12, objectFit: "cover" },
  visitorInfoBlock: { display: "flex", flexDirection: "column" },
  visitorName: { fontSize: 16, fontWeight: 700, color: "#111827" },
  visitorMeta: { fontSize: 13, color: "#6b7280", marginTop: 4 },

  visitDetails: { marginTop: 18, display: "flex", flexDirection: "column", gap: 8 },
  detailRow: { fontSize: 14, color: "#374151", display: "flex", gap: 8, alignItems: "center" },

  successActions: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 },
  primaryBtn: {
    background: "#325CF3",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#fff",
    color: "#374151",
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    cursor: "pointer",
  },
successMain: {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "#ffffff",
  padding: "20px",
},

successIconCircle: {
  width: "188.5px",
  height: "188.5px",
  borderRadius: "50%",
  backgroundColor: "#4ECB73", // green color like sample
  left:"708px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 30,
},

successCheck: {
  fontSize: 80,
  color: "white",
  fontWeight: "bold",
  marginTop: -5,
},

successHeading: {
  fontSize: 24,
  fontFamily: "Inter",
  fontWeight: "600",
  color: "#000000",
  marginBottom: 10,
},

successText: {
  fontSize: "16px",
  fontfamily: "Inter",
  color: "#000000",
  maxWidth: 400,
  lineHeight: "146%",
},


};
