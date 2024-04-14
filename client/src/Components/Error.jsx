import bgimg from "../assets/Images/background.png";
const Error = () => {
  return (
    <>
      
      <main
        className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 bg-cover bg-center w-full h-screen"
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="text-center">
          <p className="text-3xl font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600  sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-white">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="m-5 group relative h-12 w-48 overflow-hidden rounded-3xl bg-white text-lg shadow bg-cover bg-center border-2 border-purple-400"
              style={{ backgroundImage: `url(${bgimg})` }}
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-br from-teal-400 to-purple-600 transition-all duration-[500ms] ease-out group-hover:w-full"></div>
              <span className="relative group-hover:text-white text-white">
                Go to Home
              </span>
            </button>
            <a
              href="#"
              className=" font-semibold  group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer"
            >
              <span className="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Contact support <span aria-hidden="true">&rarr;</span>
              </span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
export default Error;
