
    import React from "react";
    import {
    GraduationCap,
    BookOpen,
    MapPin,
    CalendarDays,
    Sparkles,
    Code2,
    CheckCircle2,
    } from "lucide-react";
    import { motion, useReducedMotion } from "framer-motion";

    import "../styles/experience.css";

    const education = {
    institution: "NIIT",
    qualification: "Diploma in Software Engineering",
    location: "Ajah, Lagos",
    startDate: "September 2024",
    endDate: "",
    status: "Diploma Certificate",
    description:
        "Earned a Diploma in Software Engineering from NIIT, gaining a strong foundation in programming, application development, software engineering principles, and problem-solving. Developed practical technical skills to design, build, and maintain software applications.",
    };

    const Experience = () => {
    const shouldReduceMotion = useReducedMotion();

    const reveal = {
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

    const cardReveal = {
        hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 28,
        },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
        },
    };

    const headingLine = {
        hidden: { scaleX: 0 },
        visible: {
        scaleX: 1,
        transition: {
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
        },
    };

    const columnVariants = {
        hidden: {},
        visible: {
        transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.15,
        },
        },
    };

    const hoverAnimation = shouldReduceMotion
        ? undefined
        : {
            y: -5,
            transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
            },
        };

    return (
        <section
        className="experience-section"
        id="experience"
        aria-labelledby="experience-heading"
        >
        <div className="experience-section__container">
            {/* Main section heading */}
            <motion.div
            className="experience-section__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={reveal}
            >
            <span className="experience-section__eyebrow">
                <Sparkles size={14} />
                MY JOURNEY
            </span>

            {/* Main title and animated line */}
            <div className="experience-main-title-row">
                <h2
                className="experience-section__title"
                id="experience-heading"
                >
                Education <span>& Experience</span>
                </h2>

                <motion.span
                className="experience-main-heading-line"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                variants={headingLine}
                aria-hidden="true"
                />
            </div>

            <p className="experience-section__intro">
                My journey in software engineering has shaped my
                technical foundation, strengthened my problem-solving
                skills, and continues to inspire me to build meaningful
                software solutions.
            </p>
            </motion.div>

            {/* Education and experience layout */}
            <div className="experience-section__layout">
            {/* Education column */}
            <motion.div
                className="experience-column"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={columnVariants}
            >
                <motion.div
                className="experience-column__heading"
                variants={reveal}
                >
                <span className="experience-column__icon">
                    <GraduationCap size={23} />
                </span>

                <div className="experience-column__heading-content">
                    <div className="experience-column__title-row">
                    <h3>Education</h3>

                    </div>

                    <p>My academic foundation</p>
                </div>
                </motion.div>

                <motion.div
                className="experience-timeline"
                variants={cardReveal}
                >
                <motion.article
                    className="experience-card"
                    whileHover={hoverAnimation}
                >
                    <span className="experience-card__marker" />

                    <div className="experience-card__top">
                    <span className="experience-card__type">
                        <BookOpen size={15} />
                        Academic Qualification
                    </span>

                    <span className="experience-card__status">
                        <span className="experience-card__status-dot" />
                        {education.status}
                    </span>
                    </div>

                    <div className="experience-card__institution">
                    <span className="experience-card__institution-icon">
                        <GraduationCap size={27} />
                    </span>

                    <div>
                        <h4>{education.qualification}</h4>
                        <h5>{education.institution}</h5>
                    </div>
                    </div>

                    <div className="experience-card__meta">
                    <span>
                        <CalendarDays size={15} />
                        {education.startDate}
                        {education.endDate
                        ? ` – ${education.endDate}`
                        : ""}
                    </span>

                    <span>
                        <MapPin size={15} />
                        {education.location}
                    </span>
                    </div>

                    <p className="experience-card__description">
                    {education.description}
                    </p>

                    <div className="experience-card__bottom">
                    <span className="experience-card__bottom-icon">
                        <CheckCircle2 size={16} />
                    </span>

                    <span>
                        Built a foundation for continuous professional growth
                    </span>
                    </div>
                </motion.article>
                </motion.div>
            </motion.div>

            {/* Experience column */}
            <motion.div
                className="experience-column"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={columnVariants}
            >
                <motion.div
                className="experience-column__heading"
                variants={reveal}
                >
                <span className="experience-column__icon">
                    <Code2 size={22} />
                </span>

                <div className="experience-column__heading-content">
                    <div className="experience-column__title-row">
                    <h3>Experience</h3>

                    </div>

                    <p>My professional growth</p>
                </div>
                </motion.div>

                <motion.div
                className="experience-timeline"
                variants={cardReveal}
                >
                <motion.article
                    className="experience-card experience-card--journey"
                    whileHover={hoverAnimation}
                >
                    <span className="experience-card__marker" />

                    <div className="experience-card__journey-icon">
                    <Code2 size={25} />
                    </div>

                    <span className="experience-card__type">
                    Career Development
                    </span>

                    <h4>Growing as a Software Developer</h4>

                    <p className="experience-card__description">
                    I apply my technical knowledge to develop software
                    solutions, strengthen my skills, solve problems, and
                    continue growing through practical projects and
                    real-world opportunities.
                    </p>

                    <div className="experience-card__journey-tags">
                    <span>Software Development</span>
                    <span>Continuous Learning</span>
                    <span>Problem Solving</span>
                    </div>
                </motion.article>
                </motion.div>

                <motion.div
                className="experience-section__note"
                variants={reveal}
                >
                <span className="experience-section__note-icon">
                    <Sparkles size={18} />
                </span>

                <p>
                    <strong>Always building. Always improving.</strong>
                    <span>
                    I look forward to collaborating with teams, contributing
                    to meaningful projects, and creating software that
                    makes a difference.
                    </span>
                </p>
                </motion.div>
            </motion.div>
            </div>
        </div>
        </section>
    );
    };

    export default Experience;
