import React from "react";

const variantStyles = {
  default: "skeleton-dark rounded-md",
  movieCard: "w-48 h-72 skeleton-dark rounded-md",
  text: "h-4 skeleton-dark rounded-md",
  title: "h-6 skeleton-dark rounded-md",
  avatar: "w-10 h-10 skeleton-dark rounded-full",
  button: "h-10 px-6 skeleton-dark rounded-md",
  banner: "w-full h-96 skeleton-dark rounded-md",
  preview: "w-96 h-64 skeleton-dark rounded-md",
  circle: "skeleton-dark rounded-full",
  rectangle: "skeleton-dark rounded-md",
};

const Skeleton = ({
  variant = "default",
  width = "100%",
  height = "20px",
  className = "",
  ...rest
}) => (
  <div
    className={`${
      variantStyles[variant] || variantStyles.default
    } ${className}`}
    style={{ width, height }}
    aria-label="Loading..."
    {...rest}
  />
);

// Movie Card Skeleton Component
export const MovieCardSkeleton = ({ className = "" }) => {
  return (
    <div className={`w-48 ${className}`}>
      {/* Poster skeleton */}
      <div className="relative w-48 h-72 bg-gray-800 rounded-lg overflow-hidden mb-2">
        <Skeleton
          variant="rectangle"
          width="100%"
          height="100%"
          rounded="none"
        />
      </div>

      {/* Titles below poster skeleton */}
      <div className="px-1">
        {/* Vietnamese title */}
        <Skeleton variant="text" width="80%" className="mb-2" />
        {/* English title */}
        <Skeleton variant="text" width="60%" height="12px" />
      </div>
    </div>
  );
};

// Preview Card Skeleton Component
export const PreviewCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`w-96 h-[26rem] bg-gray-700 rounded-lg overflow-hidden shadow-2xl ${className}`}
    >
      {/* Backdrop skeleton */}
      <div className="relative h-56 overflow-hidden">
        <Skeleton
          variant="rectangle"
          width="100%"
          height="100%"
          rounded="none"
        />
        {/* Gradient overlay for skeleton */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-transparent to-transparent"></div>
        {/* Soft edge blur effect */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-700 to-transparent"></div>
      </div>

      {/* Content section skeleton */}
      <div className="p-4 bg-gray-700 h-48 flex flex-col justify-between">
        {/* Title skeletons */}
        <div className="mb-3">
          <Skeleton variant="title" width="70%" className="mb-1" />
          <Skeleton variant="text" width="50%" height="14px" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex items-center space-x-2 mb-3">
          <Skeleton
            variant="button"
            width="100px"
            height="36px"
            rounded="full"
          />
          <Skeleton variant="circle" width="36px" height="36px" />
          <Skeleton variant="circle" width="36px" height="36px" />
          <Skeleton variant="circle" width="36px" height="36px" />
        </div>

        {/* Info badges and genres skeleton */}
        <div className="space-y-2">
          <div className="flex items-center flex-wrap gap-2">
            <Skeleton
              variant="rectangle"
              width="60px"
              height="24px"
              rounded="sm"
            />
            <Skeleton
              variant="rectangle"
              width="40px"
              height="24px"
              rounded="sm"
            />
            <Skeleton
              variant="rectangle"
              width="50px"
              height="24px"
              rounded="sm"
            />
            <Skeleton
              variant="rectangle"
              width="45px"
              height="24px"
              rounded="sm"
            />
          </div>
          <div className="flex space-x-2">
            <Skeleton variant="text" width="60px" height="12px" />
            <Skeleton variant="text" width="40px" height="12px" />
            <Skeleton variant="text" width="50px" height="12px" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Banner Skeleton Component
export const BannerSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-gray-900 ${className}`}
    >
      {/* Background skeleton */}
      <Skeleton variant="rectangle" width="100%" height="100%" rounded="none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 flex items-center justify-between h-full">
          {/* Left content skeleton */}
          <div className="flex-1 max-w-2xl space-y-6">
            {/* Logo skeleton */}
            <div className="w-96 h-28 mb-4">
              <Skeleton variant="rectangle" width="300px" height="100px" />
            </div>

            {/* Movie info skeleton */}
            <div className="flex items-center space-x-4">
              <Skeleton
                variant="rectangle"
                width="80px"
                height="28px"
                rounded="sm"
              />
              <Skeleton
                variant="rectangle"
                width="40px"
                height="28px"
                rounded="sm"
              />
              <Skeleton
                variant="rectangle"
                width="60px"
                height="28px"
                rounded="sm"
              />
              <Skeleton
                variant="rectangle"
                width="50px"
                height="28px"
                rounded="sm"
              />
            </div>

            {/* Genres skeleton */}
            <div className="flex space-x-2">
              <Skeleton
                variant="rectangle"
                width="80px"
                height="32px"
                rounded="lg"
              />
              <Skeleton
                variant="rectangle"
                width="60px"
                height="32px"
                rounded="lg"
              />
              <Skeleton
                variant="rectangle"
                width="90px"
                height="32px"
                rounded="lg"
              />
            </div>

            {/* Overview skeleton */}
            <div className="space-y-2">
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="75%" />
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center space-x-4">
              <Skeleton
                variant="button"
                width="120px"
                height="48px"
                rounded="full"
              />
              <Skeleton
                variant="button"
                width="100px"
                height="48px"
                rounded="full"
              />
              <Skeleton variant="circle" width="48px" height="48px" />
              <Skeleton variant="circle" width="48px" height="48px" />
            </div>
          </div>

          {/* Right content skeleton - movie posters */}
          <div className="hidden lg:flex flex-col space-y-3 absolute bottom-8 right-8">
            <div className="flex space-x-3">
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangle"
                  width="64px"
                  height="96px"
                  rounded="lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid Skeleton Component
export const GridSkeleton = ({
  columns = 6,
  rows = 3,
  gap = 4,
  className = "",
}) => {
  const totalItems = columns * rows;

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-${gap} ${className}`}
    >
      {[...Array(totalItems)].map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};

// List Skeleton Component
export const ListSkeleton = ({
  items = 5,
  showAvatar = false,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(items)].map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg"
        >
          {showAvatar && <Skeleton variant="avatar" />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="title" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Trending Skeleton Component
export const TrendingSkeleton = () => (
  <ul className="space-y-4">
    {Array.from({ length: 10 }).map((_, idx) => (
      <li
        key={idx}
        className="flex items-center bg-gray-800 rounded-lg px-7 py-5"
      >
        {/* Poster skeleton */}
        <Skeleton
          variant="rectangle"
          width="64px"
          height="96px"
          className="rounded shadow flex-shrink-0"
        />
        {/* Thông tin skeleton */}
        <div className="flex flex-col justify-center ml-4 w-full text-left">
          <Skeleton variant="title" width="60%" className="mb-2" />
          <Skeleton variant="text" width="40%" className="mb-2" />
          <div className="flex gap-2 items-center mt-1">
            <Skeleton variant="button" width="70px" height="28px" />
            <Skeleton variant="button" width="50px" height="28px" />
          </div>
        </div>
        {/* Số thứ tự skeleton */}
        <div className="w-14 flex items-center justify-center">
          <Skeleton variant="circle" width="48px" height="48px" />
        </div>
      </li>
    ))}
  </ul>
);

export default Skeleton;
