
import React from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Mail,
  Download,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Zap,
} from "lucide-react";

import {
  FaGithub,
 FaLinkedinIn ,
  FaWhatsapp,
} from "react-icons/fa";

import "../styles/hero2.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background effects */}
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      {/* Workspace image */}
      <motion.div
        className="hero-workspace"
        initial={{ opacity: 0, scale: 1.04, x: 35 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <img
          src="/image2.png"
          alt="Laptop displaying code on a cinematic developer desk"
          className="workspace-image"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="hero-image-overlay" />
      <div className="hero-bottom-shade" />

      {/* Main introduction */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="hero-greeting"
          variants={itemVariants}
        >
          Hello, I'm
        </motion.p>

        <motion.h1 variants={itemVariants}>
          Nwakona <span>Emmanuel</span>
        </motion.h1>

        <motion.h2 variants={itemVariants}>
          Software Engineer
        </motion.h2>

        <motion.p
          className="hero-description"
          variants={itemVariants}
        >
          I craft elegant, scalable web and mobile applications that turn complex ideas into intuitive digital experiences, combining thoughtful design, clean architecture, and purposeful engineering.
        </motion.p>

        {/* Main actions */}
        <motion.div
          className="hero-actions"
          variants={itemVariants}
        >
          <motion.a
            href="#projects"
            className="hero-btn hero-btn-primary"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 25px rgba(225, 235, 255, 0.25)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            View My Projects
            <ArrowRight size={16} />
          </motion.a>

          <motion.a
            href="#contact"
            className="hero-btn hero-btn-secondary"
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="hero-socials"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/nwakona-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={19} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/emmanuel-nwakona-159b51337/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedinIn  size={19} />
          </motion.a>

          <motion.a
            href="https://wa.me/+2348026835314"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp size={19} />
          </motion.a>

          <motion.a
            href="mailto:nwakonae@gmail.com"
            aria-label="Email"
            title="Email"
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={19} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Floating code card */}
      <motion.div
        className="floating-card code-card"
        variants={floatingVariants}
        animate="animate"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="code-card-dots">
          <span />
          <span />
          <span />
        </div>

        <pre>
          <code>
            <span className="code-purple">const</span> build = () =&gt; {"{"}
            {"\n"}  <span className="code-purple">return</span> {"{"}
            {"\n"}    faster: <span className="code-blue">true</span>,
            {"\n"}    cleaner: <span className="code-blue">true</span>,
            {"\n"}    better: <span className="code-blue">true</span>,
            {"\n"}  {"}"}
            {"\n"}{"}"}
          </code>
        </pre>
      </motion.div>

      {/* Floating technologies card */}
      <motion.div
        className="floating-card tech-card"
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <span className="tech-card-label">Technologies</span>

        <ul>
          <li><span /> React</li>
          <li><span /> Spring Boot</li>
          <li><span /> MySQL</li>
          <li><span /> Java</li>
        </ul>
      </motion.div>

      {/* Floating mindset card */}
      <motion.div
        className="floating-card skills-card"
        animate={{ y: [0, -7, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <div className="skills-card-heading">
          <Code2 size={15} />
          <span>My mindset</span>
        </div>

        <p>"Problem Solving"</p>
        <p>"Teamwork"</p>
        <p>"Clean Code"</p>
        <p>"Continuous Learning"</p>
      </motion.div>

      {/* Right-side statistics panel */}
      <motion.aside
        className="hero-stats"
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <a
          href="/my-cv.pdf"
          className="download-cv"
          download
        >
          <Download size={14} className="download-icon"/>
          <span>Download CV</span>
        </a>

        <div className="stats-panel">
          <div className="stat-item">
            <div className="stat-icon">
              <GraduationCap size={18} />
            </div>

            <div>
              <strong>2+</strong>
              <span>Years Learning</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <BriefcaseBusiness size={18} />
            </div>

            <div>
              <strong>5+</strong>
              <span>Personal Projects</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <Code2 size={18} />
            </div>

            <div>
              <strong>10+</strong>
              <span>Technologies</span>
            </div>
          </div>

          <div className="stat-footer">
            <div className="stat-icon stat-icon-outline">
              <Zap size={18} />
            </div>

            <span>
              Always building
              <br />
              something new
            </span>
          </div>
        </div>
      </motion.aside>
    </section>
  );
}
