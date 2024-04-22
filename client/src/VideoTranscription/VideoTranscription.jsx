import { useState, useEffect } from "react";
import axios from "axios";
import bgimg from "../assets/Images/background.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";
import Background from "../assets/Videos/V1.mp4";
import "../App.css";

const VideoTranscription = () => {
  const [searchText, setSearchText] = useState("");
  const [videoId, setVideoId] = useState("");
  const [transcription, setTranscription] = useState("NA");
  const notify = () => {

      if (searchText === "") {
        toast.error("Please enter the YT video link!");
      } else {
        toast.success("Wait for few seconds");
      }
  }
    
    
  const transcribe = async () => {
          if (searchText === "") {
            toast.error("Please enter the YT video link!");
          } else {
            toast.success("Wait for few minutes!");
    }
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/VideoTranscription", {
        videoUrl: searchText,
      }); // Send videoUrl in the request
      const data = response.data;
      console.log(data)

      if (data.error) {
        toast.success("Video Transcription Completed!");
        document.getElementById("result-text").innerHTML = data.error;
      } else {
        document.getElementById("result-text").innerHTML = data.transcription;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

    
    //   <source src={Background} type="video/mp4"></source>
    // </video>

  return (
    <div
      //       className="    w-full
      //     min-h-screen
      //  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950 via-blue-800 to-indigo-950
      //     background-animate"

      // className="bg-cover bg-center w-full h-screen"
      // style={{
      //   backgroundImage: `url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3lmeG1qajB1NWlwbno1Zm5hZzVvM3JmaHp2b2Q4OXBmaDg5dmZhYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lbcLMX9B6sTsGjUmS3/giphy.gif)`,
      // }}

      className="video-container relative"
    >
      <video autoPlay loop>
        <source src={Background} type="video/mp4"></source>
      </video>
      {/* <video autoPlay loop id="video">
        <source src={Background} type="video/mp4"></source>
      </video> */}

      <div className="absolute inset-0 flex flex-col ">
        <Header />
        <div className="flex justify-center">
          <input
            type="text"
            className="w-3/4 mt-20 md:w-1/2 rounded-3xl border-black border-2 p-3 mr-9 text-xl"
            placeholder="Enter the URL"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mt-6 ">
          <button
            onClick={() => {
              notify();
              const url = searchText.trim();
              const videoIdMatch = url.match(
                /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/
              );
              if (videoIdMatch) {
                const newVideoId = videoIdMatch[1];
                setVideoId(newVideoId);
                setTranscription(""); // Clear the previous transcription
              }
            }}
            className="m-5 group relative h-12 w-48 overflow-hidden rounded-3xl bg-white text-lg shadow bg-cover bg-center border-2 border-purple-400"
            style={{ backgroundImage: `url(${bgimg})` }}
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-br from-teal-400 to-purple-600 transition-all duration-[500ms] ease-out group-hover:w-full"></div>
            <span className="relative group-hover:text-white text-white">
              Search
            </span>
          </button>

          <button
            className="m-5 group relative h-12 w-48 overflow-hidden rounded-3xl bg-white text-lg shadow bg-cover bg-center border-2 border-purple-400"
            style={{ backgroundImage: `url(${bgimg})` }}
            onClick={transcribe}
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-br from-teal-400 to-purple-600 transition-all duration-[500ms] ease-out group-hover:w-full"></div>
            <span className="relative group-hover:text-white text-white">
              Transcript
            </span>
          </button>
        </div>

        <div className="flex flex-row justify-center items-center mt-2">
          {videoId && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube Video Player"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
        <div>
          <div className="mt-4 flex flex-col items-center ">
            <h2 className="text-xl font-bold mt-5 mb-5 text-white">Transcription</h2>
            <p
              id="result-text"
              className="text-gray-800 bg-gray-100 p-4 rounded-lg shadow-md w-[816px] mt-4 mb-5 border-black border-2"
            >
              {transcription}
            </p>
          </div>
        </div>
      </div>
      {/* </source>
      </video> */}
    </div>
  );
};

export default VideoTranscription;
