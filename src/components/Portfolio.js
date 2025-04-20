import { useState, useEffect, useRef } from "react";
import SoundManager from "./SoundManager";
import QRCodeComponent from "./QRCode";
import Project3DViewer from "./Project3DViewer";
import Avatar from "./Avatar";
import ProjectCard3D from "./ProjectCard3D";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sound state
  const [soundMode, setSoundMode] = useState('silent'); // 'sound', 'vibrate', 'silent'

  // Context-aware states
  const [timeOfDay, setTimeOfDay] = useState(""); // morning, afternoon, evening, night
  const [userLocation, setUserLocation] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);

  // Avatar and agent states
  const [showAvatar, setShowAvatar] = useState(true);
  const [avatarMood, setAvatarMood] = useState("happy"); // happy, thinking, surprised
  const [avatarMessage, setAvatarMessage] = useState("");

  // Haptic feedback state
  const [hapticFeedback, setHapticFeedback] = useState(false);

  const handleAvatarMoodChange = (newMood) => {
    setAvatarMood(newMood);
    // Change the message based on mood
    switch(newMood) {
      case 'happy':
        setAvatarMessage("I'm feeling happy! How can I help? Connect Now!");
        break;
      case 'thinking':
        setAvatarMessage("Hmm, I'm thinking about something interesting... Connect Now!");
        break;
      case 'surprised':
        setAvatarMessage("Wow! That's surprising! Connect Now!");
        break;
      case 'excited':
        setAvatarMessage("I'm so excited about this portfolio! Connect Now!");
        break;
      default:
        setAvatarMessage("Hey there! Click me to change my mood! Connect Now!");
    }
  };

  // Mixed reality states
  const [showQRCode, setShowQRCode] = useState(false);
  const [project3DView, setProject3DView] = useState(null);

  // Social interaction states
  const [activeUsers, setActiveUsers] = useState([]);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Alex Kim",
      role: "Product Manager",
      message: "Ryan's attention to detail is impressive!",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "UX Designer",
      message: "Collaborating with Ryan was a great experience!",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Marcus Chen",
      role: "Frontend Developer",
      message: "Clean code and excellent documentation!",
      avatar: "/api/placeholder/40/40",
    },
  ]);
  const [viewingUsers, setViewingUsers] = useState([
    { id: 101, name: "John", section: "projects" },
    { id: 102, name: "Emma", section: "skills" },
  ]);

  const skills = [
    { name: "Prompt Engineering", image: "/images/skills/prompt-engineering.png" },
    { name: "Java", image: "/images/skills/java.png" },
    { name: "C++", image: "/images/skills/cpp.png" },
    { name: "Python", image: "/images/skills/python.png" },
    { name: "React", image: "/images/skills/react.png" },
    { name: "Git", image: "/images/skills/git.png" },
    { name: "Figma", image: "/images/skills/figma.png" },
    { name: "VS Code", image: "/images/skills/vscode.png" },
    { name: "IntelliJ", image: "/images/skills/intellij.png" },
    { name: "Photoshop", image: "/images/skills/photoshop.png" },
    { name: "Windows", image: "/images/skills/windows.png" },
    { name: "Ubuntu", image: "/images/skills/ubuntu.png" },
    { name: "WSL", image: "/images/skills/wsl.png" },
    { name: "ChatGPT-4", image: "/images/skills/chatgpt.png" },
    { name: "Claude", image: "/images/skills/claude.png" },
    { name: "Tabnine", image: "/images/skills/tabnine.png" }
  ];

  const sections = [
    "home",
    "skills",
    "projects",
    "experience",
    "achievements",
    "contact",
    "testimonials",
  ];
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Find which section is currently in view
      const current = sectionRefs.current.findIndex((ref) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current !== -1) {
        setActiveSection(sections[current]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add this function for haptic feedback
  const triggerHapticFeedback = () => {
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(20); // Short vibration
    }
  };

  // Sound toggle function
  const toggleSoundMode = () => {
    const modes = ['silent', 'sound', 'vibrate'];
    const currentIndex = modes.indexOf(soundMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setSoundMode(modes[nextIndex]);
    
    // Test sound or vibration when changing modes
    if (modes[nextIndex] === 'sound') {
      window.playSound?.click();
    } else if (modes[nextIndex] === 'vibrate' && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Modify scrollToSection to include haptic feedback
  const scrollToSection = (section) => {
    // Trigger haptic feedback
    triggerHapticFeedback();
    
    const index = sections.indexOf(section);
    if (index !== -1 && sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setActiveSection(section);
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projects = [
    {
      title: "Angry Bird Game",
      desc: "Built a high-fidelity frontend for a game using Figma. Designed a smooth, intuitive UI.",
      link: "https://github.com/Piyush23375/Angry_birds_sem3_vegapunk.git",
      tags: ["UI/UX", "Game Design", "Figma"],
      image: "/images/projects/angry-birds.png", // Replace this path
    },
    {
      title: "Assembler",
      desc: "Created an assembler to translate assembly code into machine code. Applied core computer architecture concepts.",
      link: "https://github.com/rbhan29/co-project.git",
      tags: ["Systems", "Assembly", "Computer Architecture"],
      image: "/images/projects/assembler.png", // Replace this path
    },
    {
      title: "Legal Lingo",
      desc: "Designed a chatbot UI with Figma for legal help, focused on accessibility and UX.",
      link: "https://www.figma.com/proto/A9EpcIydYY3uInvpAPx9mi/High-Fi-Design?node-id=33-2361",
      tags: ["Chatbot", "UI/UX", "Legal Tech"],
      image: "/images/projects/legal-lingo.png", // Replace this path
    },
  ];

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Add contact form ref to maintain scroll position
  const contactFormRef = useRef(null);
  const contactSectionPos = useRef(null);

  const handleContactChange = (e) => {
    e.preventDefault(); // Prevent default behavior
    
    // Store current scroll position when first interacting with contact form
    if (contactSectionPos.current === null) {
      contactSectionPos.current = window.scrollY;
    }
    
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null,
      });
    }
    
    // Ensure we stay at the same scroll position
    if (contactSectionPos.current !== null) {
      window.scrollTo({
        top: contactSectionPos.current,
        behavior: 'auto'
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    let valid = true;

    if (!contactForm.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!contactForm.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    if (!contactForm.message.trim()) {
      errors.message = "Message is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setFormSubmitted(true);
        setContactForm({ name: "", email: "", message: "" });

        // Reset form submitted state after 3 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
      }, 500);
    }
  };

  // Animation helper for sections
  const SectionAnimation = ({ children, id }) => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);

    // Save the ref for navigation
    useEffect(() => {
      const index = sections.indexOf(id);
      if (index !== -1) {
        sectionRefs.current[index] = sectionRef.current;
      }
    }, [id]);

    return (
      <div
        ref={sectionRef}
        id={id}
        className={`transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    );
  };

  // Add this to your existing useEffect for context awareness
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setAvatarMood("happy");
      setAvatarMessage("Good morning! Ready to explore! Connect Now!");
    } else if (hour >= 12 && hour < 17) {
      setAvatarMood("thinking");
      setAvatarMessage("Good Afternoon! How can I help? Connect Now!");
    } else if (hour >= 17 && hour < 22) {
      setAvatarMood("excited");
      setAvatarMessage("Good Evening! Let's create something amazing! Connect Now!");
    } else {
      setAvatarMood("surprised");
      setAvatarMessage("Late night coding? Let's do this! Connect Now!");
    }
  }, []);

  // Add hover and click handlers to interactive elements
  useEffect(() => {
    const addInteractionHandlers = () => {
      const interactiveElements = document.querySelectorAll('button, a, .interactive');
      interactiveElements.forEach(element => {
        element.addEventListener('click', () => triggerHapticFeedback());
      });
    };

    addInteractionHandlers();
    return () => {
      const interactiveElements = document.querySelectorAll('button, a, .interactive');
      interactiveElements.forEach(element => {
        element.removeEventListener('click', () => triggerHapticFeedback());
      });
    };
  }, []);

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
    >
      <SoundManager mode={soundMode} darkMode={darkMode} />
      <Avatar 
        mood={avatarMood} 
        message={avatarMessage} 
        onMoodChange={handleAvatarMoodChange} 
        darkMode={darkMode}
      />

      {/* Add QR Code button in your navigation */}
      <button
        onClick={() => setShowQRCode(!showQRCode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-blue-500 text-white"
      >
        QR
      </button>

      {showQRCode && (
        <QRCodeComponent value="https://your-portfolio-url.com" />
      )}

      {/* Add 3D viewer to your projects section */}
      {project3DView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <Project3DViewer projectUrl={project3DView} />
            <button
              onClick={() => setProject3DView(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } shadow-md`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl">RM</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              
              {/* Haptic Feedback Toggle - Only show on touch devices */}
              {('ontouchstart' in window || navigator.maxTouchPoints > 0) && (
                <button
                  onClick={() => {
                    setHapticFeedback(!hapticFeedback);
                    // Trigger haptic feedback to demonstrate
                    if (!hapticFeedback && navigator.vibrate) {
                      navigator.vibrate(20);
                    }
                  }}
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "bg-gray-800 text-blue-400"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  aria-label={hapticFeedback ? "Disable vibration" : "Enable vibration"}
                  title={hapticFeedback ? "Disable vibration" : "Enable vibration"}
                >
                  {hapticFeedback ? "📳" : "📴"}
                </button>
              )}

              {/* Sound Mode Toggle */}
              <button
                onClick={toggleSoundMode}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-800 text-green-400"
                    : "bg-gray-200 text-gray-800"
                }`}
                aria-label={`Current mode: ${soundMode}`}
                title={`Current mode: ${soundMode}`}
              >
                {soundMode === 'sound' ? "🔊" : soundMode === 'vibrate' ? "📳" : "🔇"}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 px-2 py-1 ${
                    activeSection === section
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : ""
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="focus:outline-none"
              >
                {isMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden transition-all duration-300 ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div className="px-4 py-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left py-3 capitalize ${
                    activeSection === section ? "text-blue-500" : ""
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-40 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          ↑
        </button>
      )}

      {/* Social Activity Widget - Moved to left side */}
      <div className={`fixed bottom-24 left-6 rounded-lg shadow-lg z-40 transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}>
        <div className="p-4 max-w-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Social Activity</h4>
            <button className="text-xs px-2 py-1 rounded bg-blue-500 text-white">
              {viewingUsers.length + activeUsers.length} Online
            </button>
          </div>
          
          {/* Viewing Users */}
          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-500">Currently Viewing:</p>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {viewingUsers.map(user => (
                <div key={user.id} className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>{user.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    viewing {user.section}
                  </span>
                </div>
              ))}
              {activeUsers.map(user => (
                <div key={user.id} className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Simulate Activity */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
            <button 
              onClick={() => {
                const newUser = { 
                  id: Math.floor(Math.random() * 1000) + 200, 
                  name: ["Alex", "Jamie", "Taylor", "Morgan", "Casey"][Math.floor(Math.random() * 5)],
                  section: sections[Math.floor(Math.random() * sections.length)] 
                };
                setActiveUsers(prev => [...prev, newUser]);
                
                // Trigger haptic feedback
                triggerHapticFeedback();
                
                // Remove user after some time
                setTimeout(() => {
                  setActiveUsers(prev => prev.filter(user => user.id !== newUser.id));
                }, 15000);
              }}
              className="text-xs w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Simulate New Visitor
            </button>
          </div>
        </div>
      </div>

      {/* Home/Hero Section */}
      <SectionAnimation id="home">
        <div className="h-screen flex flex-col justify-center items-center pt-16 px-4 text-center">
          <div className="mb-6 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-blue-500">
            <img
              src="\images\profile.png" // Replace this path
              alt="Ryan Mittal"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-2">Ryan Mittal</h1>
          <p className="text-xl md:text-2xl mb-6">
            B.Tech CSD @ IIIT Delhi | Aspiring Developer & Designer
          </p>
          <div className="flex space-x-4 mb-8">
            <a
              href="mailto:ryan23453@iiitd.ac.in"
              className={`rounded-full p-3 ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              } hover:scale-110 transition-transform`}
            >
              ✉️
            </a>
            <a
              href="https://linkedin.com/in/ryanmittal"
              className={`rounded-full p-3 ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              } hover:scale-110 transition-transform`}
            >
              🔗
            </a>
            <a
              href="https://github.com/ryan07671"
              className={`rounded-full p-3 ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              } hover:scale-110 transition-transform`}
            >
              🐙
            </a>
            <a
              href="https://codeforces.com/profile/Ryan5575"
              className={`rounded-full p-3 ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              } hover:scale-110 transition-transform`}
            >
              💻
            </a>
          </div>
          <button
            onClick={() => scrollToSection("projects")}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            View My Work
          </button>
        </div>
      </SectionAnimation>

      {/* Skills Section */}
      <SectionAnimation id="skills">
        <section className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="mb-4 flex flex-col items-center">
                <img src={skill.image} alt={skill.name} className="w-16 h-16 object-contain mb-2" />
                <span className="font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      </SectionAnimation>

      {/* Projects Section */}
      <SectionAnimation id="projects">
        <section className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <ProjectCard3D 
                  key={idx} 
                  project={project} 
                  darkMode={darkMode} 
                  onView3D={(modelUrl) => setProject3DView(modelUrl)}
                />
              ))}
            </div>
          </div>
        </section>
      </SectionAnimation>

      {/* Experience Section */}
      <SectionAnimation id="experience">
        <section className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
          <div className="space-y-12">
            <div className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>

              <div className="md:flex">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <div
                    className={`p-6 rounded-lg shadow-md ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <h3 className="text-xl font-bold">Treasurer</h3>
                    <p className="text-blue-500">
                      Technical Council, IIIT Delhi
                    </p>
                    <p className="text-sm">2023 - Present</p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-200"></div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0"></div>
              </div>

              <div className="mt-12 md:flex">
                <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                <div className="hidden md:block absolute left-1/2 top-32 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-200"></div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <div
                    className={`p-6 rounded-lg shadow-md ${
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <h3 className="text-xl font-bold">Events Head</h3>
                    <p className="text-blue-500">Finnexia, IIIT Delhi</p>
                    <p className="text-sm">2022 - 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4">Key Responsibilities:</p>
            <ul className="inline-block text-left">
              <li className="flex items-center mb-2">
                <span className="mr-2 text-blue-500">✓</span>
                Managing budgets for tech events and workshops
              </li>
              <li className="flex items-center mb-2">
                <span className="mr-2 text-blue-500">✓</span>
                Leading event organization and planning
              </li>
              <li className="flex items-center mb-2">
                <span className="mr-2 text-blue-500">✓</span>
                Promoting financial literacy through seminars
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500">✓</span>
                Collaborating with student teams and stakeholders
              </li>
            </ul>
          </div>
        </section>
      </SectionAnimation>

      {/* Achievements Section */}
      <SectionAnimation id="achievements">
        <section
          className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-900" : "bg-white"
                } transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    🏆
                  </div>
                  <h3 className="text-xl font-bold">
                    NISM Mutual Fund Certification
                  </h3>
                </div>
                <p>
                  Achieved certification in financial market operations and
                  regulatory compliance.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-900" : "bg-white"
                } transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    🤖
                  </div>
                  <h3 className="text-xl font-bold">
                    AI for India 2.0 Contributor
                  </h3>
                </div>
                <p>
                  Recognized contributor to Government of India's AI initiative,
                  building solutions for social impact.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-900" : "bg-white"
                } transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    🔍
                  </div>
                  <h3 className="text-xl font-bold">
                    Google Digital Marketing Certified
                  </h3>
                </div>
                <p>
                  Mastered digital marketing principles and strategies through
                  Google's certification program.
                </p>
              </div>

              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-900" : "bg-white"
                } transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    💻
                  </div>
                  <h3 className="text-xl font-bold">Systems Developer</h3>
                </div>
                <p>
                  Built Student ERP & Food Inventory Systems that improved
                  institutional operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionAnimation>

      {/* Contact Section */}
      <SectionAnimation id="contact">
        <section className="max-w-5xl mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div
                    className={`mr-4 p-3 rounded-full ${
                      darkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    ✉️
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:ryan23453@iiitd.ac.in"
                      className="text-blue-500"
                    >
                      ryan23453@iiitd.ac.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`mr-4 p-3 rounded-full ${
                      darkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    📍
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Hisar, Haryana, India</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`mr-4 p-3 rounded-full ${
                      darkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    🔗
                  </div>
                  <div>
                    <p className="font-medium">Social</p>
                    <div className="flex space-x-3 mt-1">
                      <a
                        href="https://linkedin.com/in/ryanmittal"
                        className="text-blue-500 hover:underline"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/ryan07671"
                        className="text-blue-500 hover:underline"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                {formSubmitted ? (
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? "bg-green-900" : "bg-green-100"
                    } text-center`}
                  >
                    <p
                      className={darkMode ? "text-green-300" : "text-green-700"}
                    >
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-1 font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        onFocus={() => {
                          if (contactSectionPos.current === null) {
                            contactSectionPos.current = window.scrollY;
                          }
                        }}
                        className={`w-full p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-300"
                        } border ${formErrors.name ? "border-red-500" : ""}`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-1 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        onFocus={() => {
                          if (contactSectionPos.current === null) {
                            contactSectionPos.current = window.scrollY;
                          }
                        }}
                        className={`w-full p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-300"
                        } border ${formErrors.email ? "border-red-500" : ""}`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block mb-1 font-medium"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        onFocus={() => {
                          if (contactSectionPos.current === null) {
                            contactSectionPos.current = window.scrollY;
                          }
                        }}
                        className={`w-full p-3 rounded-lg ${
                          darkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-300"
                        } border ${formErrors.message ? "border-red-500" : ""}`}
                      ></textarea>
                      {formErrors.message && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>
      </SectionAnimation>

      {/* Testimonials Section */}
      <SectionAnimation id="testimonials">
        <section className={`py-20 px-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-900" : "bg-white"} transform hover:scale-105 transition-all duration-300`}
                  onClick={() => {
                    triggerHapticFeedback();
                  }}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="italic">"{testimonial.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionAnimation>

      {/* Footer */}
      <footer
        className={`py-6 px-4 text-center ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <p>
          &copy; {new Date().getFullYear()} Ryan Mittal. All rights reserved.
        </p>
        <p className="mt-2 text-sm">Made with LOVE & HARDWORK </p>
      </footer>
    </div>
  );
}