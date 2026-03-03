// ============================================================
//  dummyData.ts — Static dummy data (no backend required)
// ============================================================
import { User, Message, Chat } from '../types/chat.types';

// ─── Users ──────────────────────────────────────────────────
export const CURRENT_USER_ID = 'me';

export const USERS: User[] = [
    {
        id: 'u1',
        name: 'Alice Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=ffdfbf',
        email: 'alice.johnson@email.com',
        phone: '+1 (555) 012-3456',
        status: 'online',
        about: 'Hey there! I am using ChatPad.',
        lastSeen: undefined,
    },
    {
        id: 'u2',
        name: 'Bob Martinez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=c0aede',
        email: 'bob.martinez@email.com',
        phone: '+1 (555) 234-5678',
        status: 'offline',
        about: 'Living life to the fullest 🚀',
        lastSeen: 'Today at 10:45 AM',
    },
    {
        id: 'u3',
        name: 'Clara Thompson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clara&backgroundColor=d1f4cc',
        email: 'clara.t@email.com',
        phone: '+1 (555) 345-6789',
        status: 'online',
        about: 'Available 🎵',
        lastSeen: undefined,
    },
    {
        id: 'u4',
        name: 'David Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffd5dc',
        email: 'david.lee@email.com',
        phone: '+1 (555) 456-7890',
        status: 'offline',
        about: 'Work hard, travel more ✈️',
        lastSeen: 'Yesterday at 7:30 PM',
    },
    {
        id: 'u5',
        name: 'Eva Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eva&backgroundColor=b6e3f4',
        email: 'eva.chen@design.com',
        phone: '+1 (555) 567-8901',
        status: 'online',
        about: 'Coffee addict ☕ | Designer',
        lastSeen: undefined,
    },
    {
        id: 'u6',
        name: 'Frank Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank&backgroundColor=ffd700',
        email: 'frank.w@email.com',
        phone: '+1 (555) 678-9012',
        status: 'away',
        about: 'Busy at the moment 🔕',
        lastSeen: 'Today at 2:15 PM',
    },
    {
        id: 'u7',
        name: 'Grace Park',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace&backgroundColor=e0c8ff',
        email: 'grace.park@email.com',
        phone: '+1 (555) 789-0123',
        status: 'offline',
        about: 'Smile always 😊',
        lastSeen: 'Monday at 9:00 AM',
    },
];

// ─── Messages per chat ───────────────────────────────────────
const MESSAGES: Record<string, Message[]> = {
    u1: [
        { id: 'm1', chatId: 'u1', senderId: 'u1', text: "Hey! How are you doing?", timestamp: '09:10 AM', read: true },
        { id: 'm2', chatId: 'u1', senderId: 'me', text: "I'm good, thanks! Just finishing up some work. How about you?", timestamp: '09:12 AM', read: true },
        { id: 'm3', chatId: 'u1', senderId: 'u1', text: "Same here! Did you see the game last night? It was incredible 🏆", timestamp: '09:14 AM', read: true },
        { id: 'm4', chatId: 'u1', senderId: 'me', text: "Oh yes! That last-minute goal was absolutely unbelievable 😄", timestamp: '09:15 AM', read: true },
        { id: 'm5', chatId: 'u1', senderId: 'u1', text: "Right?! I almost fell off the sofa haha", timestamp: '09:16 AM', read: true },
        { id: 'm6', chatId: 'u1', senderId: 'me', text: "Are you free this weekend? We should hang out and watch the next game together.", timestamp: '09:18 AM', read: true },
        { id: 'm7', chatId: 'u1', senderId: 'u1', text: "Absolutely! Saturday works for me. My place?", timestamp: '09:20 AM', read: true },
        { id: 'm8', chatId: 'u1', senderId: 'me', text: "Perfect, I'll bring snacks 🍕🍿", timestamp: '09:21 AM', read: true },
        { id: 'm9', chatId: 'u1', senderId: 'u1', text: "Can't wait! 🎉", timestamp: '09:22 AM', read: false },
        { id: 'm10', chatId: 'u1', senderId: 'u1', text: "Oh and can you send me that lo-fi playlist? 🎶", timestamp: '09:24 AM', read: false },
    ],
    u2: [
        { id: 'm1', chatId: 'u2', senderId: 'me', text: "Bob, did you check the project files I sent?", timestamp: 'Yesterday', read: true },
        { id: 'm2', chatId: 'u2', senderId: 'u2', text: "Yes I did! They look great. I have a few suggestions though.", timestamp: 'Yesterday', read: true },
        { id: 'm3', chatId: 'u2', senderId: 'me', text: "Sure, shoot!", timestamp: 'Yesterday', read: true },
        { id: 'm4', chatId: 'u2', senderId: 'u2', text: "We should refactor the data layer and separate concerns more clearly.", timestamp: 'Yesterday', read: true },
        { id: 'm5', chatId: 'u2', senderId: 'u2', text: "Also the API module could use some caching logic.", timestamp: 'Yesterday', read: true },
        { id: 'm6', chatId: 'u2', senderId: 'me', text: "Good points! I'll work on the refactoring tonight.", timestamp: 'Yesterday', read: true },
        { id: 'm7', chatId: 'u2', senderId: 'u2', text: "Awesome. Let me know if you need any help 👍", timestamp: '10:40 AM', read: true },
        { id: 'm8', chatId: 'u2', senderId: 'me', text: "Will do! Thanks Bob 🙏", timestamp: '10:45 AM', read: true },
    ],
    u3: [
        { id: 'm1', chatId: 'u3', senderId: 'u3', text: "Clara here! The presentation went really well 🎉", timestamp: '08:00 AM', read: true },
        { id: 'm2', chatId: 'u3', senderId: 'me', text: "That's amazing! I knew you'd nail it!", timestamp: '08:05 AM', read: true },
        { id: 'm3', chatId: 'u3', senderId: 'u3', text: "Couldn't have done it without your feedback, thank you!", timestamp: '08:07 AM', read: true },
        { id: 'm4', chatId: 'u3', senderId: 'me', text: "Anytime! What was the client's reaction?", timestamp: '08:10 AM', read: true },
        { id: 'm5', chatId: 'u3', senderId: 'u3', text: "They loved it! They want to move forward with the full contract 🚀", timestamp: '08:12 AM', read: true },
        { id: 'm6', chatId: 'u3', senderId: 'me', text: "That's huge!! Congratulations Clara! 🥳", timestamp: '08:13 AM', read: true },
        { id: 'm7', chatId: 'u3', senderId: 'u3', text: "We should celebrate! Lunch tomorrow?", timestamp: 'Now', read: false },
    ],
    u4: [
        { id: 'm1', chatId: 'u4', senderId: 'u4', text: "Hey, are you around?", timestamp: 'Monday', read: true },
        { id: 'm2', chatId: 'u4', senderId: 'me', text: "Yes, what's up?", timestamp: 'Monday', read: true },
        { id: 'm3', chatId: 'u4', senderId: 'u4', text: "Looking for a good travel app recommendation.", timestamp: 'Monday', read: true },
        { id: 'm4', chatId: 'u4', senderId: 'me', text: "Try TripIt or Google Trips! They're both fantastic.", timestamp: 'Monday', read: true },
        { id: 'm5', chatId: 'u4', senderId: 'u4', text: "Oh nice! Planning a trip to Japan next month 🗾", timestamp: 'Monday', read: true },
        { id: 'm6', chatId: 'u4', senderId: 'me', text: "Japan is wonderful! Cherry blossom season? 🌸", timestamp: 'Monday', read: true },
        { id: 'm7', chatId: 'u4', senderId: 'u4', text: "Exactly! Can't wait. Thanks for the tips!", timestamp: 'Yesterday', read: true },
    ],
    u5: [
        { id: 'm1', chatId: 'u5', senderId: 'me', text: "Eva, I just saw your new design portfolio. It's stunning! 😍", timestamp: 'Tuesday', read: true },
        { id: 'm2', chatId: 'u5', senderId: 'u5', text: "Aww thank you so much! I've been working on it for months 😊", timestamp: 'Tuesday', read: true },
        { id: 'm3', chatId: 'u5', senderId: 'me', text: "The color palette in the dashboard project is chef's kiss 👌", timestamp: 'Tuesday', read: true },
        { id: 'm4', chatId: 'u5', senderId: 'u5', text: "Haha I spent way too long picking those colors ☕", timestamp: 'Wednesday', read: true },
        { id: 'm5', chatId: 'u5', senderId: 'u5', text: "Hey, do you have any freelance projects coming up?", timestamp: 'Wednesday', read: true },
        { id: 'm6', chatId: 'u5', senderId: 'me', text: "Actually yes! I'll message you the details soon.", timestamp: 'Wednesday', read: true },
        { id: 'm7', chatId: 'u5', senderId: 'u5', text: "Sounds good! Looking forward to it 🎨", timestamp: 'Yesterday', read: true },
    ],
    u6: [
        { id: 'm1', chatId: 'u6', senderId: 'u6', text: "Hey, quick question about the budget report.", timestamp: '10:00 AM', read: true },
        { id: 'm2', chatId: 'u6', senderId: 'me', text: "Sure, what's the question?", timestamp: '10:05 AM', read: true },
        { id: 'm3', chatId: 'u6', senderId: 'u6', text: "The Q3 numbers don't match the projection. Can you double-check?", timestamp: '10:06 AM', read: true },
        { id: 'm4', chatId: 'u6', senderId: 'me', text: "Yes I see it. It's the October adjustment.", timestamp: '10:10 AM', read: true },
        { id: 'm5', chatId: 'u6', senderId: 'u6', text: "Can you send an updated version with the notes?", timestamp: '10:12 AM', read: false },
        { id: 'm6', chatId: 'u6', senderId: 'u6', text: "Need it before the 3 PM meeting 🙏", timestamp: '10:13 AM', read: false },
        { id: 'm7', chatId: 'u6', senderId: 'u6', text: "Also share the spreadsheet access with Sarah. Thanks! 🙌", timestamp: '10:18 AM', read: false },
    ],
    u7: [
        { id: 'm1', chatId: 'u7', senderId: 'u7', text: "Good morning! Hope you have a wonderful day 😊", timestamp: 'Monday', read: true },
        { id: 'm2', chatId: 'u7', senderId: 'me', text: "Good morning Grace! You too! ☀️", timestamp: 'Monday', read: true },
        { id: 'm3', chatId: 'u7', senderId: 'u7', text: "Did you try that new café near the office?", timestamp: 'Monday', read: true },
        { id: 'm4', chatId: 'u7', senderId: 'me', text: "Not yet! Is it good?", timestamp: 'Monday', read: true },
        { id: 'm5', chatId: 'u7', senderId: 'u7', text: "It's amazing! Best lattes and pastries ☕🥐", timestamp: 'Monday', read: true },
        { id: 'm6', chatId: 'u7', senderId: 'me', text: "Now I need to go immediately! Haha", timestamp: 'Monday', read: true },
        { id: 'm7', chatId: 'u7', senderId: 'u7', text: "Haha let me know what you think! 😄", timestamp: 'Monday', read: true },
    ],
};

// ─── Build Chat list ─────────────────────────────────────────
export const INITIAL_CHATS: Chat[] = USERS.map((user) => ({
    id: user.id,
    user,
    messages: MESSAGES[user.id] ?? [],
    unreadCount: (MESSAGES[user.id] ?? []).filter((m) => m.senderId !== 'me' && !m.read).length,
}));

// ─── Simulated auto-replies ──────────────────────────────────
export const AUTO_REPLIES = [
    "Great, thanks for letting me know! 😊",
    "Sounds good!",
    "Sure, I'll get back to you soon.",
    "👍",
    "Awesome! Talk soon.",
    "Got it! Thanks.",
    "Perfect, see you then! 🎉",
    "Haha, noted! 😄",
    "Let me check and get back to you.",
    "That sounds amazing!",
];
