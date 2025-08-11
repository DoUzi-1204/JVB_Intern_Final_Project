import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/MovieDetail/Layout';

const MovieDetail = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Layout />
      <Footer />
    </div>
  );
};

export default MovieDetail;