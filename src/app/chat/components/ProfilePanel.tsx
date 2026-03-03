'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, PanelRightClose, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User, Chat } from '../types/chat.types';

// ─── Types ────────────────────────────────────────────────────
interface ProfilePanelProps {
  user: User | null;
  allChats: Chat[];          // for "Other Chats" section
  activeChatId: string | null;
  onClose: () => void;
  onBack: () => void;
  isMobile?: boolean;
}

// ─── Per-user static extras (labels + notes) ─────────────────
const USER_EXTRAS: Record<string, { labels: string[]; note: string; assignee: string; team: string }> = {
  u1: { labels: ['Friend', 'Weekend'], note: 'Great energy, always responsive ✨', assignee: 'Alice Johnson', team: 'Social Group' },
  u2: { labels: ['Dev', 'Code Review'], note: 'Very technical, prefers async. Loop in on Q4 refactor.', assignee: 'Bob Martinez', team: 'Engineering' },
  u3: { labels: ['Closed Won', 'Client'], note: 'Strong potential for future upgrades 🚀', assignee: 'Clara Thompson', team: 'Sales Team' },
  u4: { labels: ['Travel', 'Asia'], note: 'Loves Japan trip planning. Follow up in March.', assignee: 'David Lee', team: 'Personal' },
  u5: { labels: ['Designer', 'Freelance'], note: 'Top-tier portfolio. Reach out for next UI project.', assignee: 'Eva Chen', team: 'Creative' },
  u6: { labels: ['Finance', 'Urgent'], note: 'Budget discrepancy flagged. CC finance team on all updates.', assignee: 'Frank Wilson', team: 'Finance' },
  u7: { labels: ['Friend', 'Chicago'], note: 'Recommended the new café near office ☕', assignee: 'Grace Park', team: 'Social Group' },
};

// ─── Collapsible section wrapper ─────────────────────────────
function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-[14px] text-slate-800">{title}</span>
        <ChevronDown
          size={16}
          className={cn('text-slate-400 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// ─── Label–Value row ──────────────────────────────────────────
function InfoRow({ label, value, avatar }: { label: string; value: string; avatar?: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="text-slate-400 text-[13px] w-24 flex-shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        {avatar && (
          <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
            <Image src={avatar} alt={value} width={24} height={24} unoptimized />
          </div>
        )}
        <span className="text-[13px] font-semibold text-slate-800 truncate">{value}</span>
      </div>
    </div>
  );
}

// ─── Pill tag ─────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-blue-400 text-blue-500 rounded-full px-3 py-1 text-[12px] font-medium">
      {/* Small tag icon */}
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 1h6l7 7-6 6-7-7V1z" />
        <circle cx="4" cy="4" r="1" fill="currentColor" stroke="none" />
      </svg>
      {label}
    </span>
  );
}

// ─── Note card ────────────────────────────────────────────────
function NoteCard({ text, placeholder }: { text?: string; placeholder?: string }) {
  return (
    <div className="bg-[#fef9c3] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-700 min-h-[44px] flex items-center">
      {placeholder ? (
        <span className="text-slate-400">{placeholder}</span>
      ) : (
        text
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function ProfilePanel({
  user,
  allChats,
  activeChatId,
  onClose,
  onBack,
  isMobile,
}: ProfilePanelProps) {
  const extras = user ? USER_EXTRAS[user.id] : null;

  // Split name into first / last
  const firstName = user?.name.split(' ')[0] ?? '';
  const lastName = user?.name.split(' ').slice(1).join(' ') ?? '';

  // Other chats (exclude active)
  const otherChats = allChats.filter((c) => c.id !== activeChatId).slice(0, 3);

  return (
    <aside className="flex flex-col h-full bg-white border-l border-slate-200 overflow-hidden">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 h-[60px] border-b border-slate-200 flex-shrink-0 bg-white">
        <span className="font-bold text-[16px] text-slate-900">Details</span>
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <PanelRightClose size={18} />
        </button>
      </header>

      {/* ── Empty state ── */}
      {!user ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-8 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
            <PanelRightClose size={24} className="text-slate-300" />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Select a conversation and click the contact name to view details
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">

          {/* ── Chat Data section ── */}
          <Section title="Chat Data" defaultOpen>
            <div className="divide-y divide-slate-100">
              <InfoRow
                label="Assignee"
                value={extras?.assignee ?? user.name}
                avatar={user.avatar}
              />
              <InfoRow
                label="Team"
                value={extras?.team ?? 'General'}
                avatar={`https://api.dicebear.com/7.x/initials/svg?seed=${extras?.team ?? 'General'}&backgroundColor=e0e7ff`}
              />
            </div>
          </Section>

          {/* ── Contact Data section ── */}
          <Section title="Contact Data" defaultOpen>
            <div className="divide-y divide-slate-100">
              <InfoRow label="First Name" value={firstName} />
              <InfoRow label="Last Name" value={lastName} />
              <InfoRow label="Phone number" value={user.phone} />
              <InfoRow label="Email" value={user.email} />
            </div>
            <button className="mt-2 text-[13px] font-semibold text-slate-700 hover:text-slate-900 transition-colors">
              See all
            </button>
          </Section>

          {/* ── Contact Labels ── */}
          <Section title="Contact Labels" defaultOpen>
            <div className="flex flex-wrap gap-2">
              {(extras?.labels ?? ['General']).map((lbl) => (
                <Tag key={lbl} label={lbl} />
              ))}
              <button
                className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-colors"
                aria-label="Add label"
              >
                <Plus size={14} />
              </button>
            </div>
          </Section>

          {/* ── Notes ── */}
          <Section title="Notes" defaultOpen>
            <div className="flex flex-col gap-2">
              <NoteCard placeholder="Add a note" />
              {extras?.note && <NoteCard text={extras.note} />}
            </div>
          </Section>

          {/* ── Other Chats ── */}
          <Section title="Other Chats" defaultOpen={false}>
            {otherChats.length === 0 ? (
              <p className="text-[13px] text-slate-400">No other chats</p>
            ) : (
              <div className="flex flex-col gap-1 -mx-1">
                {otherChats.map((chat) => {
                  const lastMsg = chat.messages[chat.messages.length - 1];
                  return (
                    <div
                      key={chat.id}
                      className="flex items-center gap-3 px-1 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                        <Image
                          src={chat.user.avatar}
                          alt={chat.user.name}
                          width={32}
                          height={32}
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-700 truncate">
                          {chat.user.name}
                        </p>
                        {lastMsg && (
                          <p className="text-[12px] text-slate-400 truncate">
                            {lastMsg.text}
                          </p>
                        )}
                      </div>
                      {lastMsg && (
                        <span className="text-[11px] text-slate-400 flex-shrink-0">
                          {lastMsg.timestamp}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Section>

        </div>
      )}
    </aside>
  );
}
