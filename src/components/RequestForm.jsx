import { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Mail, User, Laptop, AlertCircle } from 'lucide-react';

const initial = {
  requesterName: '',
  email: '',
  department: '',
  deviceType: 'Laptop',
  justification: '',
  startDate: '',
  endDate: '',
  cost: '',
  urgency: 'Normal',
  managerEmail: '',
  requiresAdminAccess: false,
  needsAccessories: false,
  acknowledgePolicy: false,
};

export default function RequestForm({ onCreate }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.requesterName.trim()) e.requesterName = 'Full name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.department.trim()) e.department = 'Department is required';
    if (!form.justification.trim() || form.justification.trim().length < 10) e.justification = 'Provide at least 10 characters';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = 'End date must be after start date';
    if (form.cost && Number(form.cost) < 0) e.cost = 'Cost cannot be negative';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.managerEmail)) e.managerEmail = 'Valid manager email required';
    if (!form.acknowledgePolicy) e.acknowledgePolicy = 'Please acknowledge the policy';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onCreate({ ...form, cost: form.cost ? Number(form.cost) : 0 });
    setForm(initial);
    setSuccess('Request submitted successfully. You can track it in the Admin dashboard below.');
    setTimeout(() => setSuccess(''), 4000);
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-neutral-300 flex items-center gap-2"><User className="h-4 w-4" /> Full name</label>
            <input value={form.requesterName} onChange={(e) => setField('requesterName', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" placeholder="Alex Doe" />
            {errors.requesterName && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.requesterName}</p>}
          </div>
          <div>
            <label className="text-sm text-neutral-300 flex items-center gap-2"><Mail className="h-4 w-4" /> Work email</label>
            <input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" placeholder="alex@company.com" />
            {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.email}</p>}
          </div>
          <div>
            <label className="text-sm text-neutral-300">Department</label>
            <input value={form.department} onChange={(e) => setField('department', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" placeholder="Engineering" />
            {errors.department && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.department}</p>}
          </div>
          <div>
            <label className="text-sm text-neutral-300 flex items-center gap-2"><Laptop className="h-4 w-4" /> Device type</label>
            <select value={form.deviceType} onChange={(e) => setField('deviceType', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50">
              <option>Laptop</option>
              <option>Desktop</option>
              <option>Tablet</option>
              <option>Phone</option>
              <option>Peripheral</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm text-neutral-300">Business justification</label>
          <textarea value={form.justification} onChange={(e) => setField('justification', e.target.value)} rows={4} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" placeholder="Explain why this device is required and the impact if not approved." />
          {errors.justification && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.justification}</p>}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-neutral-300 flex items-center gap-2"><Calendar className="h-4 w-4" /> Start date</label>
            <input type="date" min={today} value={form.startDate} onChange={(e) => setField('startDate', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" />
            {errors.startDate && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.startDate}</p>}
          </div>
          <div>
            <label className="text-sm text-neutral-300 flex items-center gap-2"><Calendar className="h-4 w-4" /> End date</label>
            <input type="date" min={form.startDate || today} value={form.endDate} onChange={(e) => setField('endDate', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" />
            {errors.endDate && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.endDate}</p>}
          </div>
          <div>
            <label className="text-sm text-neutral-300">Estimated cost (USD)</label>
            <input type="number" step="0.01" value={form.cost} onChange={(e) => setField('cost', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" placeholder="0.00" />
            {errors.cost && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.cost}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-neutral-300">Urgency</label>
            <select value={form.urgency} onChange={(e) => setField('urgency', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50">
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-neutral-300">Manager email</label>
            <input type="email" value={form.managerEmail} onChange={(e) => setField('managerEmail', e.target.value)} className="mt-1 w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 outline-none focus:border-orange-400/50" placeholder="manager@company.com" />
            {errors.managerEmail && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.managerEmail}</p>}
          </div>
          <div className="flex items-end">
            <div className="flex items-center gap-2">
              <input id="adminAccess" type="checkbox" checked={form.requiresAdminAccess} onChange={(e) => setField('requiresAdminAccess', e.target.checked)} className="rounded border-white/20 bg-neutral-900" />
              <label htmlFor="adminAccess" className="text-sm text-neutral-300">Requires admin access</label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
            <input type="checkbox" checked={form.needsAccessories} onChange={(e) => setField('needsAccessories', e.target.checked)} className="rounded border-white/20 bg-neutral-900" />
            Include accessories (dock, monitor, etc.)
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
            <input type="checkbox" checked={form.acknowledgePolicy} onChange={(e) => setField('acknowledgePolicy', e.target.checked)} className="rounded border-white/20 bg-neutral-900" />
            I acknowledge the device policy and usage guidelines
          </label>
          {errors.acknowledgePolicy && <p className="text-xs text-red-400 w-full flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.acknowledgePolicy}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 text-white px-4 py-2 font-medium hover:bg-orange-400 transition">
            <CheckCircle2 className="h-4 w-4" /> Submit request
          </button>
          {success && <span className="text-sm text-green-400">{success}</span>}
        </div>
      </div>

      <aside className="lg:col-span-1 space-y-3">
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
          <h3 className="font-medium">Guidelines</h3>
          <ul className="mt-2 text-sm text-neutral-300 list-disc pl-5 space-y-1">
            <li>Provide a clear business justification.</li>
            <li>Choose realistic dates and budgets.</li>
            <li>Manager email is required for notifications.</li>
            <li>Mark urgency accurately to help prioritization.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
          <h3 className="font-medium">Review timeline</h3>
          <p className="mt-2 text-sm text-neutral-300">Most requests are reviewed within 2 business days. Critical requests may be expedited.</p>
        </div>
      </aside>
    </form>
  );
}
