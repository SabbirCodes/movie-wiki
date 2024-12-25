import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Show/hide navbar based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavbar(false); // Scrolling down, hide navbar
    } else {
      setShowNavbar(true); // Scrolling up, show navbar
    }

    // Add background when scrolled away from top
    setIsScrolled(currentScrollY > 0);

    // Update the last scroll position
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const showFirstPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className={`text-white flex py-3 px-8 justify-between items-center shadow-lg shadow-black duration-300 ${isScrolled ? 'backdrop-blur bg-black/60' : 'shadow-none bg-black/60' } ${showNavbar ? 'translate-y-0' : '-translate-y-full opacity-0'}`}>
      <div className="text-2xl font-bold uppercase"
      onClick={showFirstPage}
      >
        <Link to="/">
          <span className="text-red-600">M</span>ovie
          <span className="text-red-600">W</span>iki
        </Link>
      </div>
      <div className="flex md:gap-8">
        <Link
          className="md:text-xl py-2 px-4 rounded-[4px] transition-colors ease-in delay-100 hover:bg-red-600"
          to="/"
        >
          Home
        </Link>
        <Link
          className="md:text-xl py-2 px-4 rounded-[4px] transition-colors ease-in delay-100 hover:bg-red-600"
          to="/favorites"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
