import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type NavbarProps = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function Navbar({ search, setSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50

          flex
          items-center
          justify-between

          px-6
          md:px-8
          py-5

          transition-all
          duration-300

          ${scrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent'}
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🎬</span>

          <h1 className="text-2xl font-bold">Movie</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>

          <Link to="/favorites" className="hover:text-gray-400">
            Favorites
          </Link>
        </div>

        {/* Desktop Search */}
        <input
          value={search ?? ''}
          onChange={(e) => setSearch?.(e.target.value)}
          type="text"
          placeholder="Search Movie"
          className="
            hidden
            md:block

            bg-zinc-900
            border
            border-zinc-800

            rounded-xl
            px-4
            py-2

            outline-none
            w-64
          "
        />

        {/* Mobile Buttons */}
        <div className="flex items-center gap-5 md:hidden">
          <button className="text-2xl">🔍</button>

          <button onClick={() => setOpen(!open)} className="text-3xl">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="
              fixed
              inset-0
              bg-black/60
              z-40
            "
            onClick={() => setOpen(false)}
          />

          {/* Sidebar */}
          <div
            className="
              fixed
              top-0
              right-0
              h-screen
              w-64

              bg-zinc-950
              border-l
              border-zinc-800

              z-50

              p-6

              flex
              flex-col
              gap-8
            "
          >
            <button
              className="
                self-end
                text-3xl
              "
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="
                text-lg
                hover:text-red-500
              "
            >
              Home
            </Link>

            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="
                text-lg
                hover:text-red-500
              "
            >
              Favorites
            </Link>
          </div>
        </>
      )}
    </>
  );
}
