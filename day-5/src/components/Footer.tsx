import { Waves, Instagram, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from '../lib/router';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Waves className="w-7 h-7 text-cyan-400" strokeWidth={2.5} />
              <span className="text-2xl font-black text-white">Pravah</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              The annual techno-cultural fest of our college. Three days of
              innovation, competition, and celebration. Join the flow.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/register', label: 'Register' },
                { to: '/admin', label: 'Admin' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wider uppercase">
              Reach Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
                <span>College Campus, Main Road, City - 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>pravah@college.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2026 Pravah. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Crafted with passion by the Pravah team.
          </p>
        </div>
      </div>
    </footer>
  );
}
