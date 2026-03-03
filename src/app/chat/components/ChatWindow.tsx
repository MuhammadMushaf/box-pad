'use client';

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  KeyboardEvent,
} from 'react';
import { cn } from '@/lib/utils';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import { Chat, Message } from '../types/chat.types';
import { AUTO_REPLIES, CURRENT_USER_ID } from '../data/dummyData';

// ─── Icons (inline SVG to avoid extra deps) ────────────────────
const IconImage = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="M21 15l-5-5L5 21"/>
  </svg>
);
const IconVideo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IconNote = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="12" y2="17"/>
  </svg>
);
const IconEmoji = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9"/>
    <line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);
const IconReply = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 14 4 9 9 4"/>
    <path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
  </svg>
);
const IconBolt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconMic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

// ─── Typing indicator ──────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="self-start flex flex-col items-start gap-1">
      <span className="text-[11px] text-slate-400 px-1">typing…</span>
      <div className="bg-[#F2F2F2] rounded-2xl rounded-tl-[6px] px-5 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-slate-400"
            style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Date divider ─────────────────────────────────────────────
function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center my-4">
      <span className="bg-slate-100 text-slate-500 text-[12px] font-medium px-4 py-1.5 rounded-full">
        {label}
      </span>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────
interface ChatWindowProps {
  chat: Chat;
  onUpdateChat: (chatId: string, newMessage: Message) => void;
  onOpenProfile: () => void;
  profileOpen: boolean;
  onBack: () => void;
}

// ─── Main component ───────────────────────────────────────────
export default function ChatWindow({
  chat,
  onUpdateChat,
  onOpenProfile,
  profileOpen,
  onBack,
}: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, isTyping, scrollToBottom]);

  useEffect(() => {
    setInputValue('');
    setIsTyping(false);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, [chat.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  };

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      chatId: chat.id,
      senderId: CURRENT_USER_ID,
      text,
      timestamp: nowTime(),
      read: false,
    };

    onUpdateChat(chat.id, newMsg);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const delay = 1400 + Math.random() * 800;
    setTimeout(() => setIsTyping(true), delay);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: `m${Date.now() + 1}`,
        chatId: chat.id,
        senderId: chat.id,
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        timestamp: nowTime(),
        read: false,
      };
      onUpdateChat(chat.id, reply);
    }, delay + 2000);
  }, [inputValue, chat.id, onUpdateChat]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <ChatHeader
        user={chat.user}
        onOpenProfile={onOpenProfile}
        onBack={onBack}
        profileOpen={profileOpen}
      />

      {/* Messages area — clean white bg */}
      <div
        className="flex-1 overflow-y-auto px-5 md:px-8 py-4 flex flex-col gap-3"
        style={{ background: '#ffffff', scrollbarWidth: 'none' }}
        aria-label="Messages"
        role="log"
        aria-live="polite"
      >
        <DateDivider label="Today" />
        {chat.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input footer card ── */}
      <footer className="px-4 pb-4 pt-2 bg-white flex-shrink-0">
        <div className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type something...."
            aria-label="Type a message"
            rows={2}
            className={cn(
              'w-full px-4 pt-3 pb-2 text-[14px] text-slate-800 bg-white',
              'outline-none resize-none leading-relaxed',
              'placeholder:text-slate-400'
            )}
            style={{ scrollbarWidth: 'none', minHeight: '60px', maxHeight: '120px' }}
          />

          {/* Toolbar row */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-slate-100">
            {/* Left icons */}
            <div className="flex items-center gap-3 text-slate-500">
              {[IconImage, IconVideo, IconNote, IconEmoji, IconReply].map((Icon, i) => (
                <button
                  key={i}
                  className="hover:text-slate-800 transition-colors"
                  aria-label={['Image', 'Video', 'Note', 'Emoji', 'Reply'][i]}
                >
                  <Icon />
                </button>
              ))}
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3 text-slate-500">
              <button
                className="hover:text-slate-800 transition-colors"
                aria-label="Quick reply"
              >
                <IconBolt />
              </button>
              <button
                onClick={handleSend}
                className={cn(
                  'transition-colors',
                  inputValue.trim()
                    ? 'text-violet-600 hover:text-violet-700'
                    : 'text-slate-400'
                )}
                aria-label="Send or record"
              >
                <IconMic />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Keyframe for typing dots */}
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function nowTime() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}
