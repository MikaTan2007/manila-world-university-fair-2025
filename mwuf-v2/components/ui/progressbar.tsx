'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress settings
NProgress.configure({
  showSpinner: false,    // Hide the spinning indicator
  trickleSpeed: 200,     // Speed of the progress bar animation
  minimum: 0.08,         // Minimum percentage used upon starting
  easing: 'ease',     // CSS easing animation to use
  speed: 500,            // Speed of the progress bar (in ms)
});

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Start the progress bar when pathname changes
    NProgress.start();
    
    // Complete the progress bar after a short delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    // Cleanup: ensure progress bar is completed
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]); // Trigger when the current path changes

  return null; // This component doesn't render anything visible
}
