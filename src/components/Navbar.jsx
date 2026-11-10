import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/bookmarks", label: "Bookmarks" },
  { to: "/contact", label: "Contact" },
];
const linkClass = ({ isActive }) =>
  `rounded-md px-2 py-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${isActive ? "font-bold text-red-600" : "text-gray-700 hover:text-red-600"}`;
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-900"
          aria-label="NewsHub home"
          onClick={() => setMenuOpen(false)}
        >
          <IoNewspaperOutline
            className="text-3xl text-red-600"
            aria-hidden="true"
          />
          <span className="text-2xl font-extrabold tracking-tight">
            NewsHub
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-base font-medium md:flex">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg text-xl text-gray-800 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 md:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <FaTimes aria-hidden="true" />
          ) : (
            <FaBars aria-hidden="true" />
          )}
        </button>
      </div>
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-gray-100 bg-white px-5 py-3 shadow-md md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-base font-medium">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
