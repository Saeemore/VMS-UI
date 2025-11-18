// FILE: src/pages/common/Profile.jsx

import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth(); // logged-in user
  const fileRef = useRef(null);
  const [tab, setTab] = useState("profile");

  // ---------------------------------------------
  // 1. FETCH USER PROFILE
  // ---------------------------------------------
  const fetchProfile = async () => {
    const res = await api.get("/auth/me");
    return res.data;
  };

  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  // Local state for form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
  if (profile) {
    // Split name into first + last
    const [firstName, ...rest] = profile.name?.split(" ") || [];
    const lastName = rest.join(" ");

    setForm({
      firstName,
      lastName,
      company: profile.company || "",
      role: profile.role || "",
      email: profile.email || "",
      phone: profile.phone || "",     // backend doesn't send → fallback empty
      avatar: profile.avatar || "",   // backend doesn't send → fallback empty
    });
  }
}, [profile]);


  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // ---------------------------------------------
  // 2. PROFILE UPDATE MUTATION
  // ---------------------------------------------
  const updateProfileMutation = useMutation({
    mutationFn: (data) => api.patch("/auth/update-profile", data),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      refetch();
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to update profile."),
  });

  const onSave = (e) => {
  e.preventDefault();

  updateProfileMutation.mutate({
    name: `${form.firstName} ${form.lastName}`.trim(),
    email: form.email,
    role: form.role,
    company: form.company,
    phone: form.phone,
    avatar: form.avatar,
  });
};


  // ---------------------------------------------
  // 3. PASSWORD UPDATE MUTATION
  // ---------------------------------------------
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data) => api.patch("/auth/update-password", data),
    onSuccess: () => {
      toast.success("Password updated successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to update password."),
  });

  const onPasswordSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 6)
      return toast.error("New password must be at least 6 characters long.");

    if (passwords.newPassword !== passwords.confirmPassword)
      return toast.error("New passwords do not match.");

    changePasswordMutation.mutate({
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });
  };

  const onPasswordChange = (e) =>
    setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }));

  // ---------------------------------------------
  // IMAGE UPLOAD
  // ---------------------------------------------
  const onPick = () => fileRef.current?.click();
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const onDeletePic = () =>
    setForm((f) => ({ ...f, avatar: "" }));

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="pf-wrapper">
      {/* Left nav */}
      <aside className="pf-sidenav">
        <button
          className={`pf-tab ${tab === "profile" ? "active" : ""}`}
          onClick={() => setTab("profile")}
        >
          Profile
        </button>

        <button
          className={`pf-tab ${tab === "password" ? "active" : ""}`}
          onClick={() => setTab("password")}
        >
          Change Password
        </button>
      </aside>

      {/* Right Content */}
      <section className="pf-content">
        {tab === "profile" ? (
          <form onSubmit={onSave} className="pf-form">
            {/* Avatar */}
            <div className="pf-avatar-block">
              <div className="pf-avatar">
                {form.avatar ? (
                  <img src={form.avatar} alt="avatar" className="pf-avatar-img" />
                ) : (
                  <div className="pf-avatar-fallback" />
                )}
              </div>

              <div className="pf-avatar-actions">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onFile}
                />
                <button
                  type="button"
                  className="pf-btn pf-btn-primary"
                  onClick={onPick}
                >
                  Change Picture
                </button>

                <button
                  type="button"
                  className="pf-btn pf-btn-ghost"
                  onClick={onDeletePic}
                >
                  Delete Picture
                </button>
              </div>
            </div>

            {/* Input fields */}
            <div className="pf-grid">
              {["firstName", "lastName", "company", "role", "email", "phone"].map(
                (field) => (
                  <div className="pf-field" key={field}>
                    <label className="pf-label">
                      {field.replace(/^\w/, (c) => c.toUpperCase())}
                    </label>
                    <input
                      name={field}
                      value={form[field]}
                      className="pf-input"
                      type={field === "email" ? "email" : "text"}
                      onChange={onChange}
                    />
                  </div>
                )
              )}
            </div>

            <div className="pf-actions">
              <button
                type="submit"
                className="pf-save"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        ) : (
          // PASSWORD TAB
          <form onSubmit={onPasswordSubmit} className="pf-form">
            <div className="pf-grid pf-grid-single">
              <div className="pf-field">
                <label className="pf-label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="pf-input"
                  value={passwords.currentPassword}
                  onChange={onPasswordChange}
                />
              </div>

              <div className="pf-field">
                <label className="pf-label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="pf-input"
                  value={passwords.newPassword}
                  onChange={onPasswordChange}
                />
              </div>

              <div className="pf-field">
                <label className="pf-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="pf-input"
                  value={passwords.confirmPassword}
                  onChange={onPasswordChange}
                />
              </div>
            </div>

            <div className="pf-actions">
              <button
                type="submit"
                className="pf-save"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
