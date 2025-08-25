import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

// Assuming Header and ContactForm are in the same directory or accessible via their paths
import Header from './Header';
// Ensure Header.jsx or Header.tsx exists
import ContactForm from './ContactForm'; // Ensure ContactForm.jsx or ContactForm.tsx exists

import { 
  ChevronDown, Play, ArrowRight, Sparkles, Code, Zap, 
  Github, ExternalLink, Star, GitFork, Calendar, 
  Mail, Phone, MapPin, Linkedin, Twitter, Instagram,
  Send, Heart, ArrowUp
} from 'lucide-react';

const ExtendedPortfolio = () => {
  // State to control the visibility of the contact form
  const [contactFormOpen, setContactFormOpen] = useState(false);
  // State to track if the page has been scrolled
  const [scrolled, setScrolled] = useState(false);
  // State to track mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // State to control the visibility of the back-to-top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  // State for the mobile menu (added for completeness as it was declared in the original snippet)
  const [isOpen, setIsOpen] = useState(false);
  // Framer Motion scroll hooks for hero section animations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  // Refs for scroll animations for sections
  const projectsRef = useRef(null);
  const footerRef = useRef(null);
  // useInView hook to trigger animations when sections enter view
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  // Ref for the Spline container to get its position for animations
  // Effect to handle scroll event for header and back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Function to toggle mobile menu (if used in Header or elsewhere)
  const toggleMenu = () => setIsOpen(!isOpen);
  // Functions to open and close the contact form
  const openContactForm = () => setContactFormOpen(true);
  const closeContactForm = () => setContactFormOpen(false);

  // Sample GitHub projects data (mock data for demonstration)
  const githubProjects = [
    {
      id: 1,
      name: "Human Ai Clone",
      description: "Your Human Clone AI code is a FastAPI backend that personalizes an AI by ingesting diverse user data (documents, social media), creating embeddings for knowledge retrieval, and powering a contextual chat with RAG and optional OpenAI polishing.",
      tech: ["React", "Python", "ChromoDB", "OpenAI"],
      stars: 124,
      forks: 32,
      updated: "2025-08-15",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      liveUrl: "https://main.d29kw4aqkj08x3.amplifyapp.com/",
      githubUrl: "https://github.com/saificode123/my-human-ai",
      featured: true
    },
    {
      id: 2,
      name: "Skilled Score",
      description: "Full Stack Developer skilled in building scalable, modern web apps with frontend and backend expertise.",
      tech: ["React.js", "Node.js", "Express.js"],
      stars: 89,
      forks: 21,
      updated: "2024-01-10",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=400&fit-crop",
      liveUrl: "https://skilledscore.com/",
      githubUrl: "https://github.com/skillscore",
      featured: true
    },
    {
      id: 3,
      name: "visabridge.ai",
      description: "VisaBridge | AI-driven platform that analyzes your CV and profile to recommend ideal countries for migration—based on visa chances, job prospects, and lifestyle fit.",
      tech: ["React.js", "Express", "MySQL", "Socket.io"],
      stars: 67,
      forks: 15,
      updated: "2024-01-08",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit-crop",
      liveUrl: "https://dev.visabridge.ai/login",
      githubUrl: "https://github.com/visabridge",
      featured: true
    },
    {
      id: 4,
      name: "Kangaroo Ventures",
      description: "Kangaroo Ventures | Virtual offices and business consultancy to help entrepreneurs launch and scale in the U.S",
      tech: ["React", "Express.js"],
      stars: 156,
      forks: 43,
      updated: "2024-01-12",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit-crop",
      liveUrl: "https://www.kangaroo.ventures/",
      githubUrl: "https://github.com/kangaroo-ventures",
      featured: true
    },
    {
      id: 5,
      name: "Weather App PWA",
      description: "Progressive Web App for weather forecasting with offline capabilities, location tracking, and push notifications.",
      tech: ["PWA", "JavaScript", "Weather API", "Service Worker"],
      stars: 45,
      forks: 12,
      updated: "2024-01-05",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit-crop",
      liveUrl: "https://weather-pwa-demo.com",
      githubUrl: "https://github.com/username/weather-pwa",
      featured: false
    },
    {
      id: 6,
      name: "Blog CMS",
      description: "Content Management System for blogs with rich text editor, SEO optimization, and multi-author support.",
      tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      stars: 78,
      forks: 19,
      updated: "2024-01-03",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit-crop",
      liveUrl: "https://blog-cms-demo.com",
      githubUrl: "https://github.com/username/blog-cms",
      featured: false
    }
  ];
  // Mouse parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  // Effect hook for Spline animation based on mouse position

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between child animations
        delayChildren: 0.5, // Initial delay before child animations start
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring', // Spring animation for a natural feel
        stiffness: 50,
        damping: 15,
        duration: 1.2,
      },
   
    },
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 font-inter"> 

      {/* Header Component */}
      {/* Contact Form Modal - Conditionally rendered */}
      <ContactForm isOpen={contactFormOpen} onClose={closeContactForm} />
      <Header footerRef={footerRef} scrolled={scrolled} toggleMenu={toggleMenu} openContactForm={openContactForm} />

    
      {/* Hero Section */}
      {/* Updated hero section to match Spline background perfectly */}
      <section
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 10% 30%, rgba(48,12,63,1) 0%, rgba(7,3,15,1) 40%, rgba(0,0,0,1) 100%)',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Animated blue blur circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
      
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 left-10 xs:top-20 xs:left-20 w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
 
          />
          {/* Animated green blur circle */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
        
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 right-10 xs:bottom-20 xs:right-20 w-40 h-40 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-green-500/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            }}
          />
          
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent">
            <div 
              className="h-full w-full opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col xl:flex-row items-center justify-between min-h-screen px-4 xs:px-6 sm:px-10 lg:px-24 py-12 xs:py-16 sm:py-20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 xl:mb-0 mb-16 max-w-4xl"
          >
            {/* Tagline */}
 
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-300" /> 
              <span className="text-sm font-medium text-purple-200">Qubitverse Studios</span> 
   
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 xs:mb-8 leading-[1.1] xs:leading-[0.9]"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-green-200 bg-clip-text text-transparent">
                Building the
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                Future
              </span>
 
              <br />
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                of Web3
              </span>
            </motion.h1>

            {/* Sub-heading/Description */}
          
            <motion.p
              variants={itemVariants}
              className="text-sm xs:text-base md:text-lg lg:text-xl text-purple-100/90 max-w-full xs:max-w-3xl mb-6 xs:mb-12 leading-relaxed" 
            >
              I deliver robust, production-ready websites and web apps with speed and precision. Every project is backed by clean code, clear communication, and a commitment to excellence.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              {/* Corrected onClick handler for "Start Your Project" button */}
    
              <motion.button
                onClick={openContactForm} // This will now correctly open the contact form 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl font-semibold text-white text-lg" 
              >
                <span className="flex items-center gap-2">
 
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
      
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white/90 transition-colors"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
       
          </motion.div>
        </motion.div>
        {/* Spline 3D Model */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Spline
            scene="https://prod.spline.design/UcSFzjiXfUKc9V0B/scene.splinecode"
            className="w-full h-full"
            style={{
              width: '100%',
              height: '100%',
              transform: 'translateZ(0) scale(1)',
              opacity: 1,
              mixBlendMode: 'screen', // try 'normal' | 'screen' | 'overlay' to match lighting
              pointerEvents: 'none',
              background: 'transparent',
            }}
          />
        </div>
        {/* Vignette + grain to hide seams and match lighting */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 60%, rgba(100,30,140,0.08) 0%, transparent 25%), linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0) 30%)',
            mixBlendMode: 'multiply',
            opacity: 0.9,
          }}
        />
      </section>

      {/* GitHub Projects Section */}
      <section ref={projectsRef} className="relative py-24 bg-gradient-to-b from-black to-slate-950"> 
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" /> 
        
        <div className="relative z-10 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
  
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Section Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Github className="w-4 h-4 text-purple-300" /> 
              <span className="text-sm font-medium text-purple-200">Featured Projects</span> 
            </div>
            
            {/* Section Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-green-200 bg-clip-text text-transparent">
     
                My GitHub
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Portfolio
              </span>
          
            </h2>
            
            {/* Section Description */}
            <p className="text-lg text-purple-100/80 max-w-3xl mx-auto"> 
              Explore my latest projects showcasing modern web technologies, 
              clean architecture, and innovative solutions.
            </p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-12">
            {githubProjects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.id}
              
                variants={projectCardVariants}
                initial="hidden"
                animate={projectsInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
          
                <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                    
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
 
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                        <Star className="w-3 h-3 text-yellow-400" />
                
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                        <GitFork className="w-3 h-3 text-purple-400" />
          
                        {project.forks}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
     
                  <div className="p-4 xs:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors"> 
                        {project.name}
           
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(project.updated).toLocaleDateString()}
          
                      </div>
                    </div>
                    
                    <p className="text-sm xs:text-base text-gray-300 mb-3 xs:mb-4 line-clamp-3">
                      {project.description}
   
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
            
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30" 
                        >
   
                          {tech}
                        </span>
                      ))}
                    </div>

           
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.liveUrl}
                    
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                 
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-green-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all" 
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
    
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
            
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/20 transition-all border border-white/20"
                      >
                        <Github className="w-4 h-4" />
                        Code
                     
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

         
          {/* Other Projects Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
            {githubProjects.filter(project => !project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectCardVariants}
                initial="hidden"
 
                animate={projectsInView ? "visible" : "hidden"}
                transition={{ delay: (index + 2) * 0.1 }}
                className="group relative"
              >
                <div className="h-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                 
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
   
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-4">
                    
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors"> 
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </div>
                    </div>
   
                    
                    <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                      {project.description}
                    </p>

                 
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                 
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs" 
                        >
                          {tech}
                        </span>
            
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={project.liveUrl}
  
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-600 rounded text-white text-xs font-medium hover:bg-purple-700 transition-colors" 
                
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </a>
                     
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-white/10 rounded text-white text-xs font-medium hover:bg-white/20 transition-colors border border-white/20"
                      >
                        <Github className="w-3 h-3" />
                        Code
              
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

  
          {/* View All Projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/saificode123"
              target="_blank"
             
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl font-semibold text-white text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all" 
            >
              <Github className="w-6 h-6" />
       
              View All Projects on GitHub
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef} className="relative bg-gradient-to-t from-black via-slate-950 to-indigo-950 border-t border-white/10"> 
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-green-900/10" /> 
        
        <div className="relative z-10 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-green-600 rounded-xl flex items-center justify-center"> 
       
                  <span className="text-2xl font-bold text-white">Q</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Qubitverse</h3>
                  <p className="text-purple-300 text-sm">Studios</p> 
             
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Building the future of web development with cutting-edge technologies, 
                premium design, and exceptional user experiences.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/saificode123", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/saif-ur-rehman-b65243272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ", label: "LinkedIn" },
                  { icon: Instagram, href: "https://www.instagram.com/saifur_rehman1?igsh=MTdocDB0NHJ3a3V0Nw== ", label: "Instagram" }
                ].map((social) => (
                  <motion.a
               
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
         
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-600/50 transition-all duration-300 border border-white/10 hover:border-purple-500/50" 
                    aria-label={social.label}
                  >
             
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
   
              initial={{ opacity: 0, y: 30 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[ "Projects", "Contact"].map((link) => (
      
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group" 
               
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      {link}
                    </a>
                  </li>
      
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={footerInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
  <div className="space-y-4">
    {/* First Email */}
    <div className="flex items-center gap-3 text-gray-300">
      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"> 
        <Mail className="w-4 h-4 text-purple-400" /> 
      </div>
      <span className="text-sm">urrehmansaif406@gmail.com</span>
    </div>
    {/* Second Email */}
    <div className="flex items-center gap-3 text-gray-300">
      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"> 
        <Mail className="w-4 h-4 text-purple-400" /> 
      </div>
      <span className="text-sm">musharafshah123@gmail.com</span>
    </div>

    {/* First Phone Number */}
    <div className="flex items-center gap-3 text-gray-300">
      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"> 
        <Phone className="w-4 h-4 text-purple-400" /> 
      </div>
      <span className="text-sm">+92 3369007932</span>
    </div>
    {/* Second Phone Number */}
    <div className="flex items-center gap-3 text-gray-300">
      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"> 
        <Phone className="w-4 h-4 text-purple-400" /> 
      </div>
      <span className="text-sm">+92 3345010416</span>
    </div>

    {/* First Name/Title */}
    <div className="flex items-center gap-3 text-gray-300">
      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"> 
        <MapPin className="w-4 h-4 text-purple-400" /> 
      </div>
      <span className="text-sm">Sheikh Saif Ur Rehman Siddiqui , COO</span>
    </div>
    {/* Second Name/Title */}
    <div className="flex items-center gap-3 text-gray-300">
      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center"> 
        <MapPin className="w-4 h-4 text-purple-400" /> 
      </div>
      <span className="text-sm">Musharaf ul Hassan Shah , CEO</span>
    </div>
  </div>
</motion.div>
            
            {/* Newsletter */}
     
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={footerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
              <p className="text-gray-300 mb-4">
                Join our newsletter for the latest updates on my projects and technologies.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border border-white/10" 
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors" 
                  aria-label="Subscribe"
    
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
          
     
          {/* Copyright Information */}
          <div className="border-t border-white/10 py-6 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Qubitverse Studios. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Made with <Heart className="inline w-4 h-4 text-red-500" /> by your team.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
   
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}z
          className="fixed bottom-6 right-6 z-50 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors" 
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}

    </div>
  );
};

export default ExtendedPortfolio;
