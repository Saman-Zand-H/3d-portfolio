const Navbar = () => {
  return (
    <nav className="absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between bg-transparent p-4">
      <div className="flex items-center space-x-4">
        <span className="flex gap-2 text-2xl font-bold">
          <h1 className="text-stone-800">Saman</h1>
          <h1 className="rounded-md bg-stone-800/70 px-2 text-white">Zand</h1>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="#features"
          className="rounded-md bg-stone-200/40 px-2 py-1 text-stone-800"
        >
          CV
        </a>
        <a
          href="#gallery"
          className="rounded-md bg-stone-200/40 px-2 py-1 text-stone-800"
        >
          Blog
        </a>
        <a
          href="#gallery"
          className="rounded-md bg-stone-200/40 px-2 py-1 text-stone-800"
        >
          Portfolio
        </a>
        <a
          href="#contact"
          className="rounded-md bg-stone-200/40 px-2 py-1 text-stone-800"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
