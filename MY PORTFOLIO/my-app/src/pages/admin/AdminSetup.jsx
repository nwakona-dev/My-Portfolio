
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setupAdmin } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function AdminSetup() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <div className="admin-loading">Checking session...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const response = await setupAdmin(form);

      setSuccess(
        response?.message ||
          "Admin account created. You can now sign in."
      );

      setTimeout(() => navigate("/admin/login", { replace: true }), 1200);
    } catch (err) {
      setError(err.message || "Unable to create the admin account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <Link to="/" className="admin-auth-brand">
          <span className="admin-brand-mark">A</span>
          <span>Portfolio Admin</span>
        </Link>

        <h1>Set up administrator</h1>
        <p className="admin-auth-subtitle">
          Create the initial administrator account for your portfolio.
        </p>

        <div className="admin-alert admin-alert-info">
          Your backend must not already have an administrator account.
        </div>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="admin-alert admin-alert-success" role="status">
            {success}
          </div>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password"
            minLength={12}
            required
          />

          <p className="admin-field-hint">
            Use at least 12 characters if that is the rule configured by your backend.
          </p>

          <button
            type="submit"
            className="admin-primary-button admin-auth-submit"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Create admin account"}
          </button>
        </form>

        <p className="admin-auth-footer">
          Already have an account? <Link to="/admin/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
