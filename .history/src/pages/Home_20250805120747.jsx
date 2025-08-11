import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  console.log("Home component rendered");

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen overflow-x-hidden flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Home Page</h1>
          <p className="text-xl">This is the home page</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
