import { useEffect, useMemo, useState } from 'react';
import {
  Lock,
  Mail,
  Loader2,
  AlertCircle,
  LogOut,
  Search,
  Filter,
  Users,
  Trophy,
  CalendarDays,
  Download,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { supabase, type Registration } from '../lib/supabase';
import { events } from '../data/events';
import { useRouter } from '../lib/router';

type SessionState = {
  user: { id: string; email: string | undefined } | null;
};

export default function Admin() {
  const { navigate } = useRouter();
  const [session, setSession] = useState<SessionState | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // Auth form
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Data
  const [rows, setRows] = useState<Registration[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      const u = data.session?.user ?? null;
      setSession({ user: u ? { id: u.id, email: u.email } : null });
      setSessionLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      (async () => {
        const u = sess?.user ?? null;
        setSession({ user: u ? { id: u.id, email: u.email } : null });
      })();
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const loadRegistrations = async () => {
    setDataLoading(true);
    setDataError('');
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setDataError(error.message);
      setRows([]);
    } else {
      setRows((data as Registration[]) ?? []);
    }
    setDataLoading(false);
  };

  useEffect(() => {
    if (session?.user) {
      loadRegistrations();
    }
  }, [session?.user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim() || !password) {
      setAuthError('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    setAuthLoading(true);
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email: email.trim(), password });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthError('');
        setMode('signin');
        setAuthLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setEmail('');
    setPassword('');
    setRows([]);
    navigate('/');
  };

  const filtered = useMemo(() => {
    let r = rows;
    if (filter !== 'all') r = r.filter((x) => x.event === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.email.toLowerCase().includes(q) ||
          x.college.toLowerCase().includes(q) ||
          x.phone.toLowerCase().includes(q),
      );
    }
    return r;
  }, [rows, filter, search]);

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    rows.forEach((r) => {
      map[r.event] = (map[r.event] ?? 0) + 1;
    });
    return map;
  }, [rows]);

  const exportCsv = () => {
    const header = ['Name', 'Email', 'Phone', 'College', 'Event', 'Registered At'];
    const body = filtered.map((r) => [
      r.name,
      r.email,
      r.phone,
      r.college,
      events.find((e) => e.slug === r.event)?.title ?? r.event,
      new Date(r.created_at).toLocaleString(),
    ]);
    const csv = [header, ...body]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pravah-registrations-${filter}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 pt-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 mb-5">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Access</h1>
            <p className="text-slate-400">
              Sign in to manage Pravah registrations.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8">
            <div className="flex bg-slate-950/50 rounded-xl p-1 mb-6">
              {(['signin', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setAuthError('');
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mode === m
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            {authError && (
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-5">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{authError}</p>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@college.edu"
                    autoComplete="email"
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] disabled:opacity-60"
              >
                {authLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : mode === 'signin' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            <p className="text-xs text-slate-500 text-center mt-5 leading-relaxed">
              {mode === 'signup'
                ? 'Create your admin account to access registrations. Email confirmation is not required.'
                : 'Use the account you created to sign in.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-20">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">
                Admin
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Registrations Dashboard
            </h1>
            <p className="text-slate-400 mt-1">
              Signed in as{' '}
              <span className="text-cyan-400 font-medium">
                {session.user.email}
              </span>
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-200 font-semibold px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors self-start"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="Total"
            value={rows.length}
            color="cyan"
          />
          {events.slice(0, 3).map((e) => (
            <StatCard
              key={e.slug}
              icon={Trophy}
              label={e.title.split(' ')[0]}
              value={counts[e.slug] ?? 0}
              color="teal"
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or college..."
              className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-10 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all cursor-pointer min-w-[220px]"
            >
              <option value="all">All Events</option>
              {events.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.title} ({counts[e.slug] ?? 0})
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
          </div>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-200 font-semibold px-4 py-3 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden">
          {dataError && (
            <div className="flex items-start gap-3 bg-red-500/10 border-b border-red-500/20 p-4">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{dataError}</p>
            </div>
          )}

          {dataLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
                <CalendarDays className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                No registrations found
              </h3>
              <p className="text-slate-400 text-sm">
                {rows.length === 0
                  ? 'Registrations will appear here once participants sign up.'
                  : 'Try adjusting your filter or search.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-950/40">
                      {['#', 'Name', 'Email', 'Phone', 'College', 'Event', 'Registered'].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-5 py-4"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((r, i) => {
                      const ev = events.find((e) => e.slug === r.event);
                      return (
                        <tr
                          key={r.id}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-5 py-4 text-sm text-slate-500 font-mono">
                            {(currentPage - 1) * pageSize + i + 1}
                          </td>
                          <td className="px-5 py-4">
                            <div className="text-sm font-semibold text-white">
                              {r.name}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <a
                              href={`mailto:${r.email}`}
                              className="text-sm text-cyan-400 hover:underline"
                            >
                              {r.email}
                            </a>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-300">
                            {r.phone}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-300">
                            {r.college}
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                              {ev?.title ?? r.event}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-400 whitespace-nowrap">
                            {new Date(r.created_at).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
                <p className="text-sm text-slate-400">
                  Showing{' '}
                  <span className="text-white font-semibold">
                    {(currentPage - 1) * pageSize + 1}-
                    {Math.min(currentPage * pageSize, filtered.length)}
                  </span>{' '}
                  of <span className="text-white font-semibold">{filtered.length}</span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-slate-400 px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  color: 'cyan' | 'teal';
}) {
  const styles =
    color === 'cyan'
      ? 'bg-cyan-400/10 border-cyan-400/20 text-cyan-400'
      : 'bg-teal-400/10 border-teal-400/20 text-teal-400';
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${styles}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-sm text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}
