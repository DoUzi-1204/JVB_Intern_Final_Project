import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import HeroSection from "./HeroSection";
import MovieInfo from "./SideBar/MovieInfo";
import ActionButtons from "./MainContent/ActionButtons";
import useMovieDetail from "../../hooks/useMovieDetail";

const Layout = () => {
  const { loading, error } = useMovieDetail();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Lỗi: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section */}
      <div className="relative">
        <HeroSection />
        
        {/* Detail Container - Overlapping Hero Section */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="w-full bg-black/80 backdrop-blur-sm border-t border-gray-800">
              <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Sidebar - Movie Info */}
                  <div className="lg:col-span-1">
                    <MovieInfo />
                  </div>
                  
                  {/* Main Content */}
                  <div className="lg:col-span-3 space-y-6">
                    <ActionButtons />
                    
                    {/* Additional content can be added here */}
                    <div className="text-white">
                      {/* Space for future content like reviews, similar movies, etc. */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
