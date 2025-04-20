import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Project3DModel from './Project3DModel';

const ProjectCard3D = ({ project, darkMode, onView3D }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Limit the rotation to avoid extreme values
    const rotateX = Math.min(Math.max(((y - centerY) / centerY) * 10, -10), 10);
    const rotateY = Math.min(Math.max(((centerX - x) / centerX) * 10, -10), 10);
    
    controls.start({
      rotateX,
      rotateY,
      transition: { duration: 0.1, ease: "linear" }
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.3 }
    });
    setIsHovered(false);
  };

  const handle3DView = () => {
    setShow3DViewer(true);
    if (onView3D) {
      onView3D(project.title);
    }
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`relative rounded-lg overflow-hidden shadow-lg ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={controls}
        initial={{ rotateX: 0, rotateY: 0 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* 3D Effect Layer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, ${
              darkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"
            }, transparent)`,
            transform: "translateZ(20px)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            animate={{
              opacity: isHovered ? 0.7 : 0.5,
            }}
          />
        </div>

        {/* Project Content */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold mb-2"
            animate={{
              y: isHovered ? -5 : 0,
            }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="mb-4 text-sm"
            animate={{
              y: isHovered ? -5 : 0,
            }}
          >
            {project.desc}
          </motion.p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className={`px-2 py-1 text-xs rounded ${
                  darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              animate={{
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
            >
              View Project
            </motion.a>
            <motion.button
              onClick={handle3DView}
              className="block w-full text-center py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              animate={{
                y: isHovered ? -5 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
            >
              View in 3D
            </motion.button>
          </div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: isHovered
              ? `0 0 30px ${darkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"}`
              : "none",
          }}
        />
      </motion.div>

      {show3DViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{project.title} - 3D View</h3>
              <button
                onClick={() => setShow3DViewer(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <Project3DModel projectTitle={project.title} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard3D;