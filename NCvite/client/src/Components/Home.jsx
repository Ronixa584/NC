// import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import bgimg from "../assets/Images/background.png";
import bgimg1 from "../assets/Images/background_1.png";
import dashboard from "../assets/Images/dashboardimg.png";
import Cards from "./Cards";
import Team from "./Team";
import Tubelight from "./Tubelight";
import Background from "./Background.mp4";

const Section1 = () => {
  const texts = [
    "Empower your Content with Innovation",
    "Fueling Creativity and Collaboration",
    "Unlocking Text from Images with OCR",
    "Elevate Teamwork with Real-Time Editing",
  ];

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the text index cyclically
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div
      className="flex flex-col md:flex-row w-full min-h-screen xl:h-screen 2xl:h-screen bg-cover bg-center"
      // class="flex flex-col md:flex-row w-full h-auto lg:auto xl:h-auto 2xl:h-screen  bg-cover bg-center border border-white"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="h-auto w-full md:flex">
        <div className="md:w-1/2 p-4 pb-0">
          <div className="text-center mt-20 md:mt-20 lg:mt-32">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out">
              {texts[textIndex]}
            </h1>
          </div>
          <div className="text-justify mt-8">
            <h1 className="text-center text-white">
              Consolidating Innovation: Unifying All Our Efforts in One Place.
            </h1>
          </div>
          <div className="flex items-center justify-center mt-6 lg:mt-28">
            <a href="/">
              <button className="bn54">
                <span className="bn54span">Explore More ..!</span>
              </button>
            </a>
          </div>
        </div>
        <div className="h-auto w-full md:w-1/2 p-4 pb-0 relative">
          <div className="mr-0 lg:mt-20 flex flex-row-reverse">
            <img
              src={dashboard}
              alt="Dashboard"
              className="w-4/5 h-3/4 screen object-cover mt-7 mr-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Section2 = () => {
  return (
    <div
      className="min-h-screen h-auto lg:h-screen xl:h-screen 2xl:h-screen w-full bg-cover bg-center"
      // className="h-auto lg:h-screen xl:h-screen 2xl:h-screenw-auto  bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg1})` }}
    >
      <h1>Section 2</h1>
    </div>
  );
  // return (
  // <div
  //   className="min-h-screen h-auto lg:h-screen xl:h-screen 2xl:h-screen w-full bg-cover bg-center"
  // >
  //   <video autoPlay loop >
  //     <source src={Background} type="video/mp4"></source>
  //   </video>
  // </div>
  // );
};
const Section3 = () => {
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center m-auto h-auto lg:h-screen xl:h-screen 2xl:h-screen bg-cover bg-center"
      // className="w-auto flex flex-col justify-center items-center m-auto h-auto lg:h-screen xl:h-screen 2xl:h-screenw-auto  bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <Cards />
    </div>
  );
};
const Section4 = () => {
  return (
    <>
      <div
        className="h-auto w-full bg-cover bg-center min-h-screen"
        // className="h-auto w-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimg1})` }}
      >
        <Team />
      </div>
    </>
  );
};
const Section5 = () => {
  return (
    <>
      <div
        className="h-auto w-full bg-cover bg-center min-h-screen"
        // className="h-auto w-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${bgimg1})` }}
      >
        <Tubelight />
      </div>
    </>
  );
};

const Home = () => {
  return (
    <div className="area">
      <div>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </div>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Home;
