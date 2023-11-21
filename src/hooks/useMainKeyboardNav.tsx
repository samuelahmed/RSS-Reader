import { useState, useEffect } from 'react';

export default function useMainKeyboardNavigation() {
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);

  const handleKeyDown = () => {
    setIsKeyboardNav(true);
  };

  const handleMouseMove = () => {
    setIsKeyboardNav(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return isKeyboardNav;
}