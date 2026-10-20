import { useEffect } from "react";
import { X, FolderKanban } from "lucide-react";

import ProjectCard from "./ProjectCard";
import "../../styles/projects/allProjectsModal.css";

const AllProjectsModal = ({ projects = [], onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="all-projects-modal__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="all-projects-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-projects-modal-title"
      >
        <div className="all-projects-modal__glow" />

        <header className="all-projects-modal__header">
          <div className="all-projects-modal__heading">
            <span className="all-projects-modal__eyebrow">
              THE COLLECTION
            </span>

            <h2 id="all-projects-modal-title">
              All Projects
            </h2>

            <p>
              Explore the projects I have built, the technologies behind
              them, and the problems they solve.
            </p>

            <span className="all-projects-modal__count">
              <FolderKanban size={15} aria-hidden="true" />
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>

          <button
            type="button"
            className="all-projects-modal__close"
            onClick={onClose}
            aria-label="Close all projects"
            autoFocus
          >
            <X size={21} />
          </button>
        </header>

        <div className="all-projects-modal__divider" />

        {projects.length > 0 ? (
          <div className="all-projects-modal__content">
            <div className="all-projects-modal__grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id ?? project._id}
                  project={project}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="all-projects-modal__empty">
            <FolderKanban size={36} strokeWidth={1.5} />
            <h3>No projects available</h3>
            <p>Projects will appear here when they are available.</p>
          </div>
        )}

        <footer className="all-projects-modal__footer">
          <span>
            Designed with care. Built with purpose.
          </span>

          <button
            type="button"
            className="all-projects-modal__done"
            onClick={onClose}
          >
            Close collection
          </button>
        </footer>
      </section>
    </div>
  );
};

export default AllProjectsModal;
