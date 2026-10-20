import React from "react";
import {
  Code2,
  Server,
  Workflow,
  Wrench,
} from "lucide-react";

import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaNpm,
} from "react-icons/fa";

import {
  SiVite,
  SiSpringboot,
  SiNodedotjs,
  SiDocker,
  SiGithubactions,
  SiApachemaven,
  SiKubernetes,
  SiJenkins,
} from "react-icons/si";

import { motion, useReducedMotion } from "framer-motion";
import "../styles/skills.css";

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      {
        name: "React",
        icon: FaReact,
        className: "react",
      },
      {
        name: "HTML5",
        icon: FaHtml5,
        className: "html",
      },
      {
        name: "CSS3",
        icon: FaCss3Alt,
        className: "css",
      },
      {
        name: "JavaScript",
        icon: FaJs,
        className: "javascript",
      },
      {
        name: "React Native",
        icon: FaReact,
        className: "react",
      },
    ],
  },

  {
    title: "Backend",
    icon: Server,
    skills: [
      {
        name: "Java",
        icon: FaJava,
        className: "java",
      },
      {
        name: "Spring Boot",
        icon: SiSpringboot,
        className: "springboot",
      },
      {
        name: "Maven",
        icon: SiApachemaven,
        className: "maven",
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        className: "nodejs",
      },
    ],
  },

  {
    title: "DevOps",
    icon: Workflow,
    skills: [
      {
        name: "Docker",
        icon: SiDocker,
        className: "docker",
      },
      {
        name: "Kubernetes",
        icon: SiKubernetes,
        className: "kubernetes",
      },
      {
        name: "Jenkins",
        icon: SiJenkins,
        className: "jenkins",
      },
      {
        name: "GitHub Actions",
        icon: SiGithubactions,
        className: "github-actions",
      },
    ],
  },

  {
    title: "Developer Tools",
    icon: Wrench,
    skills: [
      {
        name: "Git",
        icon: FaGitAlt,
        className: "git",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        className: "github",
      },
      {
        name: "npm",
        icon: FaNpm,
        className: "npm",
      },
      {
        name: "Vite",
        icon: SiVite,
        className: "vite",
      },
    ],
  },
];

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -18,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const groupVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
      },
    },
  };

  const skillVariants = {
    hidden: {
      opacity: 0,
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
    <motion.section
      className="portfolio-skills"
      id="skills"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.15,
      }}
    >
      {/* Section heading */}
      <motion.div
        className="portfolio-skills-header"
        variants={headerVariants}
      >
        <div className="portfolio-skills-heading">
            <h2>Skills & Technologies</h2>
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
            style={{ transformOrigin: "left" }}
          />

          
        </div>

        <motion.span
          className="portfolio-skills-caption"
          whileHover={
            shouldReduceMotion
              ? {}
              : { letterSpacing: "0.24em" }
          }
          transition={{ duration: 0.25 }}
        >
          MY TOOLKIT
        </motion.span>
      </motion.div>

      {/* Skill group cards */}
      <div className="portfolio-skills-grid">
        {skillGroups.map((group, index) => {
          const GroupIcon = group.icon;

          return (
            <motion.article
              className="portfolio-skill-group"
              key={group.title}
              style={{ "--group-index": index }}
              variants={groupVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -6,
                      transition: {
                        duration: 0.28,
                        ease: "easeOut",
                      },
                    }
              }
            >
              {/* Group heading */}
              <div className="portfolio-skill-group-header">
                <motion.span
                  className="portfolio-skill-group-icon"
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotate: -8,
                          scale: 1.08,
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  <GroupIcon
                    size={15}
                    strokeWidth={1.7}
                  />
                </motion.span>

                <h3>{group.title}</h3>

                <span className="portfolio-skill-group-count">
                  {String(group.skills.length).padStart(2, "0")}
                </span>
              </div>

              {/* Individual skills */}
              <div className="portfolio-skill-list">
                {group.skills.map((skill) => {
                  const SkillIcon = skill.icon;

                  return (
                    <motion.div
                      className="portfolio-skill-item"
                      key={skill.name}
                      title={skill.name}
                      variants={skillVariants}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              y: -4,
                              scale: 1.035,
                              transition: {
                                duration: 0.2,
                                ease: "easeOut",
                              },
                            }
                      }
                    >
                      <motion.span
                        className={`portfolio-skill-item-icon ${skill.className}`}
                        whileHover={
                          shouldReduceMotion
                            ? {}
                            : {
                                scale: 1.14,
                                rotate:
                                  skill.className === "react"
                                    ? 12
                                    : 0,
                              }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 14,
                        }}
                      >
                        <SkillIcon />
                      </motion.span>

                      <span className="portfolio-skill-name">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Skills;
