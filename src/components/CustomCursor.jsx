import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  // Refs for cursor elements
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const cursorTextRef = useRef(null);
  
  // State for cursor interactions
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // Hide cursor on mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches;
  
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;
    const cursorTrail = cursorTrailRef.current;
    const cursorTextEl = cursorTextRef.current;
    
    if (!cursor || !cursorBorder || !cursorTrail) return;

    // Set initial positions with better transforms
    gsap.set([cursor, cursorBorder, cursorTrail], {
      xPercent: -50,
      yPercent: -50,
      scale: 0
    });

    // Animate cursor entrance
    gsap.to([cursor, cursorBorder, cursorTrail], {
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.2)",
      stagger: 0.1
    });

    // Smooth mouse following with different speeds for layered effect
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
    
    const xBorderTo = gsap.quickTo(cursorBorder, "x", { duration: 0.4, ease: "power3.out" });
    const yBorderTo = gsap.quickTo(cursorBorder, "y", { duration: 0.4, ease: "power3.out" });
    
    const xTrailTo = gsap.quickTo(cursorTrail, "x", { duration: 0.6, ease: "power3.out" });
    const yTrailTo = gsap.quickTo(cursorTrail, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e) => {
      if (!isVisible) return;
      
      xTo(e.clientX);
      yTo(e.clientY);
      xBorderTo(e.clientX);
      yBorderTo(e.clientY);
      xTrailTo(e.clientX);
      yTrailTo(e.clientY);
    };

    // Enhanced click animations
    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: 0.7,
        duration: 0.15,
        ease: "power2.out"
      });
      gsap.to(cursorBorder, {
        scale: 1.3,
        duration: 0.15,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(1.5)"
      });
      gsap.to(cursorBorder, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to([cursor, cursorBorder, cursorTrail], {
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      gsap.to([cursor, cursorBorder, cursorTrail], {
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.2)",
        stagger: 0.05
      });
    };

    // Hover effect handlers
    const handleHoverStart = (e) => {
      const target = e.target;
      const isClickable = target.tagName === 'A' || 
                         target.tagName === 'BUTTON' || 
                         target.onclick || 
                         target.style.cursor === 'pointer' ||
                         target.closest('a, button, [onclick], [role="button"]');

      if (isClickable) {
        setCursorText('');
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorBorder, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorTrail, {
          scale: 2,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      } else if (target.tagName === 'IMG') {
        setCursorText('VIEW');
        gsap.to(cursor, {
          scale: 0,
          duration: 0.2
        });
        gsap.to(cursorBorder, {
          scale: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorText('TYPE');
        gsap.to(cursor, {
          scale: 0.8,
          duration: 0.2
        });
        gsap.to(cursorBorder, {
          scale: 1.2,
          duration: 0.3
        });
      }
    };

    const handleHoverEnd = () => {
      setCursorText('');
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
      gsap.to(cursorBorder, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      });
      gsap.to(cursorTrail, {
        scale: 1,
        opacity: 0.6,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [isVisible]);

  return (
    <>
      {/* Cursor Trail (slowest) */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[997] opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(2px)'
        }}
      />

      {/* Cursor Border (medium speed) */}
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[998] opacity-80 transition-colors duration-300"
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(1px)',
          boxShadow: '0 0 20px rgba(255,255,255,0.3)'
        }}
      />

      {/* Main Cursor (fastest) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[999] shadow-lg"
        style={{
          boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)'
        }}
      />

      {/* Cursor Text */}
      {cursorText && (
        <div
          ref={cursorTextRef}
          className="fixed top-0 left-0 pointer-events-none z-[1000] text-white text-xs font-bold tracking-wider opacity-90 transform -translate-x-1/2 -translate-y-8"
          style={{
            transform: 'translate(-50%, -200%)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 0.3s ease-out'
          }}
        >
          {cursorText}
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -150%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -200%);
          }
        }
        
        * {
          cursor: none !important;
        }
        
        body {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;