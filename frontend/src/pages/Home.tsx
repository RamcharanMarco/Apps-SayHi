import { Helmet, HelmetProvider } from "react-helmet-async";
import {useEffect} from 'react'

import Banner from "../components/Banner";
import EasyIntegration from "../components/EasyIntegration";
import GetStarted from "../components/GetStarted";
import About from "../components/About";
import Responsive from "../components/Responsive";
import Plans from "../components/Plans";

import "../styles/banner2.css";
import "../styles/banner3.css";
import "../styles/banner4.css";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>home | Contactme</title>
      </Helmet>
      <div className="home">
        <Banner />
        <About />
        <Plans/>
        <Responsive />
        <EasyIntegration />
        <GetStarted />
      </div>
    </HelmetProvider>
  );
};

export default Home;
