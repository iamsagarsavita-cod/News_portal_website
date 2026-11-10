import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 md:flex-row">
        <div className="text-center md:text-left">
          <Link to="/" className="text-2xl font-bold">
            NewsHub
          </Link>
          <p className="mt-1 text-sm text-gray-300">
            Current stories from around the world.
          </p>
        </div>
        <nav
          className="flex gap-5 text-sm text-gray-200"
          aria-label="Footer navigation"
        >
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/bookmarks" className="hover:text-white">
            Bookmarks
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
        <div
          className="flex gap-5 text-xl text-gray-300"
          aria-label="NewsHub social media"
        >
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
      <div className="border-t border-gray-700 py-3 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} NewsHub · Built by Sagar
      </div>
    </footer>
  );
}
export default Footer;
