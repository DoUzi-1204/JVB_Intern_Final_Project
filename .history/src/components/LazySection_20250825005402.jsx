import React from "react";
import useOnScreen from "../hooks/useOnScreen";

/**
 * LazySection delays mounting its children until the wrapper is scrolled into view.
 * Props:
 *  - placeholder: optional element to render while not visible
 *  - children: content to render when visible
 */
const LazySection = ({ children, placeholder = null, rootMargin = "200px" }) => {
  const [ref, isVisible] = useOnScreen({ rootMargin, once: true });

  return (
    <div ref={ref} className="w-full">
      {isVisible ? children : placeholder}
    </div>
  );
};

export default LazySection;
