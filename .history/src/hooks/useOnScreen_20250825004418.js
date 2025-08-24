import { useEffect, useRef, useState } from 'react';

// Hook returns a ref and a boolean indicating if the element is on screen.
export default function useOnScreen(options = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIntersecting(entry.isIntersecting));
      },
      options
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
    // Intentionally not including `options` in deps to avoid repeated observer creation
    // if caller passes an inline object, they should memoize it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [ref, isIntersecting];
}
