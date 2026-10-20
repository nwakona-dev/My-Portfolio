
    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import {
    FolderKanban,
    Eye,
    EyeOff,
    Plus,
    ArrowUpRight,
    } from "lucide-react";
    import { getAllProjects } from "../../services/projectService";

    export default function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        getAllProjects()
        .then((data) => {
            if (active) setProjects(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
            if (active) setError(err.message || "Could not load projects.");
        })
        .finally(() => {
            if (active) setLoading(false);
        });

        return () => {
        active = false;
        };
    }, []);

    const publishedCount = projects.filter((project) => project.published).length;
    const draftCount = projects.length - publishedCount;

    return (
        <section>
        <div className="admin-welcome-row">
            <div>
            <p className="admin-eyebrow">OVERVIEW</p>
            <h2>Welcome to your dashboard</h2>
            <p className="admin-muted">
                Manage your portfolio content from one place.
            </p>
            </div>

            <Link to="/admin/projects/new" className="admin-primary-button" id="p-but">
            <Plus size={18} />
            New project
            </Link>
        </div>

        {error && (
            <div className="admin-alert admin-alert-error" role="alert">
            {error}
            </div>
        )}

        <div className="admin-stats-grid">
            <article className="admin-stat-card">
            <div className="admin-stat-icon"><FolderKanban size={21} /></div>
            <p>Total projects</p>
            <strong>{loading ? "—" : projects.length}</strong>
            <span>All projects in your portfolio</span>
            </article>

            <article className="admin-stat-card">
            <div className="admin-stat-icon published"><Eye size={21} /></div>
            <p>Published</p>
            <strong>{loading ? "—" : publishedCount}</strong>
            <span>Visible to portfolio visitors</span>
            </article>

            <article className="admin-stat-card">
            <div className="admin-stat-icon draft"><EyeOff size={21} /></div>
            <p>Drafts</p>
            <strong>{loading ? "—" : draftCount}</strong>
            <span>Not visible on the public portfolio</span>
            </article>
        </div>

        <section className="admin-panel">
            <div className="admin-panel-heading">
            <div>
                <h3>Recent projects</h3>
                <p>Review the projects you have added.</p>
            </div>
            <Link to="/admin/projects" className="admin-text-link">
                View all <ArrowUpRight size={16} />
            </Link>
            </div>

            {loading ? (
            <p className="admin-empty-state">Loading projects...</p>
            ) : projects.length === 0 ? (
            <div className="admin-empty-state">
                <FolderKanban size={30} />
                <h4>No projects yet</h4>
                <p>Create your first project to get started.</p>
                <Link to="/admin/projects/new" className="admin-primary-button">
                <Plus size={18} /> Create project
                </Link>
            </div>
            ) : (
            <div className="admin-table-wrap">
                <table className="admin-table">
                <thead>
                    <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Technologies</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[...projects]
                    .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
                    .slice(0, 5)
                    .map((project) => (
                        <tr key={project.id}>
                        <td>
                            <strong>{project.title}</strong>
                            <span className="admin-table-subtext">
                            {project.description}
                            </span>
                        </td>
                        <td>
                            <span className={`admin-status ${project.published ? "is-published" : "is-draft"}`}>
                            {project.published ? "Published" : "Draft"}
                            </span>
                        </td>
                        <td>{project.technologies || "—"}</td>
                        <td>
                            <Link
                            className="admin-table-action"
                            to={`/admin/projects/${project.id}/edit`}
                            >
                            Edit
                            </Link>
                        </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </section>
        </section>
    );
}
