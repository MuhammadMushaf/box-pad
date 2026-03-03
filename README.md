# 📬 Box-Pad — CRM-Style Chat Application

**Box-Pad** is a CRM-style inbox/chat web application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It simulates a customer support or team messaging platform featuring a multi-panel layout with an inbox sidebar, a searchable conversation list, a real-time-style chat window, and a detailed contact profile panel.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd box-pad
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will auto-reload as you edit files.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (hot-reload) |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server (requires build first) |
| `npm run lint` | Run ESLint across the project |

> **Note:** The `ChatList` component includes a placeholder `axios` call to `http://localhost:4000/users`. This is currently inactive / for demo purposes only and does not block the app from running.

---

## 🗂️ Project Structure

```
box-pad/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts + global styles)
│   │   ├── page.tsx                # Root page (redirects to <Layout />)
│   │   ├── globals.css             # Global CSS + Tailwind + CSS variables
│   │   ├── fonts/                  # Local Geist & GeistMono font files
│   │   └── chat/
│   │       ├── page.tsx            # Main Chat page (stateful root)
│   │       ├── components/         # All chat UI components
│   │       │   ├── Navbar.tsx
│   │       │   ├── InboxSidebar.tsx
│   │       │   ├── ChatList.tsx
│   │       │   ├── ChatItem.tsx
│   │       │   ├── ChatWindow.tsx
│   │       │   ├── ChatHeader.tsx
│   │       │   ├── MessageBubble.tsx
│   │       │   └── ProfilePanel.tsx
│   │       ├── data/
│   │       │   └── dummyData.ts    # Static mock users, messages & chats
│   │       └── types/
│   │           └── chat.types.ts   # TypeScript interfaces (User, Chat, Message, etc.)
│   ├── components/
│   │   └── ui/                     # shadcn/ui base components
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       └── collapsible.tsx
│   ├── lib/
│   │   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│   └── Layout/                     # (Reserved, currently empty)
├── public/                         # Static assets
├── components.json                 # shadcn/ui configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── next.config.mjs                 # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── .eslintrc.json                  # ESLint configuration
└── package.json
```

---

## 🧩 What's In This Project

### Pages

| File | Route | Purpose |
|---|---|---|
| `src/app/page.tsx` | `/` | Root page; renders the `<Layout />` shell |
| `src/app/chat/page.tsx` | `/chat` | Main chat page; manages all state (active chat, profile panel, mobile view) |

---

### Components — Chat (`src/app/chat/components/`)

#### `Navbar.tsx`
The top navigation bar rendered across the full width of the app. Contains:
- **Logo** — a rose-coloured icon with the brand name "heyy"
- **Nav tabs** — Inbox, Contacts, AI Employees, Workflows, Campaigns (tab switching handled locally with `useState`)
- **Right section** — Settings gear icon + logged-in user avatar initials ("Michael Johnson")

#### `InboxSidebar.tsx`
A collapsible left sidebar (200px wide, hidden on mobile) that organizes inbox views. Contains:
- **Quick Filters** — My Inbox, All (28), Unassigned (5) — selectable filter rows with icons
- **Teams section** (collapsible) — Sales (7), Customer Support (16)
- **Users section** (collapsible) — list of 9 team members with per-user message counts
- **Channels section** (collapsible) — Fit4Life WhatsApp and Fit4Life Instagram channel rows with branded icons
- Each group uses a `Group` sub-component with chevron toggle

#### `ChatList.tsx`
A scrollable list of all conversations (280–360px wide on desktop, full-width on mobile). Features:
- **Header** — user name ("Michael Johnson"), toggle sidebar button, new chat (pen) icon
- **Search bar** — real-time filtering of chats by contact name, with a sliders icon for filter options
- **Filter/Sort bar** — "Open/Closed/All" dropdown pill + "Newest/Oldest" sort pill (UI only)
- **Conversation list** — renders `<ChatItem />` for each chat; shows empty state if no results
- Uses `axios` (placeholder GET to `http://localhost:4000/users`) on mount via `useEffect`

#### `ChatItem.tsx`
A single row in the conversation list. Displays:
- **Letter avatar** — first initial of contact name rendered in a deterministic color from an 8-color palette
- **Contact name** + **last message timestamp**
- **Message preview** — truncated to 38 characters; prefixed with "You:" for sent messages
- **Unread badge** — violet pill showing unread count (hidden if zero)
- Highlights with a white card + shadow when active

#### `ChatWindow.tsx`
The main messages view. Features:
- **ChatHeader** at the top (contact name, mobile back button, options buttons)
- **Messages area** — scrollable, renders `<MessageBubble />` for each message with a `DateDivider` ("Today") at the top
- **Auto-scroll** to the bottom whenever messages or `isTyping` state change
- **Typing indicator** — three animated bouncing dots shown after you send a message
- **Simulated auto-reply** — after a 1.4–2.2 second delay, a random auto-reply message is appended from the other user
- **Message input footer** — a card-style textarea with:
  - Auto-resizing (up to 120px height)
  - Send on **Enter** key (Shift+Enter for new line)
  - **Toolbar icons**: Image, Video, Note, Emoji, Reply (left); Quick Reply / Send (right)
  - Send icon turns violet when text is typed

#### `ChatHeader.tsx`
The header for the active chat window. Contains:
- **Mobile back arrow** (hidden on desktop) — returns to the chat list
- **Contact name button** — click to open the Profile Panel
- **Action buttons** (right side):
  - Three-dots menu (⋮)
  - AI assistant robot-head icon
  - Details panel toggle (dark button, highlights when panel is open)

#### `MessageBubble.tsx`
Renders a single chat message bubble:
- **Sent messages** (by "me") — aligned right, purple-tinted background (`#EDE9FF`), rounded top-right corner flat
- **Received messages** — aligned left, light grey background (`#F2F2F2`), rounded top-left corner flat
- **Timestamp** shown above the bubble
- **Read receipts** — `✓` (delivered, grey) or `✓✓` (read, blue) shown for sent messages only

#### `ProfilePanel.tsx`
A right-side details drawer that slides in when a chat is active and the header details button is clicked. Contains the following collapsible sections:
- **Chat Data** — Assignee (with avatar) and Team
- **Contact Data** — First Name, Last Name, Phone Number, Email + "See all" button
- **Contact Labels** — pill/tag badges (e.g., "Dev", "Freelance") + add button
- **Notes** — yellow sticky-note style cards; a placeholder card + a per-user pre-filled note
- **Other Chats** — previews of up to 3 other conversations (collapsed by default)
- Shows an empty state when no user is selected
- Responsive: full-screen on mobile, fixed-width panel on desktop

---

### Shared UI Components (`src/components/ui/`)

These are [shadcn/ui](https://ui.shadcn.com/) components:

| Component | Description |
|---|---|
| `button.tsx` | Polymorphic button with `variant` (default, destructive, outline, secondary, ghost, link) and `size` props |
| `avatar.tsx` | Radix UI Avatar wrapper with `Avatar`, `AvatarImage`, and `AvatarFallback` exports |
| `collapsible.tsx` | Radix UI Collapsible wrapper for toggling sections |

---

### Data & Types (`src/app/chat/data/` & `src/app/chat/types/`)

#### `chat.types.ts` — TypeScript Interfaces

| Type | Fields |
|---|---|
| `User` | `id`, `name`, `avatar`, `email`, `phone`, `status` (online/away/offline), `about`, `lastSeen?` |
| `Message` | `id`, `chatId`, `senderId` (user id or `'me'`), `text`, `timestamp`, `read` |
| `Chat` | `id`, `user: User`, `messages: Message[]`, `unreadCount` |
| `AppState` | `activeChatId`, `profileOpen`, `mobileView` |

#### `dummyData.ts` — Static Mock Data

Contains all the static data used to populate the UI (no backend is required):

- **7 mock users** — Alice, Bob, Clara, David, Eva, Frank, Grace — each with avatar, email, phone, status, and "about"
- **7 mock conversation threads** — multi-turn message histories per user (8–10 messages each)
- **`INITIAL_CHATS`** — auto-built `Chat[]` array by mapping users to their messages; unread count is computed automatically
- **`AUTO_REPLIES`** — array of 10 casual reply strings used by the simulated auto-reply feature
- **Avatars** — generated via [DiceBear Avataaars API](https://api.dicebear.com/)

---

### Utilities & Config

| File | Purpose |
|---|---|
| `src/lib/utils.ts` | `cn()` helper: merges Tailwind classes safely using `clsx` + `tailwind-merge` |
| `src/app/globals.css` | Tailwind directives + CSS custom properties for shadcn color tokens (light + dark mode) |
| `tailwind.config.ts` | Tailwind config with dark mode support, custom color tokens (HSL variables), border radius tokens, and `tailwindcss-animate` plugin |
| `components.json` | shadcn/ui CLI config — style: `new-york`, icon lib: `lucide`, aliases for `@/components`, `@/lib`, etc. |
| `next.config.mjs` | Default Next.js config (no custom overrides) |
| `tsconfig.json` | TypeScript config with `@/` path alias pointing to `./src` |

---

## 📱 Responsive Layout

The app is fully responsive with three mobile view states managed via a `mobileView` state (`'list' | 'messages' | 'profile'`):

| View | Desktop | Mobile |
|---|---|---|
| Inbox Sidebar | Visible (200px) | Hidden |
| Chat List | Visible (280–360px) | Full screen (when `mobileView === 'list'`) |
| Chat Window | Visible (flex-1) | Full screen (when `mobileView === 'messages'`) |
| Profile Panel | Slides in on right (280–340px) | Full screen (when `mobileView === 'profile'`) |

---

## 🛠️ Tech Stack

| Technology | Version | Usage |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.2.18 | React framework (App Router) |
| [React](https://react.dev/) | ^18 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4.1 | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | — | Pre-built accessible UI components |
| [Radix UI](https://www.radix-ui.com/) | — | Headless UI primitives (Avatar, Collapsible, Slot) |
| [Lucide React](https://lucide.dev/) | ^0.576.0 | Icon set |
| [clsx](https://github.com/lukeed/clsx) | ^2.1.1 | Conditional class names |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | ^3.5.0 | Tailwind class conflict resolution |
| [class-variance-authority](https://cva.style/) | ^0.7.1 | Component variant management |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | ^1.0.7 | Animation utilities |
| [axios](https://axios-http.com/) | ^1.13.6 | HTTP client (placeholder, not actively used) |

---

## 📄 License

This project is private (`"private": true` in `package.json`).
