import { useMemo, useState } from 'react';
import { Download, Search, Trash2, Check, X, Filter } from 'lucide-react';
import RequestTable from './RequestTable';

export default function AdminPanel({
  requests,
  totalCount,
  currentFilter,
  onFilterChange,
  query,
  onQueryChange,
  onApprove,
  onReject,
  onDelete,
  onClearAll,
}) {
  const [note, setNote] = useState('');

  const counts = useMemo(() => {
    const c = { all: totalCount, pending: 0, approved: 0, rejected: 0 };
    for (const r of requests) {
      if (r.status in c) c[r.status] += 1;
    }
    return c;
  }, [requests, totalCount]);

  const exportCSV = () => {
    const headers = [
      'id','createdAt','status','requesterName','email','department','deviceType','justification','startDate','endDate','cost','urgency','managerEmail','requiresAdminAccess','needsAccessories','acknowledgePolicy','adminNote'
    ];
    const rows = requests.map((r) => headers.map((h) => JSON.stringify(r[h] ?? '')).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'device-requests.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-neutral-900 p-1">
          {(['all','pending','approved','rejected']).map((k) => (
            <button
              key={k}
              onClick={() => onFilterChange(k)}
              className={`px-3 py-1.5 rounded-md text-sm capitalize ${currentFilter === k ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5'}`}
            >
              {k} {k === 'all' ? `(${counts.all})` : ''}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search requests..." className="pl-9 pr-3 py-2 rounded-lg bg-neutral-900 border border-white/10 outline-none focus:border-orange-400/50 text-sm" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button onClick={onClearAll} className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 text-red-300 px-3 py-2 text-sm hover:bg-red-500/10">
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="border-b border-white/10 p-3 flex items-center gap-2 bg-neutral-950/60">
          <Filter className="h-4 w-4 text-neutral-400" />
          <span className="text-sm text-neutral-300">Bulk action note (applies to next approve/reject)</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note to include" className="ml-2 flex-1 rounded-md bg-neutral-900 border border-white/10 px-3 py-1.5 outline-none focus:border-orange-400/50 text-sm" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Use with buttons in table</span>
          </div>
        </div>
        <RequestTable
          requests={requests}
          onApprove={(id) => onApprove(id, note)}
          onReject={(id) => onReject(id, note)}
          onDelete={onDelete}
        />
      </div>

      <div className="text-xs text-neutral-400 flex items-center gap-2">
        <Check className="h-3 w-3 text-green-400" /> Approvals are recorded locally for demo purposes. Integrate with your API for production.
        <X className="h-3 w-3 text-red-400 ml-2" /> Rejections should include a clear reason for auditability.
      </div>
    </div>
  );
}
