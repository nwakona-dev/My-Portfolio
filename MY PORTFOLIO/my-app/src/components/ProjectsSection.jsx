
import React, { useState, useCallback } from "react";
import { FolderKanban, RefreshCw, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";

import useProjects from "../hooks/useProjects";
import ProjectCard from "../components/projects/ProjectCard";
import AllProjectsModal from "../components/projects/AllProjectsModal";

import "../styles/projects/projects.css";

// const GITHUB_REPO_URL =
//   "https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY";

const PROJECTS_TO_SHOW = 3;

const ProjectsSection = () => {
  const { projects, loading, error, refetchProjects } = useProjects();
  const shouldReduceMotion = useReducedMotion();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const featuredProjects = projects.slice(0, PROJECTS_TO_SHOW);

  return (
    <>
      <section className="projects-section" id="projects">
        <div className="projects-section__panel">
          <header className="projects-section__header">
            <div className="projects-section__heading-group">
              <span className="projects-section__eyebrow">
                MY WORK
              </span>

              <div className="portfolio-skills-heading">
                <h2>Featured Projects</h2>

                <motion.span
                  className="portfolio-skills-heading-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{
                    once: false,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: "left",
                  }}
                />
              </div>

              <p className="projects-section__subtitle">
                A selection of projects I've built, showcasing my skills,
                technologies, and approach to solving real-world problems.
              </p>
            </div>

            <button
              type="button"
              className="projects-section__view-all"
              onClick={openModal}
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
            >
              <span>View All</span>

              <ArrowUpRight
                className="projects-section__view-all-arrow"
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>
          </header>

          <div className="projects-section__divider" />

          {/* Loading state */}
          {loading && (
            <div
              className="projects-section__status"
              role="status"
              aria-live="polite"
            >
              <span className="projects-section__spinner" />
              <p>Loading projects...</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div
              className="projects-section__status projects-section__status--error"
              role="alert"
            >
              <p>We couldn't load the projects.</p>

              <p className="projects-section__error-message">
                {error}
              </p>

              <button
                type="button"
                className="projects-section__retry-button"
                onClick={refetchProjects}
              >
                <RefreshCw size={16} />
                Try again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && projects.length === 0 && (
            <div className="projects-section__status">
              <FolderKanban size={38} strokeWidth={1.5} />

              <h3>No projects yet</h3>

              <p>
                My projects will appear here soon. Check back later!
              </p>
            </div>
          )}

          {!loading && !error && featuredProjects.length > 0 && (
            <div className="projects-grid">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id ?? project._id}
                  project={project}
                />
              ))}
            </div>
          )}

          {!loading && !error && projects.length > PROJECTS_TO_SHOW && (
            <p className="projects-section__more-hint">
              Showing {PROJECTS_TO_SHOW} of {projects.length} projects.
              Select <strong>View All</strong> to explore the full collection.
            </p>
          )}
        </div>
      </section>

      {isModalOpen && (
        <AllProjectsModal
          projects={projects}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProjectsSection;
