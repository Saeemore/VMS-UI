import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useQuery, useMutation } from '@tanstack/react-query';
import { Search, Check, Camera, Upload, Calendar } from 'lucide-react';
import '../styles/visitorForm.css'; // <- local page CSS (applies only to this page)
import api from '../api/api';


const dataURLtoBlob = (dataurl) => {
  if (!dataurl) return null;
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8 = new Uint8Array(n);
  while (n--) u8[n] = bstr.charCodeAt(n);
  return new Blob([u8], { type: mime });
};

function ProgressStepper({ step }) {
  const steps = [];
  return (
    <div className="stepper" aria-hidden>
      {steps.map((s, i) => {
        const done = s < step;
        const active = s === step;
        return (
          <React.Fragment key={s}>
            <div className={`dot ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              {done ? <Check size={18} /> : s}
            </div>
            {i < steps.length - 1 && (
              <div className={`stepper-line ${done ? 'active' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

/* --- Steps --- */
const Step1 = ({ formData, setFormData, scheduledAt, setScheduledAt, onNext }) => {
  const fmt = (date) => {
    const d = new Date(date);
    const Y = d.getFullYear();
    const M = (`0${d.getMonth()+1}`).slice(-2);
    const D = (`0${d.getDate()}`).slice(-2);
    const h = (`0${d.getHours()}`).slice(-2);
    const m = (`0${d.getMinutes()}`).slice(-2);
    return `${Y}-${M}-${D}T${h}:${m}`;
  };
  return (
    <div>
      <h2 className="visitor-title">Enter Your Details</h2>
      <input className="visitor-input" placeholder="Enter your name .." value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      <input className="visitor-input" placeholder="Company (optional)" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
      <input className="visitor-input" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input className="visitor-input" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
      <div style={{ position: 'relative' }}>
        <input className="visitor-input" type="datetime-local" value={fmt(scheduledAt)} onChange={e => setScheduledAt(new Date(e.target.value))} min={fmt(new Date())} />
        <Calendar style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={20} />
      </div>
      <div className="visitor-btns">
        <div />
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

const Step2 = ({ formData, setFormData, onNext, onBack }) => {
  const purposes = ["Business Meet", "Food Delivery", "Enquiry", "Maintenance"];
  const [isOther, setIsOther] = useState(!purposes.includes(formData.purpose) && formData.purpose !== '');
  const choose = (p) => { setIsOther(false); setFormData({...formData, purpose: p}); };
  const other = () => { setIsOther(true); setFormData({...formData, purpose: ''}); };
  return (
    <div>
      <h2 className="visitor-title">Purpose of Visit</h2>
      <div className="purpose-grid">
        {purposes.map(p => (
          <button key={p} type="button" className={`purpose-btn ${formData.purpose === p ? 'selected' : ''}`} onClick={() => choose(p)}>{p}</button>
        ))}
        <button type="button" className={`purpose-btn ${isOther ? 'selected' : ''}`} onClick={other}>Other</button>
      </div>
      {isOther && <input className="visitor-input" placeholder="Enter purpose..." value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />}
      <div className="visitor-btns">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

const Step3 = ({ formData, setFormData, companyId, onNext, onBack }) => {
  const { data: hosts, isLoading } = useQuery({
    queryKey: ['hosts', companyId],
    queryFn: async () => {
  const res = await api.get(`/public/hosts/${companyId}`);
  console.log(res)
  if (!(res.status>=200 && res.status<300)) throw new Error("Failed to fetch hosts");
  const data = await res.data;
  return data;
},
    enabled: !!companyId
  });
  const [q, setQ] = useState('');
  const filtered = hosts?.filter(h => h.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <h2 className="visitor-title">Who Are You Visiting?</h2>
      <div className="hosts-search">
        <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} size={18} />
        <input className="visitor-input" placeholder="Search By Name, Role, Team ..." value={q} onChange={e => setQ(e.target.value)} style={{ paddingLeft: 42 }} />
      </div>

      <div className="hosts-grid">
        {isLoading ? <div>Loading hosts...</div> : filtered?.map(h => (
          <div key={h._id} role="button" tabIndex={0} onClick={() => setFormData({...formData, host_id: h._id})} className={`host-card ${formData.host_id === h._id ? 'selected' : ''}`}>
            <p className="host-name">{h.name}</p>
            <p className="host-role">{h.role}</p>
            <p className="host-dept">{h.department}</p>
          </div>
        ))}
      </div>

      <div className="visitor-btns">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

const Step4 = ({ uploadedSelfie, setUploadedSelfie, capturedImage, setCapturedImage, onSubmit, onBack, isSubmitting }) => {
  const [mode, setMode] = useState('upload');
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (mode === 'camera') {
      (async () => {
        try {
          const s = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        } catch (err) {
          console.error(err);
          alert('Camera access denied or not available.');
        }
      })();
    } else {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
        setStream(null);
      }
    }
    return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const capture = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const c = document.createElement('canvas');
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d').drawImage(v,0,0);
    const dataUrl = c.toDataURL('image/png');
    setCapturedImage(dataUrl);
    if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); }
  }, [videoRef, stream, setCapturedImage]);

  const handleUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedSelfie(e.target.files[0]);
      setCapturedImage(null);
    }
  };

  return (
    <div>
      <h2 className="visitor-title">Verification</h2>
      <div className="upload-section">
        <div className={`upload-box ${mode === 'upload' ? 'active' : ''}`} onClick={() => setMode('upload')}>
          <Upload size={36} />
          <div className="upload-info">Upload Your Picture</div>
          <div className="upload-info" style={{ fontSize: 12 }}>Click to select a file</div>
          <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        </div>

        <div className={`upload-box ${mode === 'camera' ? 'active' : ''}`} onClick={() => setMode('camera')}>
          <Camera size={36} />
          <div className="upload-info">Take Selfie</div>
          <div className="upload-info" style={{ fontSize: 12 }}>Need camera permission</div>
        </div>
      </div>

      {mode === 'camera' && (
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          {capturedImage ? (
            <>
              <img src={capturedImage} alt="captured" style={{ maxWidth: 300, borderRadius: 12 }} />
              <div style={{ marginTop: 8 }}>
                <button className="btn btn-secondary" onClick={() => { setCapturedImage(null); setMode('camera'); }}>Retake</button>
              </div>
            </>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: 360, borderRadius: 12, background: '#000' }} />
              <div style={{ marginTop: 8 }}>
                <button className="btn btn-primary" onClick={capture}>Capture</button>
              </div>
            </>
          )}
        </div>
      )}

      {mode === 'upload' && uploadedSelfie && (
        <div className="upload-preview">
          <img src={URL.createObjectURL(uploadedSelfie)} alt="preview" />
        </div>
      )}

      <div className="visitor-btns">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-primary" onClick={onSubmit} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </div>
  );
};

/* --- Main component --- */
export default function VisitorForm() {
  // const { companyId } = { companyId: '68ce5b39b018eb3126e6e988' };
  const { companyId } = useParams();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', organization: '', purpose: '', host_id: '' });
  const [scheduledAt, setScheduledAt] = useState(new Date());
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedSelfie, setUploadedSelfie] = useState(null);

  const mutation = useMutation({
    mutationFn: (fd) => api.post('/public/visits', fd),
    onSuccess: () => {
      alert('Request submitted successfully!');
      setStep(1);
      setFormData({ name: '', email: '', phone: '', organization: '', purpose: '', host_id: '' });
      setCapturedImage(null);
      setUploadedSelfie(null);
      setScheduledAt(new Date());
    },
    onError: (err) => { alert('Submission failed'); console.error(err); }
  });

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) return alert('Please fill name, email, phone.');
    if (step === 2 && !formData.purpose) return alert('Select purpose.');
    if (step === 3 && !formData.host_id) return alert('Select a host.');
    setStep(s => Math.min(4, s+1));
  };
  const handleBack = () => setStep(s => Math.max(1, s-1));

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const fd = new FormData();
    Object.keys(formData).forEach(k => fd.append(k, formData[k]));
    fd.append('scheduled_at', scheduledAt.toISOString());
    fd.append('company_id', companyId);
    if (uploadedSelfie) fd.append('selfie', uploadedSelfie);
    else if (capturedImage) fd.append('selfie', dataURLtoBlob(capturedImage), 'selfie.png');
    else return alert('Please provide a selfie.');
    mutation.mutate(fd);
  };

  return (
    <div className="visitor-page">
      <div className="visitor-container">
        <ProgressStepper step={step} />
        {step === 1 && <Step1 formData={formData} setFormData={setFormData} scheduledAt={scheduledAt} setScheduledAt={setScheduledAt} onNext={handleNext} />}
        {step === 2 && <Step2 formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <Step3 formData={formData} setFormData={setFormData} companyId={companyId} onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <Step4 uploadedSelfie={uploadedSelfie} setUploadedSelfie={setUploadedSelfie} capturedImage={capturedImage} setCapturedImage={setCapturedImage} onSubmit={handleSubmit} onBack={handleBack} isSubmitting={mutation.isLoading} />}
      </div>
    </div>
  );
}
