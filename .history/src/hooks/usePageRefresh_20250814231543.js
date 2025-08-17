import { useState, useEffect } from 'react';

const usePageRefresh = () => {
  const [isPageRefreshing, setIsPageRefreshing] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store in sessionStorage to persist through refresh
      sessionStorage.setItem('pageRefreshing', 'true');
    };

    // Check if page was refreshed
    const checkIfRefresh = () => {
      // Check sessionStorage first
      const wasRefreshing = sessionStorage.getItem('pageRefreshing');
      if (wasRefreshing) {
        setIsPageRefreshing(true);
        sessionStorage.removeItem('pageRefreshing');
        // Hide loading after a short delay
        setTimeout(() => {
          setIsPageRefreshing(false);
        }, 1500);
        return;
      }

      // Alternative check using performance API
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0];
        if (navigationEntry.type === 'reload') {
          setIsPageRefreshing(true);
          setTimeout(() => {
            setIsPageRefreshing(false);
          }, 1500);
        }
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check on component mount
    checkIfRefresh();

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { isPageRefreshing };
};

export default usePageRefresh;
