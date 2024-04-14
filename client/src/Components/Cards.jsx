// import React from "react";
import v_t from "../assets/Images/transcipt.png";
import collaborative from "../assets/Images/collaborative.png";
import ocr from "../assets/Images/OCR.png";
import bgimg from "../assets/Images/background.png";

const Cards = () => {
  return (
    <>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] mr-5">
        <div className="container m-5">
          <div className="grid gap-8 sm:mr-5 sm:grid-cols-2 lg:grid-cols-3">
            <SingleCard
              image={collaborative}
              CardTitle="Collaborative Editor"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Revolutionize teamwork with Collaborative Editors, where multiple minds converge seamlessly in real-time, crafting brilliance together. Effortlessly break down barriers and amplify creativity with a shared canvas for unparalleled collaboration."
            />
            <SingleCard
              image={v_t}
              CardTitle="Video Transcription"
              CardDescription="Unlock the power of words with video transcription - transform spoken content into searchable, shareable text effortlessly, boosting accessibility and engagement. Elevate your content reach and SEO impact with accurate, automated transcriptions!"
            />
            <SingleCard
              image={ocr}
              CardTitle="Optical Character Recognition"
              CardDescription="Unlock the power of seamless text extraction with OCR, revolutionizing data digitization by effortlessly converting printed or handwritten text into editable and searchable formats. Experience efficiency and precision in document management like never before!"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 ">
        <img src={image} alt="" className="w-full h-72" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h1>
            <a
              href={titleHref ? titleHref : "/#"}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h1>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>

          <button
            className="m-5 group relative h-12 w-48 overflow-hidden rounded-3xl bg-white text-lg shadow bg-cover bg-center border-2 border-purple-400"
            style={{ backgroundImage: `url(${bgimg})` }}
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-br from-teal-400 to-purple-600 transition-all duration-[500ms] ease-out group-hover:w-full"></div>
            <span className="relative group-hover:text-white text-white">
              View Details
            </span>
          </button>
        </div>
      </div>

      {/*  */}
    </>
  );
};

export default Cards;
