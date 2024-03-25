import React ,{ useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Tesseract from "tesseract.js";
import bgimg from "../assets/Images/background.png";
import bgimg1 from "../assets/Images/background_1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/Header";

  
const OCR = ({ className }) => {
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  // const [image, setImage] = React.useState("");
  const [text, setText] = React.useState("");
  // const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 1) {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      setText("");
    } else {
      setRejected(rejectedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    // maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data URI to avoid memory leaks
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  const removeFile = () => {
    setFile(null);
    setIsLoading(false);
  };

  //OCR

  // const [copiedtext, setCopiedText] = React.useState("");
  // const [progress, setProgress] = React.useState(0);

  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(file, "eng", {
      logger: (m) => {
        console.log(m);
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        const extractedText = result.data.text;
        const paragraphs = extractedText.split("\n");
        setText(paragraphs);
        setIsLoading(false);
        notify();
      });
  };
  const copyToClipboard = () => {
    if (text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
        toast.success("Text copied to clipboard!");
      } catch (err) {
        toast.error("Unable to Copy. Please try again.");
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  //  /OCR
  const notify = () => toast.success("Text is successfully transcribed.");

  return (
    <div
      className="m-0 p-0  lg:h-screen xl:h-screen 2xl:h-screen w-auto  bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <Header/>
      <div>
        {file ? (
          // Preview
          <section className="h-screen flex flex-col justify-center items-center">
            <div className="flex gap-4">
              <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out title text-3xl font-semibold">
                Preview
              </h2>
            </div>
            {/* <div className="mt-10 rounded-lg w-1/4 h-auto bg-[#f4c0f4] relative flex flex-col justify-center items-center"> */}
            <div className="mt-10 rounded-lg w-3/4 md:w-1/2 lg:w-1/4 h-auto bg-[#f6e9f6] flex flex-col justify-center items-center">
              <img
                src={file.preview}
                alt={file.name}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="object-center object-contain max-h-96 w-48 rounded-md mt-5"
              />
              <div className="flex flex-row-reverse ">
                <button
                  type="button"
                  className=" mt-5 w-7 h-7 bg-[#f4a4f4] border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center hover:bg-[#f363f3] transition-colors"
                  onClick={removeFile}
                >
                  <XMarkIcon className="w-5 h-5 fill-black hover.fill-secondary-400 transition-colors" />
                </button>
              </div>
              <p className="mt-2 text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out  text-[12px] font-semibold text-xl md:text-2xl">
                {file.name}
              </p>
            </div>
            {isLoading ? (
              // Show progress bar or loading indicator when converting
              <div className="w-12 h-7 bg-[#404] m-4 rounded-full flex justify-center items-center">
                <div className="w-5 h-5 border-t-2 border-primary-400 border-4 border-r-0 rounded-full animate-spin"></div>
              </div>
            ) : (
              // Show the "Convert" button when not converting
              <button
                className="m-5 group relative h-10 w-36 overflow-hidden rounded-3xl bg-white text-lg shadow bg-cover bg-center border-2 border-purple-400 "
                style={{ backgroundImage: `url(${bgimg})` }}
                onClick={handleSubmit}
              >
                <div class="absolute inset-0 w-0 bg-gradient-to-br from-teal-400 to-purple-600 transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                <span class="relative group-hover:text-white text-white">
                  Convert
                </span>
              </button>
            )}
          </section>
        ) : (
          // Drop area
          <div
            className="bg-cover bg-center w-full h-screen m-0 p-0"
            style={{ backgroundImage: `url(${bgimg})` }}
          >
            .
            <div {...getRootProps({ className: 'dropzone' })} className="border-2 border-dashed border-white w-3/4 h-52 flex flex-col items-center justify-center gap-4 mx-auto my-auto mt-20 md:w-1/2">
              <input {...getInputProps()} />
              <ArrowUpTrayIcon className="w-12 h-12 fill-current mt-5 text-[#f9f8f9]" />
              {isDragActive ? (
                <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-outmt-5 font-bold text-center">
                  Drop the file here ...
                </p>
              ) : (
                <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out mt-5 font-bold text-center">
                  Drag & drop a file here, or click to select a file
                </p>
              )}
            </div>
          </div>
        )}
        {file && !isLoading && text && (
          <div
            className="h-auto flex items-center justify-center  w-auto  bg-cover bg-center"
            style={{ backgroundImage: `url(${bgimg1})` }}
          >
            <div className="w-full h-full md:w-3/4 lg:w-1/2 mt-[10px] relative">
              <div className="flex flex-row-reverse absolute top-0 right-0">
                <button
                  className="group relative h-10 w-28 overflow-hidden rounded-3xl bg-white text-lg shadow bg-cover bg-center border-2 border-purple-400 "
                  style={{ backgroundImage: `url(${bgimg})` }}
                  onClick={() => {
                    copyToClipboard();
                  }}
                >
                  <div class="absolute inset-0 w-0 bg-gradient-to-br from-teal-400 to-purple-600 transition-all duration-[500ms] ease-out group-hover:w-full"></div>
                  <span class="relative group-hover:text-white text-white">
                    Copy
                  </span>
                </button>
              </div>

              <div
                className="bg-[#fef6fe] p-10 overflow-y-auto w-full h-[11in] mx-auto"
                style={{ maxWidth: "8.5in", maxHeight: "11in" }}
              >
                {text.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCR;
