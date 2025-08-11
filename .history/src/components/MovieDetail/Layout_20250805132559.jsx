import HeroSection from './HeroSection';
import MovieInfo from './SideBar/MovieInfo';
import ActionButtons from './MainContent/ActionButtons';

const Layout = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Detail Container - Overlapping 1/3 of hero section */}
      <div className="relative -mt-[23vh] z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar - Movie Info */}
            <div className="lg:col-span-1">
              <MovieInfo />
            </div>
            
            {/* Main Content - Action Buttons */}
            <div className="lg:col-span-2">
              <ActionButtons />
              
              {/* Additional content can be added here */}
              <div className="mt-8 bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-white text-xl font-bold mb-4">Thông tin thêm</h3>
                <p className="text-gray-300">
                  Khu vực này có thể được mở rộng để hiển thị thêm thông tin như trailer, 
                  ảnh từ phim, phim tương tự, đánh giá của người dùng, v.v.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;