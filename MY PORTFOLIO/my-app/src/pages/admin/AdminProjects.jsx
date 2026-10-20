
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

import {
  getAllProjects,
  deleteProject,
  updatePublishedStatus,
} from "../../services/projectService";

// Spring Boot backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const getProjectImageUrl = (imageUrl) => {
  if (!imageUrl) return "";

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `${API_BASE_URL.replace(/\/$/, "")}/${imageUrl.replace(/^\/+/, "")}`;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handlePublishToggle = async (project) => {
    setBusyId(project.id);
    setError("");
    setNotice("");

    try {
      await updatePublishedStatus(project.id, !project.published);

      setNotice(
        !project.published
          ? "Project published successfully."
          : "Project moved back to drafts."
      );

      await loadProjects();
    } catch (err) {
      setError(err.message || "Could not update project status.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setBusyId(project.id);
    setError("");
    setNotice("");

    try {
      await deleteProject(project.id);

      setProjects((current) =>
        current.filter((item) => item.id !== project.id)
      );

      setNotice("Project deleted successfully.");
    } catch (err) {
      setError(err.message || "Could not delete project.");
    } finally {
      setBusyId(null);
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "published") return project.published;
    if (filter === "drafts") return !project.published;

    return true;
  });

  return (
    <section>
      <div className="admin-welcome-row">
        <div>
          <p className="admin-eyebrow">CONTENT MANAGEMENT</p>
          <h2>Your projects</h2>
          <p className="admin-muted">
            Create, edit, publish, and manage portfolio projects.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="admin-primary-button" id="p-but"
        >
          <Plus size={18} />
          Add project
        </Link>
      </div>

      {error && (
        <div
          className="admin-alert admin-alert-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {notice && (
        <div
          className="admin-alert admin-alert-success"
          role="status"
        >
          {notice}
        </div>
      )}

      <div className="admin-project-toolbar">
        <div
          className="admin-filter-group"
          aria-label="Filter projects"
        >
          {[
            ["all", "All projects"],
            ["published", "Published"],
            ["drafts", "Drafts"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`admin-filter-button ${
                filter === value ? "selected" : ""
              }`}
              onClick={() => setFilter(value)}
            >
              {label}
              {value === "all" && ` (${projects.length})`}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="admin-secondary-button"
          onClick={loadProjects}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <section className="admin-panel">
        {loading ? (
          <p className="admin-empty-state">
            Loading projects...
          </p>
        ) : filteredProjects.length === 0 ? (
          <div className="admin-empty-state">
            <h3>No projects found</h3>
            <p>Try another filter or create a new project.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Technologies</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.map((project) => {
                  const imageUrl = getProjectImageUrl(
                    project.imageUrl
                  );

                  return (
                    <tr key={project.id}>
                      <td>
                        <div className="admin-project-cell">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={`${project.title || "Project"} preview`}
                              className="admin-project-thumb"
                              loading="lazy"
                              onError={(event) => {
                                console.error(
                                  "Failed to load project image:",
                                  event.currentTarget.src
                                );

                                // Hide the broken image and show a placeholder
                                event.currentTarget.style.display = "none";
                                event.currentTarget.nextElementSibling?.removeAttribute(
                                  "hidden"
                                );
                              }}
                            />
                          ) : null}

                          <div
                            className="admin-project-thumb admin-project-placeholder"
                            hidden={Boolean(imageUrl)}
                          >
                            <Eye size={20} />
                          </div>

                          <div>
                            <strong>{project.title}</strong>

                            <span className="admin-table-subtext">
                              {project.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`admin-status ${
                            project.published
                              ? "is-published"
                              : "is-draft"
                          }`}
                        >
                          {project.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td>{project.technologies || "—"}</td>

                      <td>
                        {project.updatedAt
                          ? new Date(
                              project.updatedAt
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      <td>
                        <div className="admin-action-group">
                          <Link
                            to={`/admin/projects/${project.id}/edit`}
                            className="admin-icon-button"
                            aria-label={`Edit ${project.title}`}
                            title="Edit project"
                          >
                            <Pencil size={17} />
                          </Link>

                          <button
                            type="button"
                            className="admin-icon-button"
                            onClick={() =>
                              handlePublishToggle(project)
                            }
                            disabled={busyId === project.id}
                            aria-label={
                              project.published
                                ? "Unpublish project"
                                : "Publish project"
                            }
                            title={
                              project.published
                                ? "Unpublish"
                                : "Publish"
                            }
                          >
                            {project.published ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>

                          <button
                            type="button"
                            className="admin-icon-button danger"
                            onClick={() => handleDelete(project)}
                            disabled={busyId === project.id}
                            aria-label={`Delete ${project.title}`}
                            title="Delete project"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
