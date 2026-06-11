'use client';

import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';
import Image from 'next/image';
import DemoIcon from './DemoIcon';
import type { ChatMessage, Locale } from './mockData';

type ChatRoomViewProps = {
  locale: Locale;
  room: string;
  messages: ChatMessage[];
  autoTranslate: boolean;
  autoTranslateLabel: string;
  selectedRoomName: string;
  inputValue: string;
  inputPlaceholder: string;
  sendLabel: string;
  translateToggleRef?: RefObject<HTMLButtonElement>;
  composerRef?: RefObject<HTMLDivElement>;
  onToggleAutoTranslate: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

function resolveSenderInitial(message: ChatMessage) {
  if (message.senderId === 'luna') {
    return null;
  }
  const explicitInitials: Record<string, string> = {
    mika: 'M',
    sofia: 'S',
    jiho: 'J',
    kai: 'K',
    emma: 'E',
    rin: 'R',
    haeun: 'H',
    'current-user': 'Y'
  };
  return explicitInitials[message.senderId] ?? message.senderName.slice(0, 1).toUpperCase();
}

function ChatMessageAvatar({ message }: { message: ChatMessage }) {
  if (message.senderId === 'luna') {
    return (
      <span className="ui-avatar ui-avatar-sm chat-message-avatar" aria-label="Luna" role="img">
        <Image src="/Luna-Avatar.png" alt="Luna" width={64} height={64} className="ui-avatar-media" />
      </span>
    );
  }

  return (
    <span className="ui-avatar ui-avatar-sm chat-message-avatar demo-alpha-avatar" aria-label={message.senderName} role="img">
      <span className="ui-avatar-fallback ui-avatar-media">
        <span className="demo-alpha-avatar-icon" aria-hidden="true">{resolveSenderInitial(message)}</span>
      </span>
    </span>
  );
}

function formatDemoMessageTime(index: number) {
  const hour = 20 + Math.floor(index / 12);
  const minute = (index * 5) % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export default function ChatRoomView({
  locale,
  room,
  messages,
  autoTranslate,
  autoTranslateLabel,
  selectedRoomName,
  inputValue,
  inputPlaceholder,
  sendLabel,
  translateToggleRef,
  composerRef,
  onToggleAutoTranslate,
  onInputChange,
  onSend
}: ChatRoomViewProps) {
  const messagesBodyRef = useRef<HTMLDivElement | null>(null);
  const wasAtBottomRef = useRef(true);
  const previousMessageCountRef = useRef(messages.length);

  useLayoutEffect(() => {
    const body = messagesBodyRef.current;
    if (!body) {
      return;
    }

    const isInitialLoad = previousMessageCountRef.current === messages.length;
    const shouldStickToBottom = isInitialLoad || wasAtBottomRef.current;

    if (shouldStickToBottom) {
      body.scrollTop = body.scrollHeight;
    }

    previousMessageCountRef.current = messages.length;
  }, [messages.length]);

  const handleMessagesScroll = () => {
    const body = messagesBodyRef.current;
    if (!body) {
      return;
    }

    const bottomDistance = body.scrollHeight - body.scrollTop - body.clientHeight;
    wasAtBottomRef.current = bottomDistance <= 24;
  };

  return (
    <section className="chat-page-main">
      <div className="chat-page-desktop-layout">
        <aside className="chat-room-list">
          <div className="chat-room-list-header">
            <h2>Chat</h2>
          </div>
          <div className="chat-room-group-list">
            <section className="chat-room-group">
              <div className="chat-room-group-header">
                <button type="button" className="chat-room-group-toggle">
                  <span className="chat-room-group-left">
                    <span className="ui-avatar ui-avatar-sm chat-room-group-avatar" aria-label="Luna" role="img">
                      <Image src="/Luna-Avatar.png" alt="Luna" width={64} height={64} className="ui-avatar-media" />
                    </span>
                    <strong className="chat-room-group-name">Luna</strong>
                  </span>
                </button>
              </div>
              <div className="chat-room-group-items">
                <button key={room} type="button" className={`chat-room-item active`}>
                  <span className="chat-room-item-main">
                    <strong title={room}>{room}</strong>
                    <small>{'Em\'ma: Today\'s dinner post made me hungry too. - just now'}</small>
                  </span>
                  <span className="chat-room-item-meta chat-room-item-badge">3</span>
                </button>
              </div>
            </section>
          </div>
        </aside>

        <div className="chat-page-desktop-right">
          <section className="chat-messages-panel">
            <div className="chat-messages-header">
              <div className="chat-messages-header-left">
                <h3>{selectedRoomName}</h3>
              </div>
              <div className="chat-messages-header-actions">
                <button ref={translateToggleRef} type="button" className={`translate-toggle${autoTranslate ? ' active' : ''}`} onClick={onToggleAutoTranslate}>
                  <span>{autoTranslateLabel}</span>
                  <span className="translate-toggle-knob" />
                </button>
                <button type="button" className="ui-icon-button ui-icon-button-sm chat-messages-info" aria-label="Room info">
                  <DemoIcon name="information" size={16} />
                </button>
              </div>
            </div>
            <div ref={messagesBodyRef} className="chat-messages-body" onScroll={handleMessagesScroll}>
              {messages.map((message, index) => (
                <div key={message.id} className={`chat-message-item ${message.senderId === 'current-user' ? 'self' : 'other'}`}>
                  {message.senderId === 'current-user' ? null : (
                    <div className="chat-message-meta-row other">
                      <ChatMessageAvatar message={message} />
                      <span className="chat-message-sender">{message.senderName}</span>
                    </div>
                  )}
                  <div className={`chat-message-content-wrap ${message.senderId === 'current-user' ? 'self' : 'other'}`}>
                    <div className={`chat-message-body-row ${message.senderId === 'current-user' ? 'self' : 'other'}`}>
                      <div className={`chat-message-bubble ${message.senderId === 'current-user' ? 'self' : ''}`}>
                        <p>{autoTranslate ? message.translatedTextByLocale[locale] : message.originalText}</p>
                      </div>
                      <span className="chat-message-time">{formatDemoMessageTime(index)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={composerRef} className="chat-composer">
              <div className="chat-composer-row">
                <input
                  className="chat-composer-input"
                  value={inputValue}
                  onChange={(event) => onInputChange(event.target.value)}
                  placeholder={inputPlaceholder}
                />
                <button type="button" className="primary-button chat-composer-send" onClick={onSend}>
                  {sendLabel}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
