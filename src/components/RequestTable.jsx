import { Check, X, Trash2 } from 'lucide-react';

function Badge({ status }) {
  const map = {
    pending: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30',
    approved: 'bg-green-500/15 text-green-300 border-green-500/30',
    rejected: 'bg-red-500/15 text-red-300 border-red-500/30',
  };
  return <span className={`text-xs px-2 py-1 rounded border ${map[status] || ''}`}>{status}</span>;
}

export default function RequestTable({ requests, onApprove, onReject, onDelete }) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-neutral-950/60 text-neutral-300">
          <tr className="border-b border-white/10">
            <th className="text-left font-medium p-3">Requester</th>
            <th className="text-left font-medium p-3">Department</th>
            <th className="text-left font-medium p-3">Device</th>
            <th className="text-left font-medium p-3">Dates</th>
            <th className="text-left font-medium p-3">Cost</th>
            <th className="text-left font-medium p-3">Urgency</th>
            <th className="text-left font-medium p-3">Status</th>
            <th className="text-left font-medium p-3">Admin note</th>
            <th className="text-right font-medium p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 && (
            <tr>
              <td colSpan={9} className="p-6 text-center text-neutral-400">No requests found. Submit a request to get started.</td>
            </tr>
          )}
          {requests.map((r) => (
            <tr key={r.id} className="border-b border-white/10 hover:bg-white/5">
              <td className="p-3">
                <div className="font-medium text-neutral-100">{r.requesterName}</div>
                <div className="text-xs text-neutral-400">{r.email}</div>
              </td>
              <td className="p-3">{r.department}</td>
              <td className="p-3">
                <div>{r.deviceType}{r.requiresAdminAccess ? ' • Admin' : ''}</div>
                <div className="text-xs text-neutral-400">Accessories: {r.needsAccessories ? 'Yes' : 'No'}</div>
              </td>
              <td className="p-3">
                <div className="text-xs">{r.startDate} → {r.endDate}</div>
                <div className="text-[11px] text-neutral-400">Submitted {new Date(r.createdAt).toLocaleString()}</div>
              </td>
              <td className="p-3">${Number(r.cost || 0).toFixed(2)}</td>
              <td className="p-3">{r.urgency}</td>
              <td className="p-3"><Badge status={r.status} /></td>
              <td className="p-3 max-w-xs truncate" title={r.adminNote}>{r.adminNote || <span className="text-neutral-500">—</span>}</td>
              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onApprove(r.id)} className="inline-flex items-center gap-1 rounded-md bg-green-500/20 text-green-200 px-2 py-1 hover:bg-green-500/30">
                    <Check className="h-4 w-4" />
                  </button>
                  <button onClick={() => onReject(r.id)} className="inline-flex items-center gap-1 rounded-md bg-red-500/20 text-red-200 px-2 py-1 hover:bg-red-500/30">
                    <X className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(r.id)} className="inline-flex items-center gap-1 rounded-md bg-white/10 text-neutral-200 px-2 py-1 hover:bg-white/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
