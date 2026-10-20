
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setSubmitting(true);

    try {
      await login(form);

      const destination = location.state?.from?.pathname || "/admin";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
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

        <div className="admin-auth-icon">
          <LockKeyhole size={25} />
        </div>

        <h1>Welcome back</h1>
        <p className="admin-auth-subtitle">
          Sign in to manage your portfolio projects.
        </p>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
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
            placeholder="Enter your username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="admin-primary-button admin-auth-submit"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign in"}
            {!submitting && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="admin-auth-footer">
          Need to initialize your admin account?{" "}
          <Link to="/admin/setup">Set up admin</Link>
        </p>
      </section>
    </main>
  );
}
