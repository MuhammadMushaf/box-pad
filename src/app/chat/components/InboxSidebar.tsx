'use client';

import { useState } from 'react';
import { ChevronDown, User, Users, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Static data matching the reference image ─────────────────
const QUICK_FILTERS = [
  { id: 'mine',       label: 'My Inbox',    count: null, icon: 'user'       },
  { id: 'all',        label: 'All',         count: 28,   icon: 'users'      },
  { id: 'unassigned', label: 'Unassigned',  count: 5,    icon: 'unassigned' },
];

const TEAMS = [
  { id: 't1', label: 'Sales',            count: 7  },
  { id: 't2', label: 'Customer Support', count: 16 },
];

const USERS = [
  { id: 'u_sarah',       label: 'Sarah Williams',     count: 2,   active: false },
  { id: 'u_michael',     label: 'Michael Johnson',    count: 11,  active: true  },
  { id: 'u_emily',       label: 'Emily Davis',        count: null, active: false },
  { id: 'u_christopher', label: 'Christopher Miller', count: 4,   active: false },
  { id: 'u_amanda',      label: 'Amanda Garcia',      count: 5,   active: false },
  { id: 'u_joshua',      label: 'Joshua Martinez',    count: null, active: false },
  { id: 'u_ashley',      label: 'Ashley Taylor',      count: 1,   active: false },
  { id: 'u_daniel',      label: 'Daniel Anderson',    count: null, active: false },
  { id: 'u_jessica',     label: 'Jessica Thomas',     count: 2,   active: false },
];

const CHANNELS = [
  { id: 'ch1', label: 'Fit4Life', type: 'whatsapp' },
  { id: 'ch2', label: 'Fit4Life', type: 'instagram' },
];

// ─── Small icon helpers ───────────────────────────────────────
function QuickIcon({ type }: { type: string }) {
  if (type === 'user') return <User size={15} className="text-slate-500" />;
  if (type === 'users') return <Users size={15} className="text-slate-500" />;
  // unassigned — circle with dot
  return <CircleDot size={15} className="text-slate-500" />;
}

function TeamAvatar() {
  return (
    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
      </svg>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
      <User size={11} className="text-slate-400" />
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.535 5.862L0 24l6.313-1.51A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.862 9.862 0 0 1 2.118 12C2.118 6.536 6.536 2.118 12 2.118c5.463 0 9.882 4.418 9.882 9.882 0 5.463-4.419 9.882-9.882 9.882z"/>
      </svg>
    </div>
  );
}

function InstagramIcon() {
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    </div>
  );
}

// ─── Collapsible group ────────────────────────────────────────
function Group({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full px-3 mb-1"
      >
        <span className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <ChevronDown size={13} className={cn('text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

// ─── Row item ─────────────────────────────────────────────────
function Row({
  children,
  count,
  active,
  onClick,
}: {
  children: React.ReactNode;
  count?: number | null;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-colors',
        active
          ? 'bg-white shadow-sm border border-slate-100 text-slate-900'
          : 'text-slate-600 hover:bg-white hover:shadow-sm hover:border hover:border-slate-100'
      )}
    >
      <span className="flex-1 text-[13px] font-medium truncate">{children}</span>
      {count != null && (
        <span className="text-[11.5px] text-slate-400 font-medium flex-shrink-0">{count}</span>
      )}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function InboxSidebar() {
  const [activeFilter, setActiveFilter] = useState('mine');
  const [activeUser, setActiveUser] = useState('u_michael');

  return (
    <aside className="flex flex-col h-full w-[200px] flex-shrink-0 bg-[#F7F7F8] border-r border-slate-200 overflow-y-auto py-3"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div className="px-3 mb-2">
        <h2 className="font-bold text-[16px] text-slate-900">Inbox</h2>
      </div>

      {/* Quick filters */}
      <div className="flex flex-col gap-0.5 px-1">
        {QUICK_FILTERS.map(f => (
          <Row
            key={f.id}
            count={f.count}
            active={activeFilter === f.id}
            onClick={() => setActiveFilter(f.id)}
          >
            <span className="flex items-center gap-2">
              <QuickIcon type={f.icon} />
              {f.label}
            </span>
          </Row>
        ))}
      </div>

      {/* Teams */}
      <Group title="Teams">
        <div className="flex flex-col gap-0.5 px-1">
          {TEAMS.map(t => (
            <Row key={t.id} count={t.count}>
              <span className="flex items-center gap-2">
                <TeamAvatar  />
                {t.label}
              </span>
            </Row>
          ))}
        </div>
      </Group>

      {/* Users */}
      <Group title="Users">
        <div className="flex flex-col gap-0.5 px-1">
          {USERS.map(u => (
            <Row
              key={u.id}
              count={u.count}
              active={activeUser === u.id}
              onClick={() => setActiveUser(u.id)}
            >
              <span className="flex items-center gap-2">
                <UserAvatar />
                {u.label}
              </span>
            </Row>
          ))}
        </div>
      </Group>

      {/* Channels */}
      <Group title="Channels">
        <div className="flex flex-col gap-0.5 px-1">
          {CHANNELS.map(ch => (
            <Row key={ch.id}>
              <span className="flex items-center gap-2">
                {ch.type === 'whatsapp' ? <WhatsAppIcon /> : <InstagramIcon />}
                {ch.label}
              </span>
            </Row>
          ))}
        </div>
      </Group>
    </aside>
  );
}
