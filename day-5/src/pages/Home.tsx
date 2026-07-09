import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Zap,
  Users,
  Trophy,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { events, REGISTRATION_DEADLINE, FESTIVAL_DATES_LABEL } from '../data/events';
import EventCard from '../components/EventCard';
import Countdown from '../components/Countdown';
import { Link } from '../lib/router';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-slate-950">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
            alt="Festival crowd"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div
            className={`inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-200 font-medium tracking-wide">
              {FESTIVAL_DATES_LABEL}
            </span>
          </div>

          <h1
            className={`text-7xl sm:text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent">
              PRAVAH
            </span>
          </h1>

          <p
            className={`text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Where innovation meets celebration. The annual techno-cultural fest
            that turns ideas into motion.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#events"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold px-8 py-4 rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)]"
            >
              <span className="relative z-10">Explore Events</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur-md text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Register Now
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </div>
      </section>

      {/* Countdown */}
      <section className="relative -mt-1 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-white/10 py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300 font-semibold tracking-wide">
              Registrations close July 8
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Registration Closes In
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Spots are filling fast. Register before the deadline to secure your
            place at Pravah 2026.
          </p>
          <Countdown target={REGISTRATION_DEADLINE} />
          <div className="mt-10">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold px-8 py-4 rounded-full transition-all hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)]"
            >
              Register Before It's Too Late
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative -mt-1 bg-slate-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, value: '5,000+', label: 'Participants' },
            { icon: Zap, value: '40+', label: 'Events' },
            { icon: Trophy, value: 'Rs. 2L', label: 'Prize Pool' },
            { icon: Calendar, value: '3', label: 'Days of Action' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-3">
                <s.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-white">
                {s.value}
              </div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Events grid */}
      <section id="events" className="relative py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-semibold tracking-wide">
                Flagship Events
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Choose Your Arena
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Four signature competitions. Endless glory. Pick your battle and
              register before spots fill up.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-teal-500/10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to make waves?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Spots are limited and filling fast. Secure your place in Pravah 2026
            today.
          </p>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold px-8 py-4 rounded-full transition-all hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)]"
          >
            Register Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
