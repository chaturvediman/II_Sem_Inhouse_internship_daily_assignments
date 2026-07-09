import { useEffect, useMemo, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Code2,
  Bot,
  Gamepad2,
  Compass,
} from 'lucide-react';
import { getEventBySlug, REGISTRATION_DEADLINE } from '../data/events';
import { supabase, type RegistrationInput } from '../lib/supabase';
import { Link, useRouter } from '../lib/router';
import Countdown from '../components/Countdown';

const iconMap: Record<string, typeof Code2> = {
  Code2,
  Bot,
  Gamepad2,
  Compass,
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  college: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const emptyForm: FormState = { name: '', email: '', phone: '', college: '' };

export default function Register() {
  const { path, navigate } = useRouter();

  const eventSlug = useMemo(() => {
    const params = new URLSearchParams(path.split('?')[1] || '');
    return params.get('event') || '';
  }, [path]);

  const selectedEvent = getEventBySlug(eventSlug);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    else if (form.name.trim().length < 2) e.name = 'Name is too short';

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';

    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone))
      e.phone = 'Enter a valid phone number';

    if (!form.college.trim()) e.college = 'College name is required';
    else if (form.college.trim().length < 2)
      e.college = 'College name is too short';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    if (!validate()) return;

    setStatus('submitting');
    setErrorMsg('');

    const payload: RegistrationInput = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      college: form.college.trim(),
      event: selectedEvent.slug,
    };

    const { error } = await supabase.from('registrations').insert(payload);

    if (error) {
      setStatus('error');
      setErrorMsg(
        error.code === '23505'
          ? 'You have already registered for this event with this email.'
          : 'Something went wrong. Please try again.',
      );
      return;
    }

    setStatus('success');
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
            <AlertCircle className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">
            No Event Selected
          </h1>
          <p className="text-slate-400 mb-8">
            Pick an event from the home page to start your registration.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-full hover:bg-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/30 mb-6 animate-[ping_0.5s_ease-out]">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Registration Confirmed!
          </h1>
          <p className="text-slate-400 mb-2">
            You're registered for{' '}
            <span className="text-cyan-400 font-bold">{selectedEvent.title}</span>.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            A confirmation email is on its way to {form.email}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-full hover:bg-cyan-300 transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setForm(emptyForm);
                setStatus('idle');
                navigate('/');
              }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[selectedEvent.icon] ?? Code2;

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to events
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Event summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-28 bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">
                    {selectedEvent.tagline}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black text-white mb-3">
                  {selectedEvent.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {selectedEvent.description}
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    {selectedEvent.date}
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    {selectedEvent.time}
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    {selectedEvent.venue}
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Trophy className="w-4 h-4 text-cyan-400" />
                    Prize: {selectedEvent.prize}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8">
              <h1 className="text-3xl font-black text-white mb-2">
                Registration Form
              </h1>
              <p className="text-slate-400 mb-6">
                Fill in your details to secure your spot for{' '}
                <span className="text-cyan-400 font-semibold">
                  {selectedEvent.title}
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-300 font-semibold">
                    Registrations close July 8
                  </span>
                </div>
                <Countdown target={REGISTRATION_DEADLINE} compact />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <Field
                  label="Full Name"
                  icon={User}
                  error={errors.name}
                  value={form.name}
                  onChange={(v) => update('name', v)}
                  placeholder="e.g. Aarav Sharma"
                  autoComplete="name"
                />
                <Field
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  error={errors.email}
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  placeholder="e.g. aarav@college.edu"
                  autoComplete="email"
                />
                <Field
                  label="Phone Number"
                  icon={Phone}
                  type="tel"
                  error={errors.phone}
                  value={form.phone}
                  onChange={(v) => update('phone', v)}
                  placeholder="e.g. +91 98765 43210"
                  autoComplete="tel"
                />
                <Field
                  label="College Name"
                  icon={GraduationCap}
                  error={errors.college}
                  value={form.college}
                  onChange={(v) => update('college', v)}
                  placeholder="e.g. National Institute of Technology"
                  autoComplete="organization"
                />

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold py-4 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Confirm Registration
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  icon: typeof User;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
            error ? 'text-red-400' : 'text-slate-500'
          }`}
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full bg-slate-950/50 border rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 outline-none transition-all ${
            error
              ? 'border-red-500/50 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
              : 'border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
          }`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
