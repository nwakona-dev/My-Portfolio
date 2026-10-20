
import React from "react";
import {
  MapPin,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  Smartphone,
  Lightbulb,
  ArrowRight,
  Server,
  Workflow,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";
import "../styles/about.css";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const serviceVariants = {
  hidden: {
    opacity: 0,
    x: -18,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const cardHover = {
  y: -5,
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

export default function About() {
  const reduceMotion = useReducedMotion();

  const cardAnimation = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: {
          once: false,
          amount: 0.2,
        },
        variants: cardVariants,
        whileHover: cardHover,
      };

  const serviceAnimation = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: {
          once: false,
          amount: 0.3,
        },
        variants: serviceVariants,
      };

  const revealAnimation = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: {
            once: false,
            amount: 0.3,
          },
          transition: {
            duration: 0.65,
            delay,
            ease: "easeOut",
          },
        };

  return (
    <section className="portfolio-info-card" id="about">
      {/* ABOUT ME */}
      <motion.div
        className="portfolio-about"
        {...cardAnimation}
        transition={
          reduceMotion ? { duration: 0 } : { delay: 0.05 }
        }
      >
        <div className="portfolio-section-title">
          <h2>About Me</h2>

          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <p className="portfolio-about-text">
          I’m a Software Engineer passionate about designing and building practical, scalable solutions that solve real-world problems. I enjoy exploring modern technologies, writing clean and maintainable code, and turning complex ideas into reliable, user-focused applications. I value continuous learning, collaboration, and the opportunity to create software that makes a meaningful impact.
        </p>

        <div className="portfolio-about-details">
          <motion.div
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin />
            <span>Lagos, Nigeria</span>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <GraduationCap />
            <span>NIIT Ajah</span>
          </motion.div>

          <motion.div
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <BriefcaseBusiness />
            <span>Available for opportunities</span>
          </motion.div>
        </div>
      </motion.div>

      {/* WHAT I DO */}
      <motion.div
        className="portfolio-services"
        {...cardAnimation}
        transition={
          reduceMotion ? { duration: 0 } : { delay: 0.15 }
        }
      >
        <div className="portfolio-section-title" >
          <h2>What I Do</h2>

          <motion.a
          href="#skills"
            className="portfolio-arrow"
            aria-label="View services"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.1,
                    rotate: -45,
                  }
            }
            whileTap={
              reduceMotion ? undefined : { scale: 0.92 }
            }
            transition={{ duration: 0.25 }}
          >
            <ArrowRight />
          </motion.a>
        </div>

        <div className="portfolio-service-list">
          {/* WEB DEVELOPMENT */}
          <motion.div
            className="portfolio-service"
            {...serviceAnimation}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.35, delay: 0.05 }
            }
            whileHover={reduceMotion ? undefined : { x: 5 }}
          >
            <motion.div
              className="portfolio-service-icon"
              whileHover={
                reduceMotion
                  ? undefined
                  : { rotate: -8, scale: 1.08 }
              }
            >
              <Code2 />
            </motion.div>

            <div>
              <h3>Web Development</h3>
              <p>React, Spring Boot, MySQL</p>
            </div>
          </motion.div>

          {/* MOBILE DEVELOPMENT */}
          <motion.div
            className="portfolio-service"
            {...serviceAnimation}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.35, delay: 0.1 }
            }
            whileHover={reduceMotion ? undefined : { x: 5 }}
          >
            <motion.div
              className="portfolio-service-icon"
              whileHover={
                reduceMotion
                  ? undefined
                  : { rotate: -8, scale: 1.08 }
              }
            >
              <Smartphone />
            </motion.div>

            <div>
              <h3>Mobile Development</h3>
              <p>React Native, Expo</p>
            </div>
          </motion.div>

          {/* BACKEND DEVELOPMENT */}
          <motion.div
            className="portfolio-service"
            {...serviceAnimation}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.35, delay: 0.15 }
            }
            whileHover={reduceMotion ? undefined : { x: 5 }}
          >
            <motion.div
              className="portfolio-service-icon"
              whileHover={
                reduceMotion
                  ? undefined
                  : { rotate: -8, scale: 1.08 }
              }
            >
              <Server />
            </motion.div>

            <div>
              <h3>Backend Development</h3>
              <p>Java, Spring Boot, APIs</p>
            </div>
          </motion.div>

          {/* DEVOPS */}
          <motion.div
            className="portfolio-service"
            {...serviceAnimation}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.35, delay: 0.2 }
            }
            whileHover={reduceMotion ? undefined : { x: 5 }}
          >
            <motion.div
              className="portfolio-service-icon"
              whileHover={
                reduceMotion
                  ? undefined
                  : { rotate: 8, scale: 1.08 }
              }
            >
              <Workflow />
            </motion.div>

            <div>
              <h3>DevOps</h3>
              <p>Git/GitHub, Docker, Jenkins, Kubernetes</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* QUOTE */}
      <motion.div
        className="portfolio-quote"
        {...cardAnimation}
        transition={
          reduceMotion ? { duration: 0 } : { delay: 0.25 }
        }
      >
        <motion.span
          className="portfolio-quote-mark"
          {...revealAnimation(0.1)}
        >
          //
        </motion.span>

        <motion.h2 {...revealAnimation(0.2)}>
          Turning
          <br />
          <strong>Ideas</strong>
          <br />
          Into
          <br />
          Reality
        </motion.h2>

        <motion.span
          className="portfolio-quote-line"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.7,
            delay: 0.35,
          }}
          style={{ transformOrigin: "left" }}
        />

        
{/* METALLIC WAVE ARTWORK */}

<motion.img
  src="/wave1.png"
  alt=""
  aria-hidden="true"
  className="portfolio-quote-art"
  animate={
    reduceMotion
      ? {}
      : {
          y: [0, -5, 0],
          rotate: [-3, -1, -3],
          scale: [1, 1.02, 1],
        }
  }
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
</motion.div>
</section>
);
}

