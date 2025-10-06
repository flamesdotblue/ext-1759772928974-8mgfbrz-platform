import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import RequestForm from './components/RequestForm';
import AdminPanel from './components/AdminPanel';

const STORAGE_KEY = 'device_requests_v1';

export default function App() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setRequests(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load saved requests', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    } catch (e) {
      console.error('Failed to save requests', e);
    }
  }, [requests]);

  const handleCreate = (payload) => {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newRequest = { id, createdAt, status: 'pending', adminNote: '', ...payload };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleApprove = (id, note = '') => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved', adminNote: note } : r)));
  };

  const handleReject = (id, note = '') => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected', adminNote: note } : r)));
  };

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('This will permanently delete all requests. Continue?')) {
      setRequests([]);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      const matchesFilter = filter === 'all' ? true : r.status === filter;
      const text = `${r.requesterName} ${r.email} ${r.department} ${r.deviceType} ${r.justification}`.toLowerCase();
      const matchesQuery = q ? text.includes(q) : true;
      return matchesFilter && matchesQuery;
    });
  }, [requests, filter, query]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-20 backdrop-blur bg-neutral-950/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-orange-500/20 border border-orange-400/30" />
            <span className="font-semibold tracking-tight">Device Authorization Portal</span>
          </div>
          <nav className="text-sm text-neutral-400">Secure. Reviewable. Auditable.</nav>
        </div>
      </header>

      <Hero />

      <main className="max-w-7xl mx-auto px-4">
        <section id="request" className="scroll-mt-20 py-12">
          <h2 className="text-2xl font-semibold mb-6">Submit a device request</h2>
          <RequestForm onCreate={handleCreate} />
        </section>

        <section id="admin" className="scroll-mt-20 py-12">
          <h2 className="text-2xl font-semibold mb-6">Admin dashboard</h2>
          <AdminPanel
            requests={filtered}
            totalCount={requests.length}
            currentFilter={filter}
            onFilterChange={setFilter}
            query={query}
            onQueryChange={setQuery}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
          />
        </section>
      </main>

      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-neutral-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Device Authorization</span>
          <span>Local prototype • Data stored in your browser</span>
        </div>
      </footer>
    </div>
  );
}
