'use client';

import { MoreVertical, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User } from '../types/chat.types';

interface ChatHeaderProps {
  user: User;
  onOpenProfile: () => void;
  onBack: () => void;
  profileOpen: boolean;
}

export default function ChatHeader({
  user,
  onOpenProfile,
  onBack,
  profileOpen,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 h-[60px] bg-white border-b border-slate-100 flex-shrink-0 z-10">
      {/* Mobile back */}
      <button
        onClick={onBack}
        className="md:hidden mr-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
        aria-label="Back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Contact name — click to open profile */}
      <button
        onClick={onOpenProfile}
        className={cn(
          'font-bold text-[17px] text-slate-900 hover:text-slate-700 transition-colors text-left',
          profileOpen && 'text-slate-600'
        )}
        aria-label="View contact profile"
      >
        {user.name}
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Three-dots menu */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="More options"
        >
          <MoreVertical size={18} />
        </button>

        {/* AI / bot icon */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="AI assistant"
        >
          {/* Crisp-style robot head icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="13" rx="3"/>
            <path d="M9 8V6a3 3 0 0 1 6 0v2"/>
            <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/>
            <path d="M9 18h6"/>
          </svg>
        </button>

        {/* Details / sidebar toggle */}
        <button
          onClick={onOpenProfile}
          className={cn(
            'w-9 h-9 flex items-center justify-center rounded-lg transition-colors',
            profileOpen
              ? 'bg-slate-900 text-white'
              : 'bg-slate-900 text-white hover:bg-slate-700'
          )}
          aria-label="Toggle details panel"
        >
          {/* Panel icon */}
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
            <line x1="12" y1="1" x2="12" y2="17" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
