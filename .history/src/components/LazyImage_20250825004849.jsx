import React, { useEffect, useRef, useState } from 'react';

/**
 * LazyImage
 * - props: src, alt, className, style, placeholder (optional)
 * - uses IntersectionObserver to swap the real src when the image becomes visible
 */
export default function LazyImage({ src, alt = '', className = '', style = {}, placeholder = null }) {
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              obs.disconnect();
            }
          });
        },
        { rootMargin: '200px' }
      );
      obs.observe(node);

      return () => obs.disconnect();
    } else {
      // fallback: immediately load
      setVisible(true);
    }
    // imgRef.current is mutable and doesn't need to be in deps; we only want to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image-wrapper ${className}`} style={{ position: 'relative', ...style }}>
      {!loaded && (
        <div
          aria-hidden
          className="lazy-placeholder"
          style={{
            position: 'absolute',
            inset: 0,
            background: '#111827',
            display: 'block',
          }}
        />
      )}
      {visible && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${loaded ? 'lazy-loaded' : 'lazy-loading'}`}
          onLoad={() => setLoaded(true)}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      )}
      {!visible && placeholder}
    </div>
  );
}
