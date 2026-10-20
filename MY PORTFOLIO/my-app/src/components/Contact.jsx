
import React, { useState } from "react";
import {
    FiArrowUpRight,
    FiArrowRight,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiMapPin,
    FiSend,
    FiCode,
    FiCheckCircle,
    FiAlertCircle,
} from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

    import "../styles/contact.css";

    const contactInfo = {
    name: "Nwakona Emmanuel",
    role: "Software Developer",
    email: "nwakonae@gmail.com",
    location: "Nigeria",
    github: "https://github.com/nwakona-dev",
    linkedin: "https://www.linkedin.com/in/emmanuel-nwakona-159b51337/",
    };

    const initialForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
    };

    const Contact = () => {
    const [formData, setFormData] = useState(initialForm);
    const [formStatus, setFormStatus] = useState({
        type: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const shouldReduceMotion = useReducedMotion();

    const reveal = {
        hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 22,
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
        ...previous,
        [name]: value,
        }));

        if (formStatus.message) {
        setFormStatus({ type: "", message: "" });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const email = formData.email.trim();
        const subject = formData.subject.trim();
        const message = formData.message.trim();

        if (!name || !email || !subject || !message) {
        setFormStatus({
            type: "error",
            message: "Please complete all fields before submitting.",
        });
        return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
        setFormStatus({
            type: "error",
            message: "Please enter a valid email address.",
        });
        return;
        }

        setIsSubmitting(true);
        setFormStatus({ type: "", message: "" });

        try {
        const subjectText = encodeURIComponent(subject);

        const bodyText = encodeURIComponent(
            [
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            "Message:",
            message,
            ].join("\n")
        );

        const mailtoUrl =
            `mailto:${contactInfo.email}` +
            `?subject=${subjectText}&body=${bodyText}`;

        window.location.href = mailtoUrl;

        setFormStatus({
            type: "success",
            message:
            "Your email application should open with your message prepared. Please send it from there.",
        });
        } catch {
        setFormStatus({
            type: "error",
            message:
            "We couldn't prepare your email. Please contact me directly using the email link.",
        });
        } finally {
        setIsSubmitting(false);
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-heading"
        >
        <div className="contact-section__container">
            {/* CONTACT INTRODUCTION */}
            <motion.div
            className="contact-header"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            >
            <p className="contact-eyebrow">
            
                LET&apos;S CONNECT
            </p>

            <div className="contact-title-row">
                <h2 className="contact-title" id="contact-heading">
                Have a project in mind?
                <span> Let&apos;s talk</span>
                </h2>

                <span className="contact-title-line" aria-hidden="true" />
            </div>

            <p className="contact-intro">
                Have an idea, an opportunity, or a project you would like
                to discuss? I&apos;d love to hear from you. Send me a message
                and let&apos;s explore what we can build together.
            </p>
            </motion.div>

            {/* MAIN CONTACT LAYOUT */}
            <div className="contact-layout">
            {/* LEFT: CONTACT DETAILS */}
            <motion.aside
                className="contact-info"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
            >
                <div className="contact-info__top">
                <div className="contact-info__icon">
                    <FiMail size={21} aria-hidden="true" />
                </div>

                <p className="contact-info__overline">
                    GET IN TOUCH
                </p>

                <h3>
                    Let&apos;s turn your
                    <span> ideas into reality.</span>
                </h3>

                <p className="contact-info__description">
                    Whether you&apos;re looking for a developer, want to
                    collaborate, or simply want to connect, my inbox is open.
                </p>
                </div>

                <div className="contact-info__details">
                <a
                    className="contact-detail"
                    href={`mailto:${contactInfo.email}`}
                >
                    <span className="contact-detail__icon">
                    <FiMail size={17} aria-hidden="true" />
                    </span>

                    <span className="contact-detail__content">
                    <span className="contact-detail__label">
                        Email me
                    </span>
                    <span className="contact-detail__value">
                        {contactInfo.email}
                    </span>
                    </span>

                    <FiArrowUpRight
                    className="contact-detail__arrow"
                    size={16}
                    aria-hidden="true"
                    />
                </a>

                <div className="contact-detail">
                    <span className="contact-detail__icon">
                    <FiMapPin size={17} aria-hidden="true" />
                    </span>

                    <span className="contact-detail__content">
                    <span className="contact-detail__label">
                        Location
                    </span>
                    <span className="contact-detail__value">
                        {contactInfo.location}
                    </span>
                    </span>
                </div>
                </div>

                <div className="contact-socials">
                <p className="contact-socials__label">
                    FIND ME ONLINE
                </p>

                <div className="contact-socials__links">
                    <a
                    className="contact-social-link"
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my GitHub profile"
                    >
                    <FiGithub size={18} aria-hidden="true" />
                    <span>GitHub</span>
                    <FiArrowUpRight size={14} aria-hidden="true" />
                    </a>

                    <a
                    className="contact-social-link"
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my LinkedIn profile"
                    >
                    <FiLinkedin size={18} aria-hidden="true" />
                    <span>LinkedIn</span>
                    <FiArrowUpRight size={14} aria-hidden="true" />
                    </a>
                </div>
                </div>
            </motion.aside>

            {/* RIGHT: CONTACT FORM */}
            <motion.div
                className="contact-form-card"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
            >
                <div className="contact-form-card__header">
                <div>
                    <p className="contact-form-card__eyebrow">
                    SEND A MESSAGE
                    </p>

                    <h3>Tell me about your project.</h3>
                </div>

                <div className="contact-form-card__icon">
                    <FiSend size={19} aria-hidden="true" />
                </div>
                </div>

                <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                >
                <div className="contact-form__row">
                    <div className="contact-field">
                    <label htmlFor="contact-name">
                        Your name <span>*</span>
                    </label>

                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        maxLength={100}
                        required
                    />
                    </div>

                    <div className="contact-field">
                    <label htmlFor="contact-email">
                        Email address <span>*</span>
                    </label>

                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        maxLength={254}
                        required
                    />
                    </div>
                </div>

                <div className="contact-field">
                    <label htmlFor="contact-subject">
                    Subject <span>*</span>
                    </label>

                    <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={150}
                    required
                    />
                </div>

                <div className="contact-field">
                    <label htmlFor="contact-message">
                    Your message <span>*</span>
                    </label>

                    <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me a little about your idea, project, or opportunity..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={5000}
                    required
                    />
                </div>

                {formStatus.message && (
                    <div
                    className={`contact-form-status contact-form-status--${formStatus.type}`}
                    role="status"
                    aria-live="polite"
                    >
                    {formStatus.type === "success" ? (
                        <FiCheckCircle size={17} aria-hidden="true" />
                    ) : (
                        <FiAlertCircle size={17} aria-hidden="true" />
                    )}

                    <span>{formStatus.message}</span>
                    </div>
                )}

                <button
                    className="contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                >
                    <span>
                    {isSubmitting ? "Preparing message..." : "Send message"}
                    </span>

                    <FiArrowRight size={17} aria-hidden="true" />
                </button>

                <p className="contact-form__privacy">
                    Your details are used to prepare your message for email.
                </p>
                </form>
            </motion.div>
            </div>

            {/* FOOTER */}
            <footer className="portfolio-footer">
            <a className="portfolio-footer__brand" href="#home">
                <span className="portfolio-footer__logo">
                
                <img
                    src="/logo2.png"
                    alt="Nwakona Emmanuel"
                    className="sidebar-logo-image"
                />
                </span>

                <span className="portfolio-footer__brand-text">
                <strong>{contactInfo.name}</strong>
                <span>{contactInfo.role}</span>
                </span>
            </a>

            <p className="portfolio-footer__copyright">
                © {currentYear} {contactInfo.name}. All rights reserved.
            </p>

            <a className="portfolio-footer__top" href="#home">
                <span>Back to top</span>
                <FiArrowUpRight size={15} aria-hidden="true" />
            </a>
            </footer>
        </div>
        </section>
    );
};

export default Contact;
