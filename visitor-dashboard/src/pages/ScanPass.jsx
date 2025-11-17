import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanPass() {
  const [step, setStep] = useState("loading"); // loading → scan → fail → manual
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // ---------- Step: Scanner Initialization ----------
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

        // 🔥 Replace with your backend authorization logic
        const isAuthorized = decodedText === "VALID";

        if (isAuthorized) {
          alert("Visitor Authorized (Success Screen Coming Soon)");
        } else {
          setStep("fail");
        }
      },
      (err) => console.log(err)
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [step]);

  // ---------- STEP 1: Loading UI ----------
  if (step === "loading") {
    return (
      <div style={styles.centerScreen}>
        <img
          src="/loading-icon.svg"
          alt="loading"
          style={{ width: 80, height: 80 }}
        />
        <button
          onClick={() => setStep("scan")}
          style={{ marginTop: 20, padding: "10px 25px", fontSize: 16 }}
        >
          Start Scanning
        </button>
      </div>
    );
  }

  // ---------- STEP 2: Scanning Screen ----------
  if (step === "scan") {
    return (
      <div style={styles.scanPage}>
        <div style={styles.scanFrame}>
          <div id="qr-reader" style={styles.reader} />
        </div>

        <p style={styles.instruction}>
          Place the visitor's QR code in front of the camera.
        </p>
      </div>
    );
  }

  // ---------- STEP 3: Failed Screen ----------
  if (step === "fail") {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.failCircle}>
          <span style={styles.failX}>✕</span>
        </div>

        <h2 style={styles.failTitle}>Failed to scan pass</h2>
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

  // ---------- STEP 4: Manual Code Entry ----------
  if (step === "manual") {
    return (
      <div style={styles.manualPage}>
        <h1 style={{ fontSize: 28 }}>Enter Code</h1>
        <p style={{ color: "#777", marginTop: 5 }}>
          Enter Code Manually To Confirm Your Visit
        </p>

        <div style={styles.codeContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleCodeChange(e.target.value, index)}
              style={styles.codeBox}
            />
          ))}
        </div>

        <button style={styles.confirmButton}>Confirm</button>
      </div>
    );
  }
}

// ------------------------- INPUT HANDLER -------------------------
function handleCodeChange(value, index) {
  setCode((prev) => {
    const newCode = [...prev];
    newCode[index] = value.toUpperCase();
    return newCode;
  });
}

// ------------------------- STYLES -------------------------
const styles = {
  centerScreen: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  scanPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 30,
  },

  scanFrame: {
    width: "1039px",
    height: "337px",
    border: "1px dashed white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "brightness(60%)",
  },

  reader: {
    width: "100%",
    height: "100%",
  },

  instruction: {
    marginTop: 15,
    color: "#ccc",
  },

  // Fail Screen
  failCircle: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    backgroundColor: "#FF4D6D",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  failX: {
    color: "white",
    fontSize: 70,
    fontWeight: "bold",
  },
  failTitle: { marginTop: 30, fontSize: 22, fontWeight: 600 },
  failDesc: { width: 320, color: "#666", marginTop: 10 },

  manualButton: {
    marginTop: 25,
    backgroundColor: "#2D5BFF",
    color: "white",
    borderRadius: 10,
    padding: "12px 30px",
    fontSize: 16,
    border: "none",
    cursor: "pointer",
  },

  // Manual Code Screen
  manualPage: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 60,
  },

  codeContainer: {
    display: "flex",
    gap: 12,
    marginTop: 35,
    marginBottom: 40,
  },

  codeBox: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#F1F1F1",
    textAlign: "center",
    fontSize: 26,
    border: "none",
    outline: "none",
  },

  confirmButton: {
    width: "80%",
    backgroundColor: "#2D5BFF",
    color: "white",
    padding: "20px 0",
    borderRadius: 18,
    fontSize: 22,
    border: "none",
  },
};
