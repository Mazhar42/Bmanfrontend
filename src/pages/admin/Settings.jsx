import { useState } from "react";
import { toast } from "react-hot-toast";
import { Lock, Eye, EyeOff, User, Save } from "lucide-react";
import { authApi } from "../../services/api";
import useStore from "../../store/useStore";
import LoadingSpinner from "../../components/common/LoadingSpinner";

function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleShow = (k) => setShow((s) => ({ ...s, [k]: !s[k] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }
    if (form.newPassword !== form.confirmPassword) {
      return toast.error("New passwords don't match");
    }
    setLoading(true);
    try {
      await authApi.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      {[
        {
          key: "currentPassword",
          label: "Current Password",
          showKey: "current",
        },
        { key: "newPassword", label: "New Password", showKey: "new" },
        {
          key: "confirmPassword",
          label: "Confirm New Password",
          showKey: "confirm",
        },
      ].map(({ key, label, showKey }) => (
        <div key={key}>
          <label className="text-xs font-semibold tracking-widest uppercase block mb-2 text-gray-500">
            {label}
          </label>
          <div className="relative">
            <input
              className="input pr-10"
              type={show[showKey] ? "text" : "password"}
              value={form[key]}
              onChange={(e) => update(key, e.target.value)}
              required
              minLength={key !== "currentPassword" ? 6 : undefined}
              autoComplete={
                key === "currentPassword" ? "current-password" : "new-password"
              }
            />
            <button
              type="button"
              onClick={() => toggleShow(showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {show[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary flex items-center gap-2"
      >
        {loading ? <LoadingSpinner size="sm" /> : <Lock size={15} />}
        {loading ? "Changing…" : "Change Password"}
      </button>
    </form>
  );
}

function ProfileSection() {
  const { user, setUser, token } = useStore();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.updateMe(form);
      setUser(data.user, token);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <div>
        <label className="text-xs font-semibold tracking-widest uppercase block mb-2 text-gray-500">
          Full Name
        </label>
        <input
          className="input"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="text-xs font-semibold tracking-widest uppercase block mb-2 text-gray-500">
          Email
        </label>
        <input
          className="input bg-gray-50 dark:bg-gray-700/50 cursor-not-allowed"
          value={user?.email}
          disabled
        />
        <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
      </div>
      <div>
        <label className="text-xs font-semibold tracking-widest uppercase block mb-2 text-gray-500">
          Phone
        </label>
        <input
          className="input"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="01XXXXXXXXX"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary flex items-center gap-2"
      >
        {loading ? <LoadingSpinner size="sm" /> : <Save size={15} />}
        {loading ? "Saving…" : "Save Profile"}
      </button>
    </form>
  );
}

export default function AdminSettings() {
  const { user } = useStore();
  const [tab, setTab] = useState("profile");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and security
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b dark:border-gray-700 mb-8 gap-1">
        {[
          { key: "profile", label: "Profile", icon: User },
          { key: "password", label: "Change Password", icon: Lock },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === key
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="card p-6">
        {tab === "profile" && (
          <>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b dark:border-gray-700">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent capitalize font-medium">
                  {user?.role}
                </span>
              </div>
            </div>
            <ProfileSection />
          </>
        )}
        {tab === "password" && (
          <>
            <div className="flex items-center gap-3 mb-6 pb-6 border-b dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Lock
                  size={18}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Change Password
                </p>
                <p className="text-xs text-gray-400">
                  Use a strong password with letters, numbers and symbols.
                </p>
              </div>
            </div>
            <ChangePasswordForm />
          </>
        )}
      </div>
    </div>
  );
}
