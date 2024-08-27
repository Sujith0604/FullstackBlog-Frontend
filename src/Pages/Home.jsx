import AboutBlog from "../components/AboutBlog";
import CallToAction from "../components/CallToAction";
import HomeBlogPage from "../components/HomeBlogPage";
import HomeHeroSection from "../components/HomeHeroSection";

const Home = () => {
  return (
    <div className=" flex flex-col gap-5 p-4">
      <HomeHeroSection />
      <AboutBlog />
      <HomeBlogPage />
      <CallToAction />
    </div>
  );
};

export default Home;
