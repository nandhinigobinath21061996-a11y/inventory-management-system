import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import Stats from "../components/Stats";
// import DashboardPreview from "../components/DashboardPreview";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Stats /> */}
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;