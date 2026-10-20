import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  const navClass = ({ isActive }) =>
    `admin-nav-link${isActive ? " active" : ""}`;

  return (
    <>
      {open && (
        <button
          className="admin-sidebar-overlay"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}

      <aside className={`admin-sidebar${open ? " sidebar-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">A</div>
          <div>
            <strong>Admin Panel</strong>
            <span>Portfolio management</span>
          </div>

          <button
            className="admin-icon-button admin-sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar-label">WORKSPACE</div>

        <nav className="admin-navigation">
          <NavLink
            to="/admin"
            end
            className={navClass}
            onClick={onClose}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/projects"
            className={navClass}
            onClick={onClose}
          >
            <FolderKanban size={19} />
            <span>Projects</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-bottom">
          <a
            className="admin-nav-link"
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={19} />
            <span>View portfolio</span>
          </a>

          <button
            type="button"
            className="admin-nav-link admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
