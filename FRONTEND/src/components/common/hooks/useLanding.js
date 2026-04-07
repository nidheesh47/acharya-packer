import { useState, useEffect } from "react";
import { useActionData } from "react-router";

export function useLanding() {
  // Safely access actionData
  let actionData;
  try {
    actionData = useActionData();
  } catch (error) {
    console.error("Error accessing action data:", error);
    actionData = null;
  }
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (actionData?.success) {
      setFormSubmitted(true);
      setIsSending(false);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }
    if (actionData?.error) {
      setIsSending(false);
    }
  }, [actionData]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return {
    mobileMenuOpen,
    scrolled,
    formSubmitted,
    mounted,
    isSending,
    actionData,
    setIsSending,
    toggleMobileMenu,
    closeMobileMenu
  };
}