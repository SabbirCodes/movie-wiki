const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold uppercase mt-5">
              <span className="text-red-600">M</span>ovie
              <span className="text-red-600">W</span>iki
            </h2>
            <p className="mt-2 text-gray-400 text-sm px-1 md:px-0 md:text-lg">
              Your ultimate source for movies, reviews, and news.
            </p>
          </div>
        </div>
  
        <div className="border-t border-gray-800 mt-8 p-2 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MOVIEWIKI. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  