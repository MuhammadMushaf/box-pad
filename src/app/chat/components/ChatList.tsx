'use client';

import { useState, useMemo } from 'react';
import { Search, PenSquare, PanelLeftClose, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatItem from './ChatItem';
import { Chat } from '../types/chat.types';


interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

// Filter tabs
const FILTERS = ['All', 'Open', 'Closed'] as const;
type Filter = (typeof FILTERS)[number];

export default function ChatList({ chats, activeChatId, onSelectChat }: ChatListProps) {


  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('Open');
  const [sort] = useState<'Newest' | 'Oldest'>('Newest');

  const filtered = useMemo(() => {
    let list = chats;
    if (query.trim()) {
      list = list.filter((c) =>
        c.user.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return list;
  }, [chats, query]);

  return (
    <aside className="flex flex-col h-full bg-[#F7F7F8] border-r border-slate-200">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 pt-5 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            aria-label="Toggle sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
          <span className="font-bold text-[17px] text-slate-900 tracking-tight">
            Michael Johnson
          </span>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
          aria-label="New chat"
        >
          <PenSquare size={17} />
        </button>
      </header>

      {/* ── Search bar ── */}
      <div className="px-4 pb-3 flex-shrink-0">
        <div
          className={cn(
            'flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5',
            'focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all shadow-sm'
          )}
        >
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Chat"
            className="flex-1 bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
            aria-label="Search chats"
          />
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Filter options"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* ── Filter / Sort bar ── */}
      <div className="flex items-center justify-between px-4 pb-3 flex-shrink-0">
        {/* Open / filter pill */}
        <button className="flex items-center gap-1 text-[13px] font-semibold text-slate-700 hover:text-slate-900 transition-colors">
          {activeFilter}
          <ChevronDown size={13} className="text-slate-400" />
        </button>
        {/* Sort */}
        <button className="flex items-center gap-1 text-[13px] font-semibold text-slate-700 hover:text-slate-900 transition-colors">
          {sort}
          <ChevronDown size={13} className="text-slate-400" />
        </button>
      </div>

      {/* ── Conversation list ── */}
      <nav
        className="flex-1 overflow-y-auto px-2 pb-2"
        aria-label="Conversations"
        style={{ scrollbarWidth: 'none' }}
      >
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-[13px] text-slate-400">
            No chats found
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {filtered.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onClick={() => onSelectChat(chat.id)}
              />
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}
