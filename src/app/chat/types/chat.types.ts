// ============================================================
//  chat.types.ts — Shared TypeScript interfaces
// ============================================================

export type UserStatus = 'online' | 'away' | 'offline';

export interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
    status: UserStatus;
    about: string;
    lastSeen?: string;
}

export interface Message {
    id: string;
    chatId: string;
    senderId: string; // user id or 'me'
    text: string;
    timestamp: string;
    read: boolean;
}

export interface Chat {
    id: string;         // equals the other user's id
    user: User;
    messages: Message[];
    unreadCount: number;
}

export interface AppState {
    activeChatId: string | null;
    profileOpen: boolean;
    mobileView: 'list' | 'messages' | 'profile';
}
