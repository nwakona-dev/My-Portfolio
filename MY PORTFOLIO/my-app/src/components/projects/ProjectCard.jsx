import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  ArrowUpRight,
  ExternalLink,
  Layers3,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Spring Boot backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

// Resolve image URLs returned by the backend
const getProjectImageUrl = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") {
    return "";
  }

  const trimmedUrl = imageUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  // Keep absolute URLs unchanged
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  // Handle relative backend paths, e.g. /uploads/projects/image.webp
  return `${API_BASE_URL.replace(/\/+$/, "")}/${trimmedUrl.replace(
    /^\/+/,
    ""
  )}`;
};

const ProjectCard = ({ project }) => {
  const {
    title,
    description,
    imageUrl,
    technologies,
    githubUrl,
    liveUrl,
  } = project;

  const shouldReduceMotion = useReducedMotion();

  const resolvedImageUrl = getProjectImageUrl(imageUrl);

  // Support technologies as an array or comma-separated string
  const technologyList = Array.isArray(technologies)
    ? technologies
    : typeof technologies === "string"
      ? technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean)
      : [];

  const projectUrl = liveUrl || githubUrl;

  // Card entrance animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const contentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.article
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.15,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
              transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }
      }
      style={{
        willChange: "transform, opacity",
      }}
    >
      {/* Project image */}
      <div className="project-card__image-wrapper">
        {resolvedImageUrl && (
          <motion.img
            className="project-card__image"
            src={resolvedImageUrl}
            alt={`${title || "Project"} project preview`}
            loading="lazy"
            onError={(event) => {
              console.error(
                "Failed to load project image:",
                event.currentTarget.src
              );

              // Hide the broken image and reveal the placeholder
              event.currentTarget.style.display = "none";

              const placeholder =
                event.currentTarget.parentElement?.querySelector(
                  ".project-card__image-placeholder"
                );

              placeholder?.classList.remove(
                "project-card__image-placeholder--hidden"
              );

              placeholder?.classList.add(
                "project-card__image-placeholder--visible"
              );
            }}
            whileHover={
              shouldReduceMotion ? undefined : { scale: 1.045 }
            }
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}

        <div
          className={`project-card__image-placeholder ${
            resolvedImageUrl
              ? "project-card__image-placeholder--hidden"
              : "project-card__image-placeholder--visible"
          }`}
          aria-hidden="true"
        >
          <span className="project-card__placeholder-icon">
            <Layers3 size={32} strokeWidth={1.2} />
          </span>

          <span className="project-card__placeholder-label">
            PROJECT PREVIEW
          </span>

          <span className="project-card__placeholder-line" />
        </div>

        <div className="project-card__image-overlay" />

        <span
          className="project-card__index"
          aria-hidden="true"
        >
          PROJECT
        </span>

        {projectUrl && (
          <motion.a
            className="project-card__details-link"
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} project`}
            whileHover={
              shouldReduceMotion ? undefined : { scale: 1.06 }
            }
            whileTap={
              shouldReduceMotion ? undefined : { scale: 0.96 }
            }
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={20} />
          </motion.a>
        )}
      </div>

      {/* Project information */}
      <motion.div
        className="project-card__content"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.15,
        }}
      >
        {/* Title */}
        <motion.div
          className="project-card__heading"
          variants={itemVariants}
        >
          <span className="project-card__accent-line" />

          <h3 className="project-card__title">{title}</h3>
        </motion.div>

        {/* Description */}
        <motion.p
          className="project-card__description"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* Technologies */}
        {technologyList.length > 0 && (
          <motion.div
            className="project-card__technology-area"
            variants={itemVariants}
          >
            <span className="project-card__eyebrow">
              BUILT WITH
            </span>

            <ul
              className="project-card__technologies"
              aria-label="Technologies used"
            >
              {technologyList.map((technology, index) => (
                <li
                  key={`${technology}-${index}`}
                  className="project-card__technology"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Project links */}
        {(githubUrl || liveUrl) && (
          <motion.div
            className="project-card__actions"
            variants={itemVariants}
          >
            {/* GitHub link */}
            {githubUrl && (
              <motion.a
                className="project-card__action project-card__action--github"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} source code on GitHub`}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -2 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.97 }
                }
              >
                <FaGithub size={17} aria-hidden="true" />

                <span>Source Code</span>

                <ArrowUpRight
                  className="project-card__action-arrow"
                  size={15}
                  aria-hidden="true"
                />
              </motion.a>
            )}

            {/* Live demo link */}
            {liveUrl && (
              <motion.a
                className="project-card__action project-card__action--live"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -2 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.97 }
                }
              >
                <span>Live Demo</span>

                <ExternalLink
                  size={15}
                  aria-hidden="true"
                />
              </motion.a>
            )}
          </motion.div>
        )}

        {/* Card footer */}
        <motion.div
          className="project-card__footer"
          variants={itemVariants}
        />
      </motion.div>
    </motion.article>
  );
};

export default ProjectCard;
