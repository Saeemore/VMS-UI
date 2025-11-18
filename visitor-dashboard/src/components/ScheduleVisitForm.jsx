import React, { useState, useRef, useCallback, useEffect } from "react";
import { Calendar, Camera, Upload, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import "../styles/visitorForm.css";

/* Convert webcam image to file */
const dataURLtoBlob = (dataurl) => {
  if (!dataurl) return null;
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8 = new Uint8Array(n);
  while (n--) u8[n] = bstr.charCodeAt(n);
  return new Blob([u8], { type: mime });
};

/* ---------------------- Progress Stepper ---------------------- */
function ProgressStepper({ step }) {
  const steps = [1, 2];
  return (
    <div className="stepper">
      {steps.map((s, i) => {
        const done = s < step;
        const active = s === step;

        return (
          <React.Fragment key={s}>
            <div className={`dot ${done ? "done" : ""} ${active ? "active" : ""}`}>
              {done ? <Check size={18} /> : s}
            </div>

            {i < steps.length - 1 && (
              <div className={`stepper-line ${done ? "active" : ""}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---------------------- Step 1: Details + Purpose ---------------------- */
const Step1Combined = ({ formData, setFormData, scheduledAt, setScheduledAt, onNext }) => {
  const purposes = ["Business Meet", "Enquiry", "Delivery", "Maintenance"];
  const [isOther, setIsOther] = useState(
    !purposes.includes(formData.purpose) && formData.purpose !== ""
  );

  const fmt = (date) => {
    const d = new Date(date);
    const Y = d.getFullYear();
    const M = (`0${d.getMonth() + 1}`).slice(-2);
    const D = (`0${d.getDate()}`).slice(-2);
    const h = (`0${d.getHours()}`).slice(-2);
    const m = (`0${d.getMinutes()}`).slice(-2);
    return `${Y}-${M}-${D}T${h}:${m}`;
  };

  return (
    <div>
      <h2 className="visitor-title">Enter Your Details</h2>

      <input
        className="visitor-input"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="visitor-input"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        className="visitor-input"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      <input
        className="visitor-input"
        placeholder="Company (optional)"
        value={formData.organization}
        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
      />

      {/* Date & Time */}
      <div style={{ position: "relative" }}>
        <input
          className="visitor-input"
          type="datetime-local"
          value={fmt(scheduledAt)}
          min={fmt(new Date())}
          onChange={(e) => setScheduledAt(new Date(e.target.value))}
        />
        <Calendar
          size={20}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9CA3AF",
          }}
        />
      </div>

      {/* Purpose */}
      <h3 className="visitor-title" style={{ marginTop: "1.5rem" }}>
        Purpose of Visit
      </h3>

      <div className="purpose-grid">
        {purposes.map((p) => (
          <button
            key={p}
            className={`purpose-btn ${formData.purpose === p ? "selected" : ""}`}
            onClick={() => {
              setIsOther(false);
              setFormData({ ...formData, purpose: p });
            }}
          >
            {p}
          </button>
        ))}

        <button
          className={`purpose-btn ${isOther ? "selected" : ""}`}
          onClick={() => {
            setIsOther(true);
            setFormData({ ...formData, purpose: "" });
          }}
        >
          Other
        </button>
      </div>

      {isOther && (
        <input
          className="visitor-input"
          placeholder="Enter Purpose..."
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
        />
      )}

      <div className="visitor-btns">
        <div />
        <button className="btn btn-primary" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

/* ---------------------- Step 2: Verification ---------------------- */
const Step3 = ({
  uploadedSelfie,
  setUploadedSelfie,
  capturedImage,
  setCapturedImage,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const [mode, setMode] = useState("upload");
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (mode === "camera") {
      (async () => {
        try {
          const s = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        } catch {
          alert("Camera not available.");
        }
      })();
    }

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [mode]);

  const capture = () => {
    const v = videoRef.current;
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    setCapturedImage(c.toDataURL("image/png"));
  };

  return (
    <div>
      <h2 className="visitor-title">Verification</h2>

      <div className="upload-section">
        <label
          className={`upload-box ${mode === "upload" ? "active" : ""}`}
          onClick={() => setMode("upload")}
        >
          <Upload size={36} />
          <div className="upload-info">Upload Your Picture</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUploadedSelfie(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>

        <div
          className={`upload-box ${mode === "camera" ? "active" : ""}`}
          onClick={() => setMode("camera")}
        >
          <Camera size={36} />
          <div className="upload-info">Take Selfie</div>
        </div>
      </div>

      {mode === "camera" && (
        <div style={{ marginTop: 12 }}>
          {!capturedImage ? (
            <>
              <video ref={videoRef} autoPlay playsInline className="camera-preview" />
              <button className="btn btn-primary" onClick={capture}>
                Capture
              </button>
            </>
          ) : (
            <>
              <img src={capturedImage} className="preview-image" />
              <button className="btn btn-secondary" onClick={() => setCapturedImage(null)}>
                Retake
              </button>
            </>
          )}
        </div>
      )}

      {mode === "upload" && uploadedSelfie && (
        <div className="upload-preview">
          <img src={URL.createObjectURL(uploadedSelfie)} alt="" />
        </div>
      )}

      <div className="visitor-btns">
        <button className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
        <button className="btn btn-primary" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

/* ---------------------- MAIN COMPONENT ---------------------- */
export default function ScheduleVisitForm({ isModal = false }) {
  const { companyId } = useParams();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    purpose: "",
  });

  const [scheduledAt, setScheduledAt] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedSelfie, setUploadedSelfie] = useState(null);

  const mutation = useMutation({
    mutationFn: (fd) => api.post("/host/schedule", fd),
    onSuccess: () => alert("Visit scheduled successfully!"),
    onError: () => alert("Failed to schedule visit."),
  });

  const next = () => {
    if (!formData.name || !formData.email || !formData.phone)
      return alert("Please fill name, email, phone.");
    if (!formData.purpose)
      return alert("Please select purpose.");

    setStep(2);
  };

  const submit = () => {
    const fd = new FormData();
    Object.keys(formData).forEach((k) => fd.append(k, formData[k]));
    fd.append("scheduled_at", scheduledAt.toISOString());
    fd.append("company_id", companyId);

    if (uploadedSelfie)
      fd.append("selfie", uploadedSelfie);
    else if (capturedImage)
      fd.append("selfie", dataURLtoBlob(capturedImage), "selfie.png");
    else return alert("Please upload or capture a selfie.");

    mutation.mutate(fd);
  };

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      <ProgressStepper step={step} />

      {step === 1 && (
        <Step1Combined
          formData={formData}
          setFormData={setFormData}
          scheduledAt={scheduledAt}
          setScheduledAt={setScheduledAt}
          onNext={next}
        />
      )}

      {step === 2 && (
        <Step3
          uploadedSelfie={uploadedSelfie}
          setUploadedSelfie={setUploadedSelfie}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          onBack={() => setStep(1)}
          onSubmit={submit}
          isSubmitting={mutation.isLoading}
        />
      )}
    </div>
  );
}
