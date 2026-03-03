'use client';
import { cn } from "@/lib/utils";
import { Bot, GitFork, Inbox, Megaphone, Settings, Users } from "lucide-react";
import { useState } from "react";

// ─── Navbar ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Inbox',        icon: Inbox,     active: true  },
  { label: 'Contacts',     icon: Users,     active: false },
  { label: 'AI Employees', icon: Bot,       active: false },
  { label: 'Workflows',    icon: GitFork,   active: false },
  { label: 'Campaigns',    icon: Megaphone, active: false },
];

export default function Navbar() {
  const [active, setActive] = useState('Inbox');
  return (
    <nav className="flex items-center h-[52px] px-4 border-b border-slate-200 bg-white flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-8">
        <div className="w-7 h-7 rounded-lg bg-rose-500 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
            <path d="M8 2C4.686 2 2 4.686 2 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 2a4 4 0 1 1 0 8A4 4 0 0 1 8 4zm0 1.5a.75.75 0 0 0-.75.75v1.75H5.5a.75.75 0 0 0 0 1.5h1.75V11a.75.75 0 0 0 1.5 0V9.5H10.5a.75.75 0 0 0 0-1.5H8.75V6.25A.75.75 0 0 0 8 5.5z"/>
          </svg>
        </div>
        <span className="font-bold text-[16px] text-slate-900 tracking-tight">heyy</span>
      </div>

      {/* Nav tabs */}
      <div className="flex items-center gap-0.5 flex-1">
        {NAV_ITEMS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={cn(
              'flex items-center gap-1.5 px-3 h-[52px] text-[13px] font-medium transition-colors border-b-2',
              active === label
                ? 'text-slate-900 border-slate-900'
                : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
            )}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Right: gear + user */}
      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
            M
          </div>
          <span className="text-[13px] font-medium text-slate-700 hidden lg:inline">
            Michael Johnson
          </span>
        </div>
      </div>
    </nav>
  );
}