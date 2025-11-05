import React, { useRef, useState } from "react";
import "../styles/Dashboard.css";

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "Karina",
    lastName: "Dutta",
    company: "ESTMAC LTD",
    role: "Host",
    email: "karinadutta@gmail.com",
    phone: "+91 1234567890",
    avatar: "",
  });
  const [tab, setTab] = useState("profile"); // 'profile' | 'password'
  const fileRef = useRef(null);

  const onPick = () => fileRef.current?.click();
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };
  const onDeletePic = () => setForm((f) => ({ ...f, avatar: "" }));

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSave = (e) => {
    e.preventDefault();
    // TODO: submit to API
    // console.log("save", form);
  };

  return (
    <>
      {/* <h2 className="section-title mb-4">Profile.</h2> */}

      <div className="pf-wrapper">
        {/* Left nav */}
        <aside className="pf-sidenav">
          <button
            className={`pf-tab ${tab === "profile" ? "active" : ""}`}
            onClick={() => setTab("profile")}
            type="button"
          >
            Profile
          </button>
          <button
            className={`pf-tab ${tab === "password" ? "active" : ""}`}
            onClick={() => setTab("password")}
            type="button"
          >
            Change Password
          </button>
        </aside>

        {/* Content */}
        <section className="pf-content">
          {tab === "profile" ? (
            <form onSubmit={onSave} className="pf-form">
              {/* avatar + buttons */}
              <div className="pf-avatar-block">
                <div className="pf-avatar">
                  {form.avatar ? (
                    <img src={form.avatar} alt="avatar" className="pf-avatar-img" />
                  ) : (
                    <div className="pf-avatar-fallback" />
                  )}
                </div>

                <div className="pf-avatar-actions">
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
                  <button type="button" className="pf-btn pf-btn-primary" onClick={onPick}>
                    Change Picture
                  </button>
                  <button type="button" className="pf-btn pf-btn-ghost" onClick={onDeletePic}>
                    Delete Picture
                  </button>
                </div>
              </div>

              {/* fields grid */}
              <div className="pf-grid">
                <div className="pf-field">
                  <label className="pf-label">First Name</label>
                  <input
                    name="firstName"
                    className="pf-input"
                    value={form.firstName}
                    onChange={onChange}
                    placeholder="First Name"
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Last Name</label>
                  <input
                    name="lastName"
                    className="pf-input"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Last Name"
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Company</label>
                  <input
                    name="company"
                    className="pf-input"
                    value={form.company}
                    onChange={onChange}
                    placeholder="Company"
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Role</label>
                  <input
                    name="role"
                    className="pf-input"
                    value={form.role}
                    onChange={onChange}
                    placeholder="Role"
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="pf-input"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email"
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Phone</label>
                  <input
                    name="phone"
                    className="pf-input"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Phone"
                  />
                </div>
              </div>

              <div className="pf-actions">
                <button type="submit" className="pf-save">Save</button>
              </div>
            </form>
          ) : (
            <PasswordPane />
          )}
        </section>
      </div>
    </>
  );
}

function PasswordPane() {
  const [vals, setVals] = useState({ current: "", next: "", confirm: "" });
  const onChange = (e) => setVals((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onSave = (e) => {
    e.preventDefault();
    // TODO: call API
  };
  return (
    <form onSubmit={onSave} className="pf-form">
      <div className="pf-grid pf-grid-single">
        <div className="pf-field">
          <label className="pf-label">Current Password</label>
          <input
            name="current"
            type="password"
            className="pf-input"
            value={vals.current}
            onChange={onChange}
          />
        </div>
        <div className="pf-field">
          <label className="pf-label">New Password</label>
          <input
            name="next"
            type="password"
            className="pf-input"
            value={vals.next}
            onChange={onChange}
          />
        </div>
        <div className="pf-field">
          <label className="pf-label">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            className="pf-input"
            value={vals.confirm}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="pf-actions">
        <button type="submit" className="pf-save">Save</button>
      </div>
    </form>
  );
}
