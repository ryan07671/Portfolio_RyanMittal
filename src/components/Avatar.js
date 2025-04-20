import React, { useState, useRef, useEffect } from 'react';

const Avatar = ({ mood = 'happy', message = '', onMoodChange }) => {
  const [position, setPosition] = useState({ x: 20, y: 260 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [localMood, setLocalMood] = useState(mood);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const avatarRef = useRef(null);
  const moodSelectorRef = useRef(null);

  // Update local mood when prop changes
  useEffect(() => {
    setLocalMood(mood);
  }, [mood]);

  const availableMoods = [
    { name: 'happy', emoji: '😊' },
    { name: 'thinking', emoji: '🤔' },
    { name: 'surprised', emoji: '😮' },
    { name: 'excited', emoji: '🤩' }
  ];

  const getMoodEmoji = () => {
    switch (localMood) {
      case 'happy':
        return '😊';
      case 'thinking':
        return '🤔';
      case 'surprised':
        return '😮';
      case 'excited':
        return '🤩';
      default:
        return '😊';
    }
  };

  const getMoodColor = () => {
    switch (localMood) {
      case 'happy':
        return 'bg-yellow-400';
      case 'thinking':
        return 'bg-blue-400';
      case 'surprised':
        return 'bg-pink-400';
      case 'excited':
        return 'bg-purple-400';
      default:
        return 'bg-yellow-400';
    }
  };

  const handleMouseDown = (e) => {
    // If clicked with right mouse button, show mood selector
    if (e.button === 2) {
      e.preventDefault();
      setShowMoodSelector(true);
      return;
    }
    
    setIsDragging(true);
    const rect = avatarRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep avatar within viewport bounds
    const maxX = window.innerWidth - avatarRef.current.offsetWidth;
    const maxY = window.innerHeight - avatarRef.current.offsetHeight;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAvatarClick = () => {
    if (!isDragging) {
      setShowMoodSelector(prev => !prev);
    }
  };

  const handleMoodSelect = (newMood) => {
    setLocalMood(newMood);
    setShowMoodSelector(false);
    
    // Call the parent component's onMoodChange handler if provided
    if (onMoodChange) {
      onMoodChange(newMood);
    }
  };

  // Handle clicks outside the mood selector
  const handleClickOutside = (e) => {
    if (showMoodSelector && 
        moodSelectorRef.current && 
        !moodSelectorRef.current.contains(e.target) &&
        avatarRef.current && 
        !avatarRef.current.contains(e.target)) {
      setShowMoodSelector(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  // Add event listeners for click outside and context menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent context menu on avatar
    const handleContextMenu = (e) => {
      if (avatarRef.current && avatarRef.current.contains(e.target)) {
        e.preventDefault();
        setShowMoodSelector(true);
      }
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div
      ref={avatarRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 50,
        transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onClick={handleAvatarClick}
      className="select-none"
    >
      <div className={`flex items-center space-x-3 p-3 rounded-full ${getMoodColor()} shadow-lg transform transition-all duration-300 hover:scale-110`}>
        <div className="text-4xl animate-bounce">{getMoodEmoji()}</div>
        {message && (
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
      
      {showMoodSelector && (
        <div 
          ref={moodSelectorRef}
          className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-50"
        >
          <div className="text-center font-medium mb-2 text-sm">Change Mood</div>
          <div className="grid grid-cols-2 gap-2">
            {availableMoods.map((moodOption) => (
              <button
                key={moodOption.name}
                onClick={() => handleMoodSelect(moodOption.name)}
                className={`p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  localMood === moodOption.name ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
                title={moodOption.name}
              >
                <span className="text-2xl">{moodOption.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;