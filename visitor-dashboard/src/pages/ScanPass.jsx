// src/pages/ScanPass.jsx
import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { XCircle, CheckCircle } from "lucide-react"; // Icons for success/failure
import "../styles/dashboard.css";

// --- Sub-component for Manual Code Entry ---
const ManualCodeEntry = ({ onCodeSubmit, onBackToScan }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 4) { // Assuming a 4-digit code
      onCodeSubmit(code);
    }
  };

  return (
    <div className="manual-entry-container">
      <h2 className="manual-entry-title">Enter Code</h2>
      <p className="manual-entry-instruction">
        Please enter the visitor's QR code in front of the camera.
      </p>
      <form onSubmit={handleSubmit} className="code-input-form">
        {/* Simple 4-digit input */}
        <input
          type="text"
          maxLength="4"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // Allow only digits
          className="code-input"
          placeholder="----"
          inputMode="numeric"
          pattern="\d{4}"
          required
        />
        <button type="submit" className="confirm-button">
          Confirm
        </button>
      </form>
      <button onClick={onBackToScan} className="back-to-scan-button">
        Back to Scan
      </button>
    </div>
  );
};

// --- Main ScanPass Component ---
const ScanPass = () => {
  // Define possible states for the page
  const SCANNING = "SCANNING";
  const SUCCESS = "SUCCESS";
  const FAILURE = "FAILURE";
  const MANUAL_ENTRY = "MANUAL_ENTRY";

  const [pageState, setPageState] = useState(SCANNING);
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null); // To store the scanner instance

  useEffect(() => {
    if (pageState === SCANNING) {
      // Initialize scanner only when in SCANNING state
      const scannerId = "qr-reader";
      
      const html5QrcodeScanner = new Html5QrcodeScanner(
        scannerId,
        {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 10,
        },
        false
      );

      // Store the scanner instance in the ref
      scannerRef.current = html5QrcodeScanner;

      const onScanSuccess = (decodedText, decodedResult) => {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setScannedData(decodedText);
        // Simulate a check-in process
        simulateCheckIn(decodedText);
        // Stop scanning after a successful scan
        html5QrcodeScanner.clear(); // Clear the scanner
      };

      const onScanError = (errorMessage) => {
        // console.warn(errorMessage);
        // Don't change state on every minor error, only on actual failure to read
      };

      html5QrcodeScanner.render(onScanSuccess, onScanError);
    }

    // Cleanup function to stop the scanner when component unmounts
    return () => {
      console.log("Cleaning up scanner effect...");
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear scanner during cleanup:", error);
        });
        scannerRef.current = null; // Clear the ref
      }
    };
  }, [pageState]); // Re-run effect if pageState changes

  // Simulate an API call for check-in
  const simulateCheckIn = (data) => {
    // In a real app, you'd send 'data' to your backend
    console.log(`Simulating check-in for: ${data}`);
    setTimeout(() => {
      // Simulate success or failure
      const isSuccessful = data.startsWith("ESTMAC_PASS_"); // Example condition
      if (isSuccessful) {
        setPageState(SUCCESS);
      } else {
        setPageState(FAILURE);
      }
    }, 1500); // Simulate network delay
  };

  const handleManualCodeSubmit = (code) => {
    setScannedData(code); // Treat manual code as scanned data
    simulateCheckIn(code); // Simulate check-in with manual code
    setPageState(SCANNING); // Temporarily go back to scanning to hide input
  };

  const handleTryAgain = () => {
    setPageState(SCANNING);
    setScannedData(null); // Clear previous data
  };

  const handleEnterCodeManually = () => {
    // If scanner is active, stop it before showing manual entry
    if (scannerRef.current) {
      scannerRef.current.clear().catch(error => console.error("Error clearing scanner:", error));
      scannerRef.current = null; // Clear the ref
    }
    setPageState(MANUAL_ENTRY);
  };

  const handleBackToScanFromManual = () => {
    setPageState(SCANNING);
  };


  return (
    <div className="scan-pass-page">
      <h1 className="page-title">Scan Visitor Pass</h1>

      <div className="scanner-main-content">
        {pageState === SCANNING && (
          <div className="scanner-container">
            <div id="qr-reader"></div>
            <p className="scanner-instruction">
              Place the visitor's QR code in front of the camera.
            </p>
            {/* Optional: Debug info */}
            {/* {scannedData && <p className="scan-result-debug">Last scanned: {scannedData}</p>} */}
          </div>
        )}

        {pageState === SUCCESS && (
          <div className="scan-status-card success">
            <CheckCircle size={80} className="status-icon" />
            <h2 className="status-title">Checked in Successful!</h2>
            <p className="status-message">
              Visitor has successfully checked-in. Their pass is valid until 11:00.
            </p>
            <button onClick={handleTryAgain} className="action-button primary">
              Scan Next Pass
            </button>
          </div>
        )}

        {pageState === FAILURE && (
          <div className="scan-status-card failure">
            <XCircle size={80} className="status-icon" />
            <h2 className="status-title">Failed to scan pass</h2>
            <p className="status-message">
              Oops! Something went wrong or the pass is invalid. Please try again.
            </p>
            <button onClick={handleTryAgain} className="action-button primary">
              Try Again
            </button>
            <button onClick={handleEnterCodeManually} className="action-button secondary">
              Enter Code Manually
            </button>
          </div>
        )}

        {pageState === MANUAL_ENTRY && (
          <ManualCodeEntry
            onCodeSubmit={handleManualCodeSubmit}
            onBackToScan={handleBackToScanFromManual}
          />
        )}
      </div>
    </div>
  );
};

export default ScanPass;