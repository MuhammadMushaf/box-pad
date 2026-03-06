'use client';

import { useState, useCallback } from 'react';
import { MessageSquareDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatList from './chat/components/ChatList';
import ChatWindow from './chat/components/ChatWindow';
import ProfilePanel from './chat/components/ProfilePanel';
import { Chat, Message } from './chat/types/chat.types';
import { INITIAL_CHATS } from './chat/data/dummyData';
import Navbar from './chat/components/Navbar';
import InboxSidebar from './chat/components/InboxSidebar';

type MobileView = 'list' | 'messages' | 'profile';

export default function Home() {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>('list');

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  /** Select a chat */
  const handleSelectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
    setProfileOpen(false);
    setMobileView('messages');

    // Mark messages as read
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c
      )
    );
  }, []);

  /** Append a new message to the active chat & bubble up preview */
  const handleUpdateChat = useCallback((chatId: string, newMsg: Message) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        const updated = { ...c, messages: [...c.messages, newMsg] };
        return updated;
      })
    );
  }, []);

  /** Open profile panel */
  const handleOpenProfile = useCallback(() => {
    if (!activeChatId) return;
    setProfileOpen(true);
    setMobileView('profile');
  }, [activeChatId]);

  /** Back button handlers (mobile) */
  const handleBackToList = useCallback(() => {
    setMobileView('list');
  }, []);

  return (
    <div
      className="flex flex-col h-screen w-full overflow-hidden bg-white"
      style={{ maxWidth: '1600px', margin: '0 auto', boxShadow: '0 4px 40px rgba(0,0,0,0.1)' }}
    >
      {/* ── TOP NAVBAR ────────────────────────────────────── */}
      <Navbar />

      {/* ── PANELS ROW ────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

      {/* ── INBOX SIDEBAR ─────────────────────────────────── */}
      <div className="hidden md:flex h-full">
        <InboxSidebar />
      </div>

      {/* ── LEFT: Chat List ───────────────────────────────── */}
      {/* Desktop: always visible. Mobile: only when mobileView === 'list' */}
      <div
        className={cn(
          'h-full flex-shrink-0',
          // Desktop: fixed 25% width
          'hidden md:flex md:w-[280px] lg:w-[340px] xl:w-[360px]',
          // Mobile override
          'max-md:w-full max-md:flex-col',
          mobileView === 'list' ? 'max-md:flex' : 'max-md:hidden'
        )}
      >
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* ── CENTER: Messages (+ optional right profile on desktop) ── */}
      <div
        className={cn(
          'flex-1 flex h-full min-w-0 bg-white',
          mobileView === 'messages' || mobileView === 'profile'
            ? 'max-md:flex'
            : 'max-md:hidden'
        )}
      >
        {/* Messages panel */}
        <div
          className={cn(
            'flex flex-col h-full min-w-0',
            profileOpen ? 'flex-1' : 'flex-1',
            // On mobile, hide messages when profile is open
            mobileView === 'profile' ? 'max-md:hidden' : 'flex'
          )}
        >
          {activeChat ? (
            <ChatWindow
              chat={activeChat}
              onUpdateChat={handleUpdateChat}
              onOpenProfile={handleOpenProfile}
              profileOpen={profileOpen}
              onBack={handleBackToList}
            />
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8">
              <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
                <MessageSquareDot size={48} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-700 mb-2">
                  ChatPad Web
                </h2>
                <p className="text-slate-400 text-sm max-w-[280px]">
                  Select a conversation from the left panel to start chatting.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Profile Panel ──────────────────────────── */}
        {/* Desktop: visible when profileOpen. Mobile: full screen */}
        <div
          className={cn(
            // Desktop: hidden by default, slides in when profileOpen
            'flex-col border-l border-slate-200 bg-white transition-all duration-200',
            profileOpen
              ? 'hidden md:flex md:w-[280px] lg:w-[320px] xl:w-[340px]'
              : 'hidden',
            // Mobile: full width when profile view active
            mobileView === 'profile' && 'flex max-md:w-full'
          )}
        >
          <ProfilePanel
            user={activeChat?.user ?? null}
            allChats={chats}
            activeChatId={activeChatId}
            onClose={() => { setProfileOpen(false); setMobileView('messages'); }}
          />
        </div>
      </div>

      {/* close panels row */}
      </div>
    </div>
  );
}