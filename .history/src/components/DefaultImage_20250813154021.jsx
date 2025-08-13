import { useState } from "react";

const DefaultImage = ({
  src,
  alt,
  className = "",
  type = "poster", // 'poster' hoặc 'backdrop'
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Tạo ảnh mặc định bằng SVG
  const createDefaultImage = () => {
    const isPoster = type === "poster";

    return (
      <div
        className={`${className} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative`}
        {...props}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-600"
        >
          <path
            d="M4 3C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3H4ZM4 5H20V15.5858L17.7071 13.2929C17.3166 12.9024 16.6834 12.9024 16.2929 13.2929L14 15.5858L10.7071 12.2929C10.3166 11.9024 9.68342 11.9024 9.29289 12.2929L4 17.5858V5ZM16 10C16 11.1046 15.1046 12 14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10Z"
            fill="currentColor"
          />
        </svg>
        <div className="absolute bottom-2 left-2 right-2 text-center">
          <p className="text-gray-500 text-xs">
            {isPoster ? "No Poster" : "No Image"}
          </p>
        </div>
      </div>
    );
  };

  if (hasError || !src) {
    return createDefaultImage();
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`${className} bg-gray-800 animate-pulse absolute inset-0`}
          {...props}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default DefaultImage;
