import { useEffect, useState } from 'react';
import { Waves, Menu, X } from 'lucide-react';
import { Link, useRouter } from '../lib/router';

export default function Navbar() {
  const { path } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/register', label: 'Register' },
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            <Waves className="relative w-7 h-7 text-cyan-400" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Pravah
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = path === l.to || (l.to !== '/' && path.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-5 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  active ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-cyan-400/10 text-cyan-400'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
