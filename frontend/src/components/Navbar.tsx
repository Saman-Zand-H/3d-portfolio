import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-transparent p-4">
      <Link to="/" className="flex items-center space-x-4">
        <span className="flex gap-2 text-2xl font-bold">
          <h1 className="text-stone-800">Saman</h1>
          <h1 className="rounded-md bg-stone-800/70 px-2 text-white">Zand</h1>
        </span>
      </Link>
      <div className="hidden items-center space-x-4 sm:flex">
        <div className="rounded-3xl bg-white/40 px-3 py-2">
          <a
            href="https://cv.samanznd.com"
            className="rounded-md px-2 py-1 text-stone-800 transition-all delay-100 hover:bg-white/5 hover:text-black"
          >
            CV
          </a>
          <Link
            to={'/projects'}
            className="rounded-md px-2 py-1 text-stone-800 transition-all delay-100 hover:bg-white/5 hover:text-black"
          >
            Projects
          </Link>
          <Link
            to={'/about'}
            className="rounded-md px-2 py-1 text-stone-800 transition-all delay-100 hover:bg-white/5 hover:text-black"
          >
            About
          </Link>
          <Link
            to={'/contact'}
            className="rounded-md px-2 py-1 text-stone-800 transition-all delay-100 hover:bg-white/5 hover:text-black"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="flex rounded-2xl bg-slate-300/60 shadow-md sm:hidden">
        <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-stone-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={
          isOpen
            ? 'absolute inset-0 z-20 m-0 flex h-screen w-screen flex-col items-center justify-center bg-slate-300/70 p-0'
            : 'hidden'
        }
      >
        <ul className="flex flex-col justify-center gap-2.5 text-center">
          <li>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-stone-800 hover:underline"
            >
              Close
            </button>
          </li>
          <li>
            <a
              href="https://cv.samanznd.com"
              className="text-lg font-bold text-stone-800 hover:underline"
            >
              CV
            </a>
          </li>
          <li>
            <Link
              to={'/projects'}
              className="text-lg font-bold text-stone-800 hover:underline"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to={'/about'}
              className="text-lg font-bold text-stone-800 hover:underline"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={'/contact'}
              className="text-lg font-bold text-stone-800 hover:underline"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
