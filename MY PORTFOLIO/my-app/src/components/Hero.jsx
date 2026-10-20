import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Code2,
  Globe,
} from 'lucide-react';

import '../styles/hero.css';

const ease = [0.22, 1, 0.36, 1];

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

const visualVariants = {
  hidden: {
    opacity: 0,
    x: 45,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      delay: 0.2,
      ease,
    },
  },
};

const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const Hero = () => {
  return (
    <motion.section
      className="hero-section"
      id="home"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background Glows */}
      <motion.div
        className="hero-glow hero-glow-one"
        animate={{
          opacity: [0.55, 0.9, 0.55],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="hero-glow hero-glow-two"
        animate={{
          opacity: [0.4, 0.75, 0.4],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="hero-container">
        {/* LEFT: Introduction */}
        <motion.div
          className="hero-content"
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            className="hero-eyebrow"
            variants={contentVariants}
          >
            HELLO, WORLD <span>— I'M</span>
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="hero-heading"
            variants={contentVariants}
          >
            Nwakona
            <span> Emmanuel.</span>
          </motion.h1>

          {/* Professional Title */}
          <motion.h2
            className="hero-role"
            variants={contentVariants}
          >
            Software Engineer
            <span className="hero-cursor">_</span>
          </motion.h2>

          {/* Introduction */}
          <motion.p
            className="hero-description"
            variants={contentVariants}
          >
            I design and build modern, reliable digital experiences
            with clean code, thoughtful design, and practical technology.
          </motion.p>

          {/* Availability Status */}
          <motion.div
            className="hero-status"
            variants={contentVariants}
          >
            <span className="status-dot" />
            <span>Available for opportunities</span>
          </motion.div>

          {/* Professional Highlights */}
          <motion.div
            className="hero-highlights"
            variants={contentVariants}
          >
            <div className="hero-highlight">
              <span className="hero-highlight-number">01</span>

              <div>
                <strong>Clean Development</strong>
                <span>Readable, maintainable code</span>
              </div>
            </div>

            <div className="hero-highlight">
              <span className="hero-highlight-number">02</span>

              <div>
                <strong>Thoughtful Design</strong>
                <span>Interfaces built around people</span>
              </div>
            </div>
          </motion.div>

          {/* Call To Action */}
          <motion.div
            className="hero-actions"
            variants={contentVariants}
          >
            <motion.a
              href="#projects"
              className="hero-btn hero-btn-primary"
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
                ease,
              }}
            >
              Explore My Work
              <ArrowUpRight size={19} />
            </motion.a>

            <motion.a
              href="#contact"
              className="hero-btn hero-btn-secondary"
              whileHover={{
                y: -4,
                borderColor: 'rgba(53, 200, 255, 0.6)',
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.25,
                ease,
              }}
            >
              Let's Talk
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="hero-socials"
            variants={contentVariants}
          >
            <span className="hero-social-label">FIND ME ON</span>

            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              whileHover={{
                y: -4,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <Globe size={19} />
            </motion.a>

            <motion.a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              whileHover={{
                y: -4,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <span className="social-text-icon">in</span>
            </motion.a>

            <span className="hero-social-line" />

            <span className="hero-social-caption">
              Building things that matter.
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT: Developer Visual */}
        <motion.div
          className="hero-visual"
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative Orbits */}
          <motion.div
            className="hero-visual-orbit orbit-one"
            animate={{
              rotate: [0, 8, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="hero-visual-orbit orbit-two"
            animate={{
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Code Card */}
          <motion.div
            className="code-card"
            whileHover={{
              y: -6,
              rotateY: 0,
              rotateX: 0,
              scale: 1.01,
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
          >
            <div className="code-card-header">
              <div className="code-window-dots">
                <span />
                <span />
                <span />
              </div>

              <div className="code-file-name">
                <Code2 size={14} />
                <span>developer.js</span>
              </div>

              <span className="code-header-end">JS</span>
            </div>

            <div className="code-card-body">
              <div className="code-line">
                <span className="code-number">01</span>
                <span>
                  <span className="code-purple">const</span>{' '}
                  <span className="code-blue">developer</span> = {'{'}
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">02</span>
                <span className="code-indent">
                  name:{' '}
                  <span className="code-green">
                    'Nwakona Emmanuel'
                  </span>,
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">03</span>
                <span className="code-indent">
                  role:{' '}
                  <span className="code-green">
                    'Software Engineer'
                  </span>,
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">04</span>
                <span className="code-indent">
                  passion:{' '}
                  <span className="code-green">
                    'Building solutions'
                  </span>,
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">05</span>
                <span className="code-indent">
                  mindset:{' '}
                  <span className="code-green">
                    'Always learning'
                  </span>,
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">06</span>
                <span>{'};'}</span>
              </div>

              <div className="code-spacer" />

              <div className="code-line">
                <span className="code-number">08</span>
                <span>
                  <span className="code-purple">function</span>{' '}
                  <span className="code-yellow">buildFuture</span>() {'{'}
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">09</span>
                <span className="code-indent">
                  <span className="code-purple">return</span>{' '}
                  <span className="code-blue">innovation</span>;
                </span>
              </div>

              <div className="code-line">
                <span className="code-number">10</span>
                <span>{'}'}</span>
              </div>

              <div className="code-spacer" />

              <div className="code-terminal">
                <span className="terminal-symbol">❯</span>
                <span>Ready to build something great</span>
                <span className="terminal-blink">_</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card: Top */}
          <motion.div
            className="hero-float-card float-card-top"
            initial={{
              opacity: 0,
              x: 20,
              y: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: {
                delay: 1,
                duration: 0.6,
              },
              x: {
                delay: 1,
                duration: 0.6,
                ease,
              },
              y: {
                delay: 1.6,
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <span className="float-card-icon">
              <Code2 size={18} />
            </span>

            <div>
              <strong>Clean Code</strong>
              <span>Built with purpose</span>
            </div>
          </motion.div>

          {/* Floating Card: Bottom */}
          <motion.div
            className="hero-float-card float-card-bottom"
            initial={{
              opacity: 0,
              x: -20,
              y: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, 8, 0],
            }}
            transition={{
              opacity: {
                delay: 1.2,
                duration: 0.6,
              },
              x: {
                delay: 1.2,
                duration: 0.6,
                ease,
              },
              y: {
                delay: 1.8,
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <span className="float-card-indicator" />

            <div>
              <strong>Always Building</strong>
              <span>One idea at a time</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="hero-bottom"
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
          ease,
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="hero-scroll-line" />
        <span>01 / INTRODUCTION</span>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
