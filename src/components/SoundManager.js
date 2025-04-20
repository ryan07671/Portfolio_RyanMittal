import React, { useEffect } from 'react';
import { Howl } from 'howler';

const SoundManager = ({ mode = 'silent', darkMode }) => {
  // Background music
  const backgroundMusic = new Howl({
    src: ['/sounds/background.mp3'],
    loop: true,
    volume: 0.3
  });

  // Interaction sounds
  const clickSound = new Howl({
    src: ['/sounds/click.mp3'],
    volume: 0.5
  });

  const hoverSound = new Howl({
    src: ['/sounds/hover.mp3'],
    volume: 0.3
  });

  const successSound = new Howl({
    src: ['/sounds/success.mp3'],
    volume: 0.5
  });

  // Handle background music based on mode
  useEffect(() => {
    if (mode === 'sound') {
      backgroundMusic.play();
    } else {
      backgroundMusic.stop();
    }

    return () => {
      backgroundMusic.stop();
    };
  }, [mode]);

  // Expose sound functions globally
  useEffect(() => {
    window.playSound = {
      click: () => {
        if (mode === 'sound') {
          clickSound.play();
        } else if (mode === 'vibrate' && navigator.vibrate) {
          navigator.vibrate(50);
        }
      },
      hover: () => {
        if (mode === 'sound') {
          hoverSound.play();
        } else if (mode === 'vibrate' && navigator.vibrate) {
          navigator.vibrate(20);
        }
      },
      success: () => {
        if (mode === 'sound') {
          successSound.play();
        } else if (mode === 'vibrate' && navigator.vibrate) {
          navigator.vibrate(100);
        }
      }
    };

    return () => {
      window.playSound = null;
    };
  }, [mode]);

  return null;
};

export default SoundManager;