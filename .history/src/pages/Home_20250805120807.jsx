import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
  console.log("Home component rendered");

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen overflow-x-hidden">
        <Banner />
      </div>
      <Footer />
    </>
  );
};

export default Home;
