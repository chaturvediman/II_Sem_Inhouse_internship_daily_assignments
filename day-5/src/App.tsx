import { useEffect } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Admin from './pages/Admin';

function Routes() {
  const { path } = useRouter();
  const pathname = path.split('?')[0];

  useEffect(() => {
    document.title = 'Pravah 2026 | College Techno-Cultural Fest';
  }, []);

  let page;
  if (pathname === '/' || pathname === '') {
    page = <Home />;
  } else if (pathname === '/register') {
    page = <Register />;
  } else if (pathname === '/admin') {
    page = <Admin />;
  } else {
    page = <NotFound />;
  }

  const showChrome = pathname !== '/admin' || true;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-1">{page}</main>
      {showChrome && <Footer />}
    </div>
  );
}

function NotFound() {
  const { navigate } = useRouter();
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 pt-20 text-center">
      <div>
        <h1 className="text-7xl font-black text-white mb-4">404</h1>
        <p className="text-slate-400 mb-8">This page doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-full hover:bg-cyan-300 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  );
}
