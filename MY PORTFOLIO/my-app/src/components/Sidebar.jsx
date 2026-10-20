    import { useEffect, useState } from 'react';

    import {
    House,
    UserRound,
    Code2,
    BriefcaseBusiness,
    GraduationCap,
    FileText,
    Mail,
    } from 'lucide-react';

    import '../styles/sidebar2.css';

    const navItems = [
    {
        id: 'home',
        label: 'Home',
        icon: House,
    },
    {
        id: 'about',
        label: 'About',
        icon: UserRound,
    },
    {
        id: 'skills',
        label: 'Skills',
        icon: Code2,
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: BriefcaseBusiness,
    },
    {
        id: 'experience',
        label: 'Experience',
        icon: GraduationCap,
    },
    {
        id: 'contact',
        label: 'Contact',
        icon: Mail,
    },
    ];

    export const Sidebar = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

        const observer = new IntersectionObserver(
        (entries) => {
            const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
                (a, b) =>
                b.intersectionRatio - a.intersectionRatio
            )[0];

            if (visibleSection) {
            setActiveSection(
                visibleSection.target.id
            );
            }
        },
        {
            threshold: [0.2, 0.4, 0.6],
            rootMargin: '-20% 0px -50% 0px',
        }
        );

        sections.forEach((section) => {
        observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const handleNavigation = (id) => {
        const section = document.getElementById(id);

        if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        setActiveSection(id);
        }
    };

    return (
        <aside className="floating-sidebar">

        {/* Logo */}
        <button
            className="sidebar-logo"
            onClick={() => handleNavigation('home')}
            aria-label="Go to home"
        >
            <img
            src="/logo2.png"
            alt="Nwakona Emmanuel"
            className="sidebar-logo-image"
            />
        </button>

        {/* Navigation */}
        <nav
            className="sidebar-navigation"
            aria-label="Main navigation"
        >
            {navItems.map(
            ({ id, label, icon: Icon }) => {
                const isActive =
                activeSection === id;

                return (
                <button
                    key={id}
                    className={`sidebar-item ${
                    isActive ? 'active' : ''
                    }`}
                    onClick={() =>
                    handleNavigation(id)
                    }
                    aria-label={label}
                    aria-current={
                    isActive ? 'page' : undefined
                    }
                >
                    <span className="sidebar-icon">
                    <Icon
                        size={19}
                        strokeWidth={1.8}
                    />
                    </span>

                    <span className="sidebar-label">
                    {label}
                    </span>

                    {isActive && (
                    <span className="sidebar-active-indicator" />
                    )}
                </button>
                );
            }
            )}
        </nav>

        </aside>
    );
};

    export default Sidebar;