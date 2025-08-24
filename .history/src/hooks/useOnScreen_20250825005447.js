import { useEffect, useRef, useState } from "react";

/**
 * Hook to observe whether an element is on screen.
 * Returns [ref, isVisible].
 * Options: { root, rootMargin, threshold, once }
 */
export default function useOnScreen(options = {}) {
  const { root = null, rootMargin = "200px", threshold = 0, once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.disconnect();
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  // We intentionally do not include `ref.current` in deps — we only want to attach once.
  }, [root, rootMargin, threshold, once]);

  return [ref, isVisible];
}
