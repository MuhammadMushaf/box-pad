'use client';

import { cn } from '@/lib/utils';
import { Message } from '../types/chat.types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isSent = message.senderId === 'me';

  return (
    <div
      className={cn(
        'flex flex-col max-w-[62%] gap-1',
        isSent ? 'self-end items-end' : 'self-start items-start'
      )}
    >
      {/* Timestamp row — appears ABOVE the bubble */}
      <div className={cn('flex items-center gap-1.5 px-1', isSent ? 'flex-row-reverse' : 'flex-row')}>
        <span className="text-[11px] text-slate-400 leading-none">{message.timestamp}</span>
        {isSent && (
          <span
            className={cn(
              'text-[12px] leading-none font-semibold',
              message.read ? 'text-blue-500' : 'text-slate-400'
            )}
            title={message.read ? 'Read' : 'Delivered'}
          >
            {message.read ? '✓✓' : '✓'}
          </span>
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          'px-4 py-3 text-[14px] leading-relaxed text-slate-800 break-words',
          isSent
            ? 'bg-[#EDE9FF] rounded-2xl rounded-tr-[6px]'
            : 'bg-[#F2F2F2] rounded-2xl rounded-tl-[6px]'
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
