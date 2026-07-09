import {
  Code2,
  Bot,
  Gamepad2,
  Compass,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import type { EventItem } from '../data/events';
import { Link } from '../lib/router';

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Bot,
  Gamepad2,
  Compass,
};

export default function EventCard({ event }: { event: EventItem }) {
  const Icon = iconMap[event.icon] ?? Code2;

  return (
    <div className="group relative bg-slate-900/60 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          <Icon className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-white tracking-wide">
            {event.tagline}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-cyan-400 text-slate-950 rounded-full px-3 py-1 text-xs font-black tracking-wide">
          {event.prize}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {event.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{event.venue}</span>
          </div>
        </div>

        <Link
          to={`/register?event=${event.slug}`}
          className="group/btn relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold py-3 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]"
        >
          <span className="relative z-10">Register Now</span>
          <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </Link>
      </div>
    </div>
  );
}
