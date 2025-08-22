import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMenu, FiX, FiMail, FiHome, FiUser, FiCode, FiSend } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

// Accept footerRef as a prop
const Header = ({ footerRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredNav, setHoveredNav] = useState(null);

    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
    const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const openContactForm = () => setContactFormOpen(true);
    const closeContactForm = () => setContactFormOpen(false);

    // Navigation handlers
    const handleNavigation = (item) => {
        switch (item) {
            case 'Home':
                // Refresh the page
                window.location.reload();
                break;
            case 'About':
                // Smooth scroll to the footer using the prop
                if (footerRef && footerRef.current) {
                    footerRef.current.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'Projects':
                // Open GitHub in a new tab
                window.open('https://github.com/saificode123', '_blank');
                break;
            case 'Contact':
                // Open Gmail compose with pre-filled email
                window.location.href = 'https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrdlWJjSKjcwfBvZSJxpgTcWFvJjRTjrzqdsWSwsSGbvdLlSgdRKvbDbhXGHhjfKVNMJfg';
                break;
            default:
                break;
        }
    };
    
    const navItems = [
        { name: 'Home', icon: <FiHome /> },
        { name: 'About', icon: <FiUser /> },
        { name: 'Projects', icon: <FiCode /> },
        { name: 'Contact', icon: <FiSend /> },
    ];

    const socialLinks = [
        { Icon: FiGithub, href: 'https://github.com/saificode123', label: 'GitHub' },
        { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/saif-ur-rehman-b65243272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ', label: 'LinkedIn' },
        { Icon: FiInstagram, href: 'https://www.instagram.com/saifur_rehman1?igsh=MTdocDB0NHJ3a3V0Nw== ', label: 'Instagram' }
    ];

    return (
        <>
            <motion.header
                style={{
                    opacity: headerOpacity,
                    backdropFilter: `blur(${headerBlur}px)`,
                }}
                className={`fixed w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-white/80 dark:bg-gray-900/80 shadow-2xl shadow-violet-500/10 border-b border-white/20'
                        : 'bg-transparent'
                }`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-purple-600/5 to-pink-600/5" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Enhanced Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 25, delay: 0.3 }}
                            className="flex items-center group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg"
                                whileHover={{
                                    rotate: 360,
                                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)"
                                }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10">QV</span>
                            </motion.div>
                            <div>
                                <motion.span
                                    className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Qubitverse
                                </motion.span>
                                <motion.div
                                    className="text-sm text-gray-500 dark:text-gray-400 font-medium"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Enhanced Navigation */}
                        <nav className="lg:flex hidden space-x-8">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.7 + index * 0.2, duration: 1.2 }}
                                    className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group cursor-pointer"
                                    onClick={() => handleNavigation(item.name)}
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
                                </motion.a>
                            ))}
                        </nav>

                        {/* social icons can be added here */}
                        <div className="md:flex hidden items-center space-x-4">
                            {socialLinks.map(({ Icon, href, label, color }, index) => (
                                <motion.a
                                    key={label}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.3 + index * 0.1, duration: 0.8 }}
                                    className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Premium CTA Button */}
                        <motion.button
                            onClick={openContactForm}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
                            className="relative px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold overflow-hidden group shadow-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 hidden md:block"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "0%" }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 flex items-center space-x-2">
                                <FiMail className="w-4 h-4" />
                                <span>Hire Us</span>
                            </span>
                            {/* Sparkle effects */}
                            <motion.div
                                className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full"
                                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                        </motion.button>
                    </div>

                    {/* Enhanced Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={toggleMenu}
                            className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-violet-600/10 transition-colors duration-300"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Enhanced Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-white/10"
                        >
                            <div className="p-6 space-y-6">
                                <nav className="space-y-3">
                                    {navItems.map((item, index) => (
                                        <motion.a
                                            key={item.name}
                                            onClick={() => {
                                                handleNavigation(item.name);
                                                toggleMenu();
                                            }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-violet-600/10 transition-colors duration-300 group cursor-pointer"
                                            whileHover={{ x: 10 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span>{item.name}</span>
                                            <motion.div
                                                className="w-2 h-2 rounded-full bg-violet-600"
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </motion.a>
                                    ))}
                                </nav>
                                <div className="border-t border-gray-200/20 pt-6">
                                    <div className="flex justify-center space-x-6 mb-6">
                                        {socialLinks.map(({ Icon, href, label, color }, index) => (
                                            <motion.a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                className={`p-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300`}
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </motion.a>
                                        ))}
                                    </div>
                                    <motion.button
                                        onClick={() => {
                                            toggleMenu();
                                            openContactForm();
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FiMail className="w-5 h-5" />
                                        <span>Get In Touch</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Render the new ContactForm component */}
            <ContactForm isOpen={contactFormOpen} onClose={closeContactForm} />
        </>
    );
};

export default Header;