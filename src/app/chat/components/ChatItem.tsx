'use client';

import { cn } from '@/lib/utils';
import { Chat } from '../types/chat.types';

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

// Deterministic color palette for letter avatars
const AVATAR_COLORS = [
  'bg-violet-500',
  'bg-amber-400',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-rose-500',
  'bg-indigo-500',
  'bg-orange-400',
  'bg-teal-500',
];

function getAvatarColor(id: string) {
  const idx = id.charCodeAt(id.length - 1) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function getInitial(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function ChatItem({ chat, isActive, onClick }: ChatItemProps) {
  const { user, messages, unreadCount } = chat;
  const lastMsg = messages[messages.length - 1];
  const preview = lastMsg
    ? (lastMsg.senderId === 'me' ? 'You: ' : '') + lastMsg.text
    : 'No messages yet';
  const timestamp = lastMsg?.timestamp ?? '';

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-3 text-left transition-all duration-150 rounded-xl',
        'hover:bg-white hover:shadow-sm focus-visible:outline-none',
        isActive
          ? 'bg-white shadow-sm border border-slate-100'
          : 'border border-transparent'
      )}
      aria-label={`Open chat with ${user.name}`}
    >
      {/* Letter avatar */}
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[15px]',
          getAvatarColor(user.id)
        )}
      >
        {getInitial(user.name)}
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-[13.5px] text-slate-800 truncate pr-2">
            {user.name}
          </span>
          <span className="text-[11.5px] text-slate-400 flex-shrink-0">
            {timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12.5px] text-slate-500 truncate">
            {preview.length > 38 ? preview.slice(0, 38) + '..' : preview}
          </span>
          {unreadCount > 0 && (
            <span className="flex-shrink-0 bg-violet-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
